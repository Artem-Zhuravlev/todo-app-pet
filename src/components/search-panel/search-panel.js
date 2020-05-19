import React from 'react';
import './search-panel.css';

const SearchPanel = ({onSearchFilter}) => {
  return (
    <input 
      type="text"
      className="form-control search-input"
      placeholder="type to search" 
      onChange={onSearchFilter}/>
  );
}

export default SearchPanel;