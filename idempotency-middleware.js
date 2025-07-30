         IDEMPOTENCY-MIDDLEWARE-IN-API-DESIGN

** Idempotency in API Design**

** What is Idempotency?**
- **Definition**: Idempotency ensures that making the same API request multiple times results in the same outcome (e.g., creating a payment or booking).
- **Use Case**: Prevent duplicate actions in POST, PUT, or PATCH requests.

---

**2b) Implementation in Laravel**

**1. Add an `idempotency_keys` Table**
Create a migration to store idempotency keys:
```bash
php artisan make:migration create_idempotency_keys_table
```

Migration file:
```php
Schema::create('idempotency_keys', function (Blueprint $table) {
    $table->id();
    $table->string('key')->unique();
    $table->json('response')->nullable();
    $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
});
```

Run the migration:
```bash
php artisan migrate
```

---

**2. Middleware for Idempotency**

Create a middleware to handle idempotency:
```bash
php artisan make:middleware IdempotencyMiddleware
```

Middleware code:
```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cache;

class IdempotencyMiddleware
{
    public function handle($request, Closure $next)
    {
        $idempotencyKey = $request->header('Idempotency-Key');

        if (!$idempotencyKey) {
            return response()->json(['error' => 'Idempotency-Key header is required'], 400);
        }

        // Check if the key already exists
        $cachedResponse = Cache::get($idempotencyKey);

        if ($cachedResponse) {
            return response()->json(json_decode($cachedResponse, true));
        }

        // Process the request
        $response = $next($request);

        // Cache the response
        Cache::put($idempotencyKey, $response->getContent(), now()->addMinutes(10));

        return $response;
    }
}
```

---

**3. Apply Middleware to Specific Routes**
In `app/Http/Kernel.php`, register the middleware:

```php
protected $routeMiddleware = [
    'idempotency' => \App\Http\Middleware\IdempotencyMiddleware::class,
];
```

Apply to routes in `routes/api.php`:
```php
Route::post('/create-podcast', [PodcastController::class, 'store'])->middleware('idempotency');
```

---

 **4.  Usage**
When making a POST request, send an `Idempotency-Key` header:

```http
POST /api/create-podcast
Idempotency-Key: 12345abcde
Content-Type: application/json

{
    "title": "Tech Podcast",
    "description": "A podcast about tech trends."
}
```

---

