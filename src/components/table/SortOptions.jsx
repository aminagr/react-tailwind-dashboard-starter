const SortOptions = ({ value, onChange }) => (
    <select
      className="p-2 border border-gray-300 rounded-lg  w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Trier par</option>
      <option value="nouveau">Les plus récents</option>
      <option value="ancien">Les plus anciens</option>
      <option value="alphabetique">Alphabétique</option>
    </select>
  );
  
  export default SortOptions;
  