import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search recipes..." }) => {
  return (
    <div className="search-bar-container">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
