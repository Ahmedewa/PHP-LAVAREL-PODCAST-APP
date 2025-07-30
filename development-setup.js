DEVELOPMENT SETUP:

 **Developmental Setup**

 **2a) Frontend Setup (Flutter)**
1. **Install Flutter SDK**:
   - [Flutter Installation Guide](https://docs.flutter.dev/get-started/install).
   - Verify installation:
     ```bash
     flutter doctor
     ```

2. **Set Up IDE**:
   - Use **Visual Studio Code** or **Android Studio**.
   - Install Flutter and Dart plugins.

3. **Folder Structure**:

   ```plaintext
   lib/
     screens/
       home_screen.dart
       login_screen.dart
     widgets/
       custom_button.dart
     providers/
       auth_provider.dart
   ```

4. **Run the App**:
   ```bash
   flutter run
   ```

---

 **Backend Setup (Laravel with Supabase/Firebase)**
1. **Install Laravel**:

   ```bash
   composer create-project laravel/laravel my-backend
   ```

2. **Configure Database**:

   - Use `.env` to set up database credentials for Supabase:
     ```env
     DB_CONNECTION=pgsql
     DB_HOST=supabase_host
     DB_PORT=5432
     DB_DATABASE=my_database
     DB_USERNAME=supabase_user
     DB_PASSWORD=supabase_password
     ```

3. **Folder Structure**:

   ```plaintext
   app/
     Http/
       Controllers/
         AuthController.php
         TaskController.php
   database/
     migrations/
   routes/
     api.php
   ```

4. **Run the Backend**:

   ```bash
   php artisan serve
   ```

---

