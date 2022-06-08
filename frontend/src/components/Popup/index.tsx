import React from 'react';
import './index.css';

const Popup = ({ isVisible, message, onClose }: {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}): JSX.Element => {
  return (
    <span className="popup" onClick={onClose} style={{ display: isVisible ? 'block' : 'none' }}>{message}</span>
  );
};

export default Popup;
