import React from 'react';
import styles from './BackButton.module.css';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button className={styles.button} type="button" onClick={goBack}>
      <span className="material-symbols-outlined">
        arrow_back_ios
      </span>
    </button>
  );
};

export default BackButton;
