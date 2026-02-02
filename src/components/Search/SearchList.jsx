import { useState } from "react";
import "./SearchList.css";

const namesList = [
  "Ramesh Kumar",
  "Suresh Kumar",
  "Mahesh Babu",
  "Ankit Sharma",
  "Rohan Verma",
  "Ritika Sharma",
  "Amit Kumar",
  "Sumit Verma"
];

const SearchList = () => {
  const [query, setQuery] = useState("");


  const filteredNames = namesList.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );


  const highlightText = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-container">
      <h2>Live Search</h2>

      <input
        type="text"
        placeholder="Search names..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      
      {query && (
        <p className="count">
          Matching results: {filteredNames.length}
        </p>
      )}

      
      <ul>
        {filteredNames.length > 0 ? (
          filteredNames.map((name, index) => (
            <li key={index}>
              {highlightText(name, query)}
            </li>
          ))
        ) : (
          query && <p className="no-result">No matches found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchList;
