import React, { useState, useRef, useEffect } from 'react';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.task);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleEditSubmit(e) {
    e.preventDefault();
    const trimmed = editValue.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed);
    setEditing(false);
  }

  function handleEditKeyDown(e) {
    if (e.key === 'Escape') {
      setEditValue(todo.task);
      setEditing(false);
    }
  }

  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      {/* Checkbox */}
      <button
        className={styles.checkbox}
        onClick={() => onToggle(todo.id, todo.completed)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4.2 7.5L10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Task text or edit form */}
      {editing ? (
        <form className={styles.editForm} onSubmit={handleEditSubmit}>
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
            maxLength={200}
          />
          <button type="submit" className={styles.saveBtn}>Save</button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => { setEditValue(todo.task); setEditing(false); }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <span
          className={styles.task}
          onDoubleClick={() => !todo.completed && setEditing(true)}
          title={!todo.completed ? 'Double-click to edit' : ''}
        >
          {todo.task}
        </span>
      )}

      {/* Actions */}
      {!editing && (
        <div className={styles.actions}>
          {!todo.completed && (
            <button
              className={styles.editBtn}
              onClick={() => setEditing(true)}
              aria-label="Edit task"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9.5 2L12 4.5L5 11.5H2.5V9L9.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 3.5h10M5.5 3.5V2.5h3V3.5M5 6v5M9 6v5M3.5 3.5l.5 8h6l.5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
