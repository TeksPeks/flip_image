import React from 'react';
import './index.css';

const Popup = ({ isVisible, message, onClose }) => {
  return isVisible &&
    <span className="popup" onClick={onClose}>{message}</span>;
};

export default Popup;
