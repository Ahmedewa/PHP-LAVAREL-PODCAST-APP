


**1.1.2 Horizontal Scaling**
Horizontal scaling involves adding more servers to distribute traffic and load.

- **Steps**:
  1. Use **load balancers** like **AWS Elastic Load Balancer** or **Nginx**.
  2. Deploy the application on cloud platforms (AWS, Azure, GCP) with **auto-scaling** enabled.
  3. Use **container orchestration** tools like Kubernetes for managing multiple server instances.

**Kubernetes Deployment**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: podcast-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: podcast
  template:
    metadata:
      labels:
        app: podcast
    spec:
      containers:
      - name: podcast-app
        image: podcast-app:latest
        ports:
        - containerPort: 8000
```

---

 **1.1.3 Optimized Queries**
- **Indexes**: Add indexes for frequently queried columns.
  ```sql
  CREATE INDEX idx_title ON podcasts(title);
  ```

- **Eager Loading**: Use Laravel’s `with()` to avoid N+1 query problems.
  ```php
  $podcasts = Podcast::with('episodes', 'category')->get();
  ```

