import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import styles from './App.module.css';

const API_URL = 'http://localhost:3001/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(task) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, completed: false }),
      });
      if (!res.ok) throw new Error('Failed to add todo');
      const newTodo = await res.json();
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTodo(id, completed) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete todo');
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function editTodo(id, task) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });
      if (!res.ok) throw new Error('Failed to edit todo');
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header activeCount={activeCount} total={todos.length} />
        <AddTodoForm onAdd={addTodo} />
        {error && (
          <div className={styles.error}>
            ⚠ {error} — is the backend running on port 3001?
          </div>
        )}
        <FilterBar filter={filter} onFilter={setFilter} counts={{
          all: todos.length,
          active: todos.filter(t => !t.completed).length,
          completed: todos.filter(t => t.completed).length,
        }} />
        <TodoList
          todos={filteredTodos}
          loading={loading}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
