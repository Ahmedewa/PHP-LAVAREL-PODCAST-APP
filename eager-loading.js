          EAGER-LOADING

* Eager Loading **

 ** What is Eager Loading?**
- **Definition**: Eager loading loads related data alongside the main model to 
avoid **N+1 query problems**.
- **Problem**: Lazy loading executes a separate query for each related model.

---

 ** Podcast with Episodes and Category**

 **Data Structure**
- **Podcast**: `id`, `title`, `category_id`
- **Episode**: `id`, `podcast_id`, `title`
- **Category**: `id`, `title`

---

**Eager Loading **

**Basic Query**:
```php
$podcasts = Podcast::with('category', 'episodes')->get();

foreach ($podcasts as $podcast) {
    echo $podcast->title;
    echo $podcast->category->title;

    foreach ($podcast->episodes as $episode) {
        echo $episode->title;
    }
}
```

**Output SQL Queries**:
```sql
SELECT * FROM podcasts;
SELECT * FROM categories WHERE id IN (...);
SELECT * FROM episodes WHERE podcast_id IN (...);
```

---

**Advanced Eager Loading with Constraints**
Example: Load only recent episodes for each podcast.
```php
$podcasts = Podcast::with(['episodes' => function ($query) {
    $query->where('created_at', '>', now()->subDays(30));
}])->get();
```

---

**Lazy Eager Loading**
If you’ve already retrieved podcasts and want to load relationships later:
```php
$podcasts = Podcast::all();
$podcasts->load('episodes');
```

---

