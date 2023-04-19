import React from 'react';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button type="button" onClick={goBack}>
      <span className="material-symbols-outlined">
        arrow_back_ios
      </span>
    </button>
  );
};

export default BackButton;
