const SearchBar = ({ value, onChange }) => (
    <input
      type="text"
      className="p-2 border border-gray-300 rounded-lg  w-full"
      placeholder="Rechercher..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
  
  export default SearchBar;
  