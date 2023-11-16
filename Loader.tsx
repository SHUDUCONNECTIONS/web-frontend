import React from 'react';

const Loader: React.FC<{ color: string }> = (props) => {
  return (
    <div className="loader">
      <div className="spinner" style={{ borderColor: props.color }}></div>
    </div>
  );
};

export default Loader;
