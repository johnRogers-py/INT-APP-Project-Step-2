import React, { useState } from 'react';
import styles from './AddTodoForm.module.css';

function AddTodoForm({ onAdd }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a new task…"
        maxLength={200}
      />
      <button
        className={styles.button}
        type="submit"
        aria-label="Add todo"
        disabled={!value.trim()}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

export default AddTodoForm;
