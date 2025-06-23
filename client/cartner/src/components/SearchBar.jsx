import React from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import Button from "./Button";
import "../styles/SearchBar.css";

const SearchBar = ({ placeholder, onSearch, buttonLabel = "Search", size = "md" }) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className={`search-bar ${size}`} onSubmit={handleSubmit}>
      {/* Visually hidden label for accessibility and autofill */}
      <label htmlFor="search-input" className="visually-hidden">
        Search
      </label>

      <span className="search-icon">
        <FaSearch />
      </span>

      <input
        type="text"
        className="search-input"
        id="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="search-btn-wrap">
        <Button size={size} type="submit">
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default SearchBar;