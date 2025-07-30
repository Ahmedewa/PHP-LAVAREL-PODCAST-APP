       AUTHENTICATION-AUTHORIZATION-SANCTUM

Authentication and Authorization**

 ** Install Sanctum**
```bash
composer require laravel/sanctum
php artisan migrate
```

 ** Protect Routes**
In `api.php`:
```php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', CategoryController::class);
});
```

**Issue Tokens**
In `AuthController`:
```php
public function login(Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        return response()->json([
            'token' => $user->createToken('API Token')->plainTextToken,
        ]);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
}
```

---

**API Documentation**

 **Swagger Setup**
```bash
composer require "darkaonline/swagger-lume:8.*"
php artisan swagger-lume:publish
```

 **Generate Documentation**
Annotate controllers with Swagger comments:
```php
/**
 * @OA\Get(
 *     path="/api/categories",
 *     summary="Get all categories",
 *     tags={"Categories"},
 *     @OA\Response(response=200, description="Success")
 * )
 */
public function index() {
    // ...
}
```

Generate documentation:
```bash
php artisan swagger-lume:generate
```

Access docs at `/api/documentation`.

---

 **8. Monitoring and Logging**

1. **Install Prometheus Exporter**:
   ```bash
   composer require jimdo/prometheus_client_php
   ```

2. **Integrate Grafana**:
   - Configure Prometheus as the data source.
   - Visualize metrics in Grafana.

---

 **9. Caching, Queues, and Load Balancers**

- **Caching**: Use Laravel’s `cache()` helper.
- **Queues**: Use Redis or RabbitMQ with Laravel Queue.
- **Load Balancer**: Use Nginx (as detailed earlier).

---

### **10. Error Handling**
- Use `try-catch` blocks and Laravel’s `report()` method.
- Enable detailed error logs in `.env`:
  ```env
  APP_DEBUG=true
  ```

---

