function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="ค้นหาชื่อไทยหรืออังกฤษ"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "10px",
        marginBottom: "12px",
        fontSize: "16px",
        borderRadius: "8px",
      }}
    />
  );
}

export default SearchBar;