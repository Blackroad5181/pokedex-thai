function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="ค้นหาชื่อไทยหรืออังกฤษ"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
