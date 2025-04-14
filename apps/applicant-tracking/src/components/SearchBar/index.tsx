import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Applicant Name"
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
  },
  input: {
    width: '250px',
    height: '36px',
    padding: '0 12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  },
};

export default SearchBar;