            FIREBASE-FIRESTORE-EMULATOR

**. Firebase Firestore Emulator (For Local Testing)**

Firestore Emulator allows you to test Firestore queries locally without affecting 
the live database.

### *Set Up Firestore Emulator**
1. Install the Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Initialize the Emulator:

   ```bash
   firebase init emulators
   ```

3. Start the Emulator:

   ```bash
   firebase emulators:start
   ```

4. Connect to the Emulator in Flutter:

   ```dart
   import 'package:cloud_firestore/cloud_firestore.dart';

   void main() {
     FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
   }
   ```

---

