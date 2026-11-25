function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <nav className="category-list" aria-label="Task categories">
      <button
        className={selectedCategory === "All" ? "selected" : ""}
        type="button"
        aria-pressed={selectedCategory === "All"}
        onClick={() => onSelectCategory("All")}
      >
        <span className="category-dot all-dot" />
        All categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "selected" : ""}
          type="button"
          aria-pressed={selectedCategory === category}
          onClick={() => onSelectCategory(category)}
        >
          <span className="category-dot" />
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryList;
