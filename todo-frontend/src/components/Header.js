import React from 'react';
import styles from './Header.module.css';

function Header({ activeCount, total }) {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <header className={styles.header}>
      <div className={styles.dateLine}>
        <span className={styles.day}>{day}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <h1 className={styles.title}>
        Your <em>todos</em>
      </h1>
      {total > 0 && (
        <p className={styles.subtitle}>
          {activeCount === 0
            ? '🎉 All done! Enjoy your day.'
            : `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`}
        </p>
      )}
    </header>
  );
}

export default Header;
