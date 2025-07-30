         RESTful API ENDPOINTS


 ** RESTful API Endpoints**

 ** API Routes**
Update `routes/api.php`:
```php
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\EpisodeController;

Route::apiResource('categories', CategoryController::class);
Route::apiResource('podcasts', PodcastController::class);
Route::apiResource('episodes', EpisodeController::class);
```

---

 ** Controllers**
Generate controllers:
```bash
php artisan make:controller CategoryController --api
php artisan make:controller PodcastController --api
php artisan make:controller EpisodeController --api
```

** Methods (CategoryController):**
```php
use App\Repositories\Contracts\CategoryRepositoryInterface;

class CategoryController extends Controller {
    protected $repository;

    public function __construct(CategoryRepositoryInterface $repository) {
        $this->repository = $repository;
    }

    public function index() {
        return response()->json($this->repository->all());
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:categories,slug',
            'image' => 'nullable|string',
        ]);
        return response()->json($this->repository->create($data));
    }

    public function show($id) {
        return response()->json($this->repository->find($id));
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:categories,slug,'.$id,
            'image' => 'nullable|string',
        ]);
        return response()->json($this->repository->update($id, $data));
    }

    public function destroy($id) {
        return response()->json($this->repository->delete($id));
    }
}
```

---

