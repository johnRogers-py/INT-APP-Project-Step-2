import React from 'react';
import styles from './FilterBar.module.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

function FilterBar({ filter, onFilter, counts }) {
  return (
    <div className={styles.bar}>
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`${styles.btn} ${filter === key ? styles.active : ''}`}
          onClick={() => onFilter(key)}
        >
          {label}
          <span className={styles.count}>{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
