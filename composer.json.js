
      COMPOSER.JSON[Requirements.txt(Dependancies)]


---

 **1. `requirements.txt` File (Dependencies)**

Laravel uses **Composer** for dependency management, so instead of a `requirements.
txt` file (used in Python projects), Laravel has a `composer.json` file to list 
our project dependencies. Below is a detailed explanation of the required 
dependencies for our project.

---

**1a) `composer.json` File**
Here’s an  `composer.json` file with dependencies tailored to our project:

```json
{
    "require": {
        "php": "^8.0",
        "laravel/framework": "^10.0",
        "laravel/sanctum": "^3.2",              // For API authentication
        "laravel/telescope": "^4.0",           // For debugging and monitoring
        "swagger-lume": "^8.0",                // For API documentation
        "guzzlehttp/guzzle": "^7.0",           // For HTTP requests
        "laravel/horizon": "^5.14",            // For queue monitoring
        "predis/predis": "^2.0",               // For Redis queue and caching
        "phpunit/phpunit": "^10.0",            // For testing
        "mockery/mockery": "^1.6",             // For testing mocks
        "barryvdh/laravel-debugbar": "^3.8",   // For debugging
        "spatie/laravel-query-builder": "^5.0" // For filtering, sorting, and pagination
    }
}
```

---

**1b) Install Dependencies**
Run the following command to install dependencies:

```bash
composer install
```

---

  **1c)  `package.json` for Frontend Dependencies**
If your project uses **frontend assets**, include these dependencies:
```json
{
    "devDependencies": {
        "axios": "^1.0",          // For API requests
        "laravel-mix": "^6.0",    // For asset compilation
        "tailwindcss": "^3.3",    // For styling
        "postcss": "^8.0",
        "autoprefixer": "^10.0"
    }
}
```

Install with:

```bash
npm install
```

---

