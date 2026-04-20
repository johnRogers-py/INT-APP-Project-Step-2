import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

function TodoList({ todos, loading, onToggle, onDelete, onEdit }) {
  if (loading) {
    return (
      <div className={styles.state}>
        <div className={styles.spinner} />
        <p>Loading tasks…</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className={styles.state}>
        <span className={styles.emptyIcon}>✦</span>
        <p>Nothing here. Add a task above!</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
