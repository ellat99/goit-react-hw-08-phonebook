import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <label style={styles.label}>
      Filter contacts by name:
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const styles = {
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default Filter;
