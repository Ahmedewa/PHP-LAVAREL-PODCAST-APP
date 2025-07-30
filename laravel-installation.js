LARAVEL-INSTALLATION

Building the **backend API for a podcast 
platform** using **Laravel 10+**, following the repository pattern and Laravel 
best practices. The project implements the specified features, 
ensuring scalability, performance, and maintainability.

---

## **Tech Stack:**
- **Backend**: PHP 8.x, Laravel 10+
- **Database**: MySQL
- **Queue**: Redis or RabbitMQ
- **Caching**: Laravel built-in caching
- **Monitoring**: Grafana, Prometheus
- **Logging**: Rsyslog
- **Error Handling**: Laravel Debugging
- **Data Lake**: Apache Spark

---

**1. Setting Up the Laravel Project**

 **1.1 Install Laravel**
```bash
composer create-project laravel/laravel podcast-platform
cd podcast-platform
```

**1.2 Configure Environment**
Update `.env`:
```env
APP_NAME=PodcastPlatform
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=podcast_platform
DB_USERNAME=root
DB_PASSWORD=password

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
```

**1.3 Install Required Packages**
```bash
composer require laravel/sanctum swagger-lume
npm install
```

---

**2. Database Schema**

**2.1 Migrations**
Create migrations for `categories`, `podcasts`, and `episodes`:
```bash
php artisan make:migration create_categories_table
php artisan make:migration create_podcasts_table
php artisan make:migration create_episodes_table
```

**Migration Files:**

1. **`categories` Table**
```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('description')->nullable();
    $table->string('slug')->unique();
    $table->string('image')->nullable();
    $table->timestamps();
});
```

2. **`podcasts` Table**
```php
Schema::create('podcasts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('category_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->text('description');
    $table->string('image')->nullable();
    $table->timestamps();
});
```

3. **`episodes` Table**
```php
Schema::create('episodes', function (Blueprint $table) {
    $table->id();
    $table->foreignId('podcast_id')->constrained()->onDelete('cascade');
    $table->string('title');
    $table->string('audio_url');
    $table->integer('duration');
    $table->timestamps();
});
```

Run migrations:
```bash
php artisan migrate
```

---

**3. Backend Functionality**

**3.1 Models and Relationships**

**Category Model**:
```php
class Category extends Model {
    protected $fillable = ['title', 'description', 'slug', 'image'];

    public function podcasts() {
        return $this->hasMany(Podcast::class);
    }
}
```

**Podcast Model**:

```php
class Podcast extends Model {
    protected $fillable = ['title', 'category_id', 'description', 'image'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function episodes() {
        return $this->hasMany(Episode::class);
    }
}
```

**Episode Model**:
```php
class Episode extends Model {
    protected $fillable = ['podcast_id', 'title', 'audio_url', 'duration'];

    public function podcast() {
        return $this->belongsTo(Podcast::class);
    }
}
```

---

**4. Repository Pattern**

**4.1 Create Repository Contracts**

```bash
php artisan make:folder Repositories
php artisan make:folder Repositories/Contracts
```

** Contract (CategoryRepositoryInterface.php)**:
```php
namespace App\Repositories\Contracts;

interface CategoryRepositoryInterface {
    public function all();
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
```

**4.2 Implement Repository**

```bash
php artisan make:folder Repositories/Eloquent
```

**Eloquent Implementation (CategoryRepository.php)**:
```php
namespace App\Repositories\Eloquent;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface {
    public function all() {
        return Category::all();
    }

    public function find($id) {
        return Category::findOrFail($id);
    }

    public function create(array $data) {
        return Category::create($data);
    }

    public function update($id, array $data) {
        $category = $this->find($id);
        $category->update($data);
        return $category;
    }

    public function delete($id) {
        return Category::destroy($id);
    }
}
```

 **4.3 Bind Repository in Service Container**
In `AppServiceProvider.php`:

```php
public function register() {
    $this->app->bind(
        \App\Repositories\Contracts\CategoryRepositoryInterface::class,
        \App\Repositories\Eloquent\CategoryRepository::class
    );
}
```

