SONAR QUBE-INSTALLATION AND USE FOR CODE COVERAGE


 **1. How to Test Code Coverage Integration with SonarQube**

**SonarQube** is a powerful tool to measure code quality and coverage. 
Below are the detailed steps to **test code coverage integration** with 
SonarQube for our Laravel project.

---

 **1a) Prerequisites**
Ensure the following are installed:
- **SonarQube**: Installed locally or on a server.
- **PHPUnit**: Already integrated with Laravel.
- **SonarScanner**: Required to analyze your project.

---

 **1b) Install and Run SonarQube Locally**
1. **Install SonarQube via Docker**:
   ```bash
   docker run -d --name sonarqube -p 9000:9000 sonarqube
   ```

2. **Access SonarQube**:
   - Open your browser and navigate to [http://localhost:9000](http://localhost:9000).
   - Default login credentials:
     - Username: `admin`
     - Password: `admin`

3. **Create a New Project**:
   - Go to **Projects > Create Project**.
   - Enter a project key (e.g., `laravel_project`).

---

**1c) Configure PHPUnit to Generate Code Coverage**
Update PHPUnit configuration to generate a **coverage report**:
1. Create or update `phpunit.xml`:
   ```xml
   <phpunit bootstrap="vendor/autoload.php" colors="true">
       <testsuites>
           <testsuite name="Unit">
               <directory>./tests/Unit</directory>
           </testsuite>
           <testsuite name="Feature">
               <directory>./tests/Feature</directory>
           </testsuite>
       </testsuites>

       <logging>
           <log type="coverage-clover" target="coverage.xml"/>
       </logging>
   </phpunit>
   ```

2. Run PHPUnit with coverage:
   ```bash
   vendor/bin/phpunit
   ```

   This generates `coverage.xml` in your project root.

---

 **1d) Configure SonarQube for Laravel**
1. **Install SonarScanner**:
   - Download and install SonarScanner from [SonarScanner](https://docs.sonarsource.com/sonarqube/latest/analysis/scan/sonarscanner/).

2. **Add `sonar-project.properties` File**:
   Create a file in your project root:
   ```bash
   touch sonar-project.properties
   ```

   Add the following configuration:
   ```properties
   sonar.projectKey=laravel_project
   sonar.sources=./app
   sonar.tests=./tests
   sonar.php.coverage.reportPaths=coverage.xml
   sonar.host.url=http://localhost:9000
   sonar.login=<your-sonarqube-token>
   ```

   Replace `<your-sonarqube-token>` with the token generated in **SonarQube > My Account > Security**.

---

 **1e) Run SonarScanner**
Run the scanner to analyze your code:
```bash
sonar-scanner
```

---

**1f) Verify Code Coverage in SonarQube**
1. Go to your SonarQube dashboard.
2. Navigate to your project.
3. Check the **Code Coverage** section for metrics.

**Key Metrics**:
- **Coverage**: Percentage of code covered by tests.
- **Duplications**: Duplicate code that should be reduced.
- **Code Smells**: Maintainability issues.

---

