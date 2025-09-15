import React, { useState, useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  width?: string;
  height?: string;
  onClose?: () => void;
  className?: string;
  backgroundColor?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  children,
  width = '400px',
  height = '300px',
  onClose,
  className = '',
  backgroundColor = 'white',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle open/close state changes
  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match this with CSS animation duration
    }
  }, [open]);

  const handleClose = () => {
    onClose?.();
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Modal */}
      {shouldRender && (
        <div className="modal-overlay" onClick={handleBackdropClick}>
          <div
            className={`modal-content ${isAnimating ? 'modal-content--open' : 'modal-content--close'} ${className}`}
            style={{
              '--modal-width': width,
              '--modal-height': height,
              backgroundColor,
            } as React.CSSProperties}
          >
            <button
              className="modal-close"
              onClick={handleClose}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};