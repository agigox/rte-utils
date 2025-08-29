import React, { useEffect, useState } from 'react';
import { InputNumber } from './InputNumber';
import './BuyLine.css';

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    width="100%"
    height="100%"
    overflow="visible"
    className={className}
    viewBox="0 0 21 21"
    fill="none"
  >
    <g id="send-email-1">
      <path
        id="Shape"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.90273 8.85333C1.37949 8.70573 1.01357 8.2343 1.00037 7.6908C0.987168 7.1473 1.32977 6.65867 1.84523 6.48583L18.5711 1.03083C18.7945 0.958012 19.0398 1.01645 19.2064 1.18215C19.373 1.34785 19.4327 1.5929 19.3611 1.81667L13.9102 18.5508C13.7382 19.0672 13.249 19.4107 12.7049 19.3973C12.1608 19.3839 11.6892 19.0167 11.5427 18.4925L9.67106 10.7167L1.90273 8.85333Z"
        stroke="#009CDF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Shape_2"
        d="M19.2069 1.18083L9.67106 10.7167"
        stroke="#009CDF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    width="100%"
    height="100%"
    overflow="visible"
    className={className}
    viewBox="0 0 24 22"
    fill="none"
  >
    <path
      id="color"
      d="M14.6025 0C15.9552 0.000251909 17.0595 1.08982 17.0596 2.44434V3.42188H23.2773C23.6764 3.422 23.9998 3.75048 24 4.15527C24 4.52653 23.7278 4.83328 23.375 4.88184L23.2773 4.88867H20.5312V19.5557C20.531 20.9101 19.426 21.9999 18.0732 22H5.92871C4.57593 22 3.47095 20.9102 3.4707 19.5557V4.88867H0.722656C0.323522 4.88854 0 4.5602 0 4.15527C0.000141537 3.78415 0.272248 3.47726 0.625 3.42871L0.722656 3.42188H6.93945V2.44434C6.93951 1.08966 8.04456 0 9.39746 0H14.6025ZM4.91602 19.5557C4.91625 20.0551 5.30736 20.4737 5.81738 20.5273L5.92773 20.5332H18.0723C18.6355 20.5332 19.0847 20.0908 19.085 19.5557V4.88867H4.91602V19.5557ZM9.39648 8.55566C9.76246 8.55566 10.0654 8.83151 10.1133 9.18945L10.1191 9.28906V16.1338C10.1189 16.5386 9.79557 16.8662 9.39648 16.8662C9.03062 16.8661 8.72852 16.5903 8.68066 16.2324L8.67383 16.1338V9.28906C8.67383 8.88413 8.99735 8.55579 9.39648 8.55566ZM14.6016 8.55566C14.9675 8.55566 15.2705 8.83151 15.3184 9.18945L15.3242 9.28906V16.1328C15.3242 16.5378 15.0008 16.8662 14.6016 16.8662C14.2357 16.8661 13.9336 16.5903 13.8857 16.2324L13.8789 16.1328V9.28906C13.8789 8.88411 14.2024 8.55576 14.6016 8.55566ZM9.39648 1.4668C8.83325 1.46697 8.38483 1.90918 8.38477 2.44434V3.42188H15.6133V2.44434C15.6132 1.94484 15.2229 1.52638 14.7129 1.47266L14.6016 1.4668H9.39648Z"
      fill="#009CDF"
    />
  </svg>
);

interface BuyLineProps {
  title?: string;
  volume?: string;
  price?: string;
  defaultPrice?: number;
  showSecondInput?: boolean;
  showTrashButton?: boolean;
  volumeMax?: { value: number };
  priceMax?: { value: number };
  onVolumeChange?: (value: string) => void;
  onPriceChange?: (value: string) => void;
  onSend?: () => void;
  onClear?: () => void;
  className?: string;
}

export const BuyLine: React.FC<BuyLineProps> = ({
  title = 'Achat 3',
  volume = '',
  price = '',
  defaultPrice,
  showSecondInput = true,
  showTrashButton = false,
  volumeMax,
  priceMax,
  onVolumeChange,
  onPriceChange,
  onSend,
  onClear,
  className = '',
}) => {
  const [internalVolume, setInternalVolume] = useState(volume);
  const [internalPrice, setInternalPrice] = useState(price);

  const handleVolumeChange = (newValue: string) => {
    setInternalVolume(newValue);
    onVolumeChange?.(newValue);
  };

  useEffect(() => {
    setInternalVolume(volume);
  }, [volume]);

  useEffect(() => {
    setInternalPrice(price);
  }, [price]);

  const handlePriceChange = (newValue: string) => {
    setInternalPrice(newValue);
    onPriceChange?.(newValue);
  };

  const handleSend = () => {
    if (internalVolume.trim() !== '') {
      onSend?.();
    }
  };

  const handleClear = () => {
    setInternalVolume('');
    setInternalPrice('');
    onClear?.();
  };

  const calculatePrice = () => {
    const volumeNum = parseFloat(internalVolume);
    if (!isNaN(volumeNum)) {
      if (showSecondInput) {
        const priceNum = parseFloat(internalPrice);
        if (!isNaN(priceNum)) {
          return volumeNum * priceNum;
        }
      } else if (defaultPrice !== undefined) {
        return volumeNum * defaultPrice;
      }
    }
    return 0;
  };

  const isSendDisabled = internalVolume.trim() === '';

  return (
    <div className={`buyline ${className}`}>
      <div className="buyline__border" />
      <div className="buyline__content">
        <div className="buyline__inputs">
          <div className="buyline__title">{title}</div>
          <InputNumber
            label="MWh"
            value={internalVolume}
            onChange={handleVolumeChange}
            min={{ value: 0 }}
            max={volumeMax || { value: 9999 }}
            className="buyline__input"
          />
          {showSecondInput && (
            <InputNumber
              label="€/MWh"
              value={internalPrice}
              onChange={handlePriceChange}
              min={{ value: 0 }}
              max={priceMax || { value: 9999 }}
              className="buyline__input"
            />
          )}
        </div>
        <div className="buyline__price">
          <span>{calculatePrice()} €</span>
        </div>
      </div>
      <div className="buyline__actions">
        <button
          className={`buyline__send ${isSendDisabled ? 'buyline__send--disabled' : ''}`}
          onClick={handleSend}
          disabled={isSendDisabled}
          aria-label="Send"
        >
          <SendIcon className="buyline__icon" />
        </button>
        {showTrashButton && (
          <button className="buyline__trash" onClick={handleClear} aria-label="Clear">
            <TrashIcon className="buyline__icon" />
          </button>
        )}
      </div>
    </div>
  );
};
