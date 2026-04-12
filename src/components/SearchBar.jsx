function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "12px",
        maxWidth: "500px",
      }}
    >
      <input
        type="text"
        placeholder="ค้นหาชื่อไทยหรืออังกฤษ"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 14px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
