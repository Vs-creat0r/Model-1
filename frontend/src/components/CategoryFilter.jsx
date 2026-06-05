import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-filter">
      <button 
        className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
        onClick={() => setSelectedCategory('')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
