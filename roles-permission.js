                ROLES-PERMISSION-CREATION

 **Implementing Features**

**Role-Based Access Control (RBAC)**

**1. Create Roles and Permissions**
Add tables for `roles` and `permissions`:

```bash
php artisan make:migration create_roles_table
php artisan make:migration create_permissions_table
```

**Migration for Roles**:

```php
Schema::create('roles', function (Blueprint $table) {
    $table->id();
    $table->string('name')->unique();
    $table->timestamps();
});
```

**Migration for Permissions**:

```php
Schema::create('permissions', function (Blueprint $table) {
    $table->id();
    $table->string('name')->unique();
    $table->timestamps();
});
```

---

**2. Assign Roles to Users**
Update `users` table:
```php
Schema::table('users', function (Blueprint $table) {
    $table->foreignId('role_id')->constrained();
});
```

---

 **3. Middleware for Role Checking**
Create middleware:
```bash
php artisan make:middleware CheckRole
```

**Middleware Code**:
```php
public function handle($request, Closure $next, $role)
{
    if (!$request->user() || $request->user()->role->name !== $role) {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    return $next($request);
}
```

Apply middleware to routes:
```php
Route::get('/admin', function () {
    // Admin-only route
})->middleware('checkRole:admin');
```

---

**Validation**

 **Request Validation**
Create a form request for validation:
```bash
php artisan make:request CreatePodcastRequest
```

**Validation Rules**:
```php
public function rules()
{
    return [
        'title' => 'required|string|max:255',
        'category_id' => 'required|exists:categories,id',
        'description' => 'nullable|string',
    ];
}
```

Use it in a controller:
```php
public function store(CreatePodcastRequest $request)
{
    $validated = $request->validated();
    $podcast = Podcast::create($validated);

    return response()->json($podcast, 201);
}
```

---

**Rate Limiting**

**Laravel's Throttling Middleware**
Laravel provides built-in rate-limiting middleware.

1. **Define Rate Limits in `RouteServiceProvider`**:
```php
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->ip());
});
```

2. **Apply Middleware to Routes**:
In `routes/api.php`:
```php
Route::middleware('throttle:api')->group(function () {
    Route::get('/podcasts', [PodcastController::class, 'index']);
});
```

---

