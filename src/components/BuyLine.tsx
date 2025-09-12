import React, { useEffect, useState } from 'react';
import { InputNumber } from './InputNumber';
import './BuyLine.css';
import { Chip } from './Chip';
import { ValueWithUnit } from './ValueWithUnit';

const SendIcon: React.FC<{ className?: string; disabled?: boolean }> = ({
  className,
  disabled,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    width="20"
    height="20"
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
        stroke={disabled ? '#999FA1' : '#009CDF'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Shape_2"
        d="M19.2069 1.18083L9.67106 10.7167"
        stroke={disabled ? '#999FA1' : '#009CDF'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const EditIcon: React.FC<{ className?: string; disabled?: boolean }> = ({
  className,
  disabled,
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10.1221 5.00073C10.5362 5.00073 10.8719 5.33666 10.8721 5.75073C10.8721 6.16495 10.5363 6.50073 10.1221 6.50073H2.62207C2.20796 6.50073 1.87223 6.83666 1.87207 7.25073V22.2507C1.87207 22.6649 2.20786 23.0007 2.62207 23.0007H17.6221C18.0363 23.0007 18.3721 22.6649 18.3721 22.2507V14.7507C18.3722 14.3367 18.708 14.0007 19.1221 14.0007C19.5362 14.0007 19.8719 14.3367 19.8721 14.7507V22.2507C19.8721 23.4934 18.8647 24.5007 17.6221 24.5007H2.62207C1.37943 24.5007 0.37207 23.4934 0.37207 22.2507V7.25073C0.37223 6.00823 1.37953 5.00073 2.62207 5.00073H10.1221ZM18.501 1.37866C19.6725 0.207539 21.5717 0.207579 22.7432 1.37866C23.9145 2.55026 23.9147 4.45033 22.7432 5.62183L13.1973 15.1677C13.0826 15.2823 12.9339 15.3567 12.7734 15.3796L9.06152 15.9109C8.56668 15.9817 8.14253 15.5571 8.21289 15.0623L8.74219 11.3494C8.76511 11.1888 8.84046 11.0403 8.95508 10.9255L18.501 1.37866ZM21.6826 2.44019C21.0968 1.85439 20.1473 1.85439 19.5615 2.44019L10.1924 11.8093L9.83887 14.2839L12.3135 13.9304L21.6826 4.56128C22.2683 3.9756 22.2681 3.02601 21.6826 2.44019Z"
      fill={disabled ? '#999FA1' : '#009CDF'}
    />
  </svg>
);

const TrashIcon: React.FC<{ className?: string; disabled?: boolean }> = ({
  className,
  disabled,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    width="20"
    height="20"
    overflow="visible"
    className={className}
    viewBox="0 0 24 22"
    fill="none"
  >
    <path
      id="color"
      d="M14.6025 0C15.9552 0.000251909 17.0595 1.08982 17.0596 2.44434V3.42188H23.2773C23.6764 3.422 23.9998 3.75048 24 4.15527C24 4.52653 23.7278 4.83328 23.375 4.88184L23.2773 4.88867H20.5312V19.5557C20.531 20.9101 19.426 21.9999 18.0732 22H5.92871C4.57593 22 3.47095 20.9102 3.4707 19.5557V4.88867H0.722656C0.323522 4.88854 0 4.5602 0 4.15527C0.000141537 3.78415 0.272248 3.47726 0.625 3.42871L0.722656 3.42188H6.93945V2.44434C6.93951 1.08966 8.04456 0 9.39746 0H14.6025ZM4.91602 19.5557C4.91625 20.0551 5.30736 20.4737 5.81738 20.5273L5.92773 20.5332H18.0723C18.6355 20.5332 19.0847 20.0908 19.085 19.5557V4.88867H4.91602V19.5557ZM9.39648 8.55566C9.76246 8.55566 10.0654 8.83151 10.1133 9.18945L10.1191 9.28906V16.1338C10.1189 16.5386 9.79557 16.8662 9.39648 16.8662C9.03062 16.8661 8.72852 16.5903 8.68066 16.2324L8.67383 16.1338V9.28906C8.67383 8.88413 8.99735 8.55579 9.39648 8.55566ZM14.6016 8.55566C14.9675 8.55566 15.2705 8.83151 15.3184 9.18945L15.3242 9.28906V16.1328C15.3242 16.5378 15.0008 16.8662 14.6016 16.8662C14.2357 16.8661 13.9336 16.5903 13.8857 16.2324L13.8789 16.1328V9.28906C13.8789 8.88411 14.2024 8.55576 14.6016 8.55566ZM9.39648 1.4668C8.83325 1.46697 8.38483 1.90918 8.38477 2.44434V3.42188H15.6133V2.44434C15.6132 1.94484 15.2229 1.52638 14.7129 1.47266L14.6016 1.4668H9.39648Z"
      fill={disabled ? '#999FA1' : '#009CDF'}
    />
  </svg>
);

const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.200073 7.99971C0.200073 3.69189 3.69225 0.199707 8.00007 0.199707C12.3079 0.199707 15.8001 3.69189 15.8001 7.99971C15.8001 12.3075 12.3079 15.7997 8.00007 15.7997C3.69225 15.7997 0.200073 12.3075 0.200073 7.99971Z" fill="#4DA466"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.6803 5.68769C11.8527 5.87926 11.8372 6.17433 11.6456 6.34675L7.20112 10.3467C7.02365 10.5065 6.75423 10.5065 6.57676 10.3467L4.35456 8.34674C4.16299 8.17433 4.14746 7.87926 4.31988 7.68769C4.49229 7.49612 4.78736 7.48059 4.97893 7.65301L6.88894 9.37204L11.0212 5.653C11.2128 5.48059 11.5079 5.49612 11.6803 5.68769Z" fill="white"/>
</svg>
);
const FailureIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.200073 7.99971C0.200073 3.69189 3.69225 0.199707 8.00007 0.199707C12.3079 0.199707 15.8001 3.69189 15.8001 7.99971C15.8001 12.3075 12.3079 15.7997 8.00007 15.7997C3.69225 15.7997 0.200073 12.3075 0.200073 7.99971Z" fill="#EE695C"/>
<path fillRule="evenodd" clipRule="evenodd" d="M10.33 5.66989C10.5122 5.85213 10.5122 6.14761 10.33 6.32985L6.32997 10.3299C6.14773 10.5121 5.85225 10.5121 5.67001 10.3299C5.48776 10.1476 5.48776 9.85213 5.67001 9.66989L9.67001 5.66989C9.85225 5.48764 10.1477 5.48764 10.33 5.66989Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M5.67001 5.66989C5.85225 5.48764 6.14773 5.48764 6.32997 5.66989L10.33 9.66989C10.5122 9.85213 10.5122 10.1476 10.33 10.3299C10.1477 10.5121 9.85225 10.5121 9.67001 10.3299L5.67001 6.32985C5.48776 6.14761 5.48776 5.85213 5.67001 5.66989Z" fill="white"/>
</svg>
);
const PartialIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.200073 7.99971C0.200073 3.69189 3.69225 0.199707 8.00007 0.199707C12.3079 0.199707 15.8001 3.69189 15.8001 7.99971C15.8001 12.3075 12.3079 15.7997 8.00007 15.7997C3.69225 15.7997 0.200073 12.3075 0.200073 7.99971Z" fill="#FBA23A"/>
<path fillRule="evenodd" clipRule="evenodd" d="M11.6803 5.68769C11.8527 5.87926 11.8372 6.17433 11.6456 6.34675L7.20112 10.3467C7.02365 10.5065 6.75423 10.5065 6.57676 10.3467L4.35456 8.34674C4.16299 8.17433 4.14746 7.87926 4.31988 7.68769C4.49229 7.49612 4.78736 7.48059 4.97893 7.65301L6.88894 9.37204L11.0212 5.653C11.2128 5.48059 11.5079 5.49612 11.6803 5.68769Z" fill="white"/>
</svg>
);

const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ animation: 'spin 1s linear infinite' }}
  >
    <path
      d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
      stroke="#009CDF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
  disabled?: boolean;
  volumeMax?: { value: number };
  priceMax?: { value: number };
  iconType?: 'send' | 'edit';
  labels?: Array<{
    key: 'volume' | 'price' | 'total';
    label: string;
  }>;
  onVolumeChange?: (value: string) => void;
  onPriceChange?: (value: string) => void;
  onSend?: () => void;
  onClear?: () => void;
  className?: string;
  showStatus?: 'accepted' | 'refused' | 'partial';
  dark?: boolean;
}

export const BuyLine: React.FC<BuyLineProps> = ({
  title = 'Achat 3',
  volume = '',
  price = '',
  defaultPrice,
  showSecondInput = true,
  showTrashButton = false,
  disabled = false,
  volumeMax,
  priceMax,
  iconType = 'send',
  labels,
  onVolumeChange,
  onPriceChange,
  onSend,
  onClear,
  className = '',
  showStatus,
  dark = false,
}) => {
  const [internalVolume, setInternalVolume] = useState(volume);
  const [internalPrice, setInternalPrice] = useState(price);
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volumeHasError, setVolumeHasError] = useState(false);
  const [priceHasError, setPriceHasError] = useState(false);

  const handleVolumeChange = (newValue: string) => {
    setInternalVolume(newValue);
    onVolumeChange?.(newValue);
  };

  const handleVolumeError = (hasError: boolean) => {
    setVolumeHasError(hasError);
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

  const handlePriceError = (hasError: boolean) => {
    setPriceHasError(hasError);
  };

  const handleSend = () => {
    if (internalVolume.trim() !== '' && !volumeHasError && !priceHasError) {
      // Show success state and loading spinner
      setShowSuccessState(true);
      setIsLoading(true);

      // Wait 1 second, then execute onSend and cleanup
      setTimeout(() => {
        // Execute the onSend callback
        onSend?.();

        // Clear fields and states after successful send
        setInternalVolume('');
        setInternalPrice('');
        setVolumeHasError(false);
        setPriceHasError(false);
        setShowSuccessState(false);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleClear = () => {
    setInternalVolume('');
    setInternalPrice('');
    setVolumeHasError(false);
    setPriceHasError(false);
    setIsLoading(false);
    setShowSuccessState(false);
    onClear?.();
  };

  const calculatePrice = () => {
    // Return 0 if there are any validation errors
    if (volumeHasError || priceHasError) {
      return 0;
    }

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

  const isSendDisabled = internalVolume.trim() === '' || volumeHasError || priceHasError;

  return (
    <div 
      className={`buyline ${labels ? 'buyline--has-labels' : ''} ${dark ? 'buyline--dark' : ''} ${className}`}
      style={dark ? { backgroundColor: '#292E33' } : {}}
    >
      {/*labels && (
        <div className="buyline__labels">
          <div className="buyline__label buyline__label--title"></div>
          {labels.map((label) => (
            <>
              <div style={{ width: '64px' }}></div>
              <div key={label.key} className={`buyline__label buyline__label--${label.key}`}>
                {label.label}
              </div>
            </>
          ))}
        </div>
      )*/}
      <div className="buyline__container">
        <div className="buyline__content">
          <div className="buyline__inputs">
            {title && <div className="buyline__title">{title}</div>}

            <div className="buyline__input_container">
              {labels?.find((label) => label.key === 'volume') && (
                <div className="buyline__label--description">
                  {labels.find((label) => label.key === 'volume')?.label}
                </div>
              )}
              <InputNumber
                label="MWh"
                value={internalVolume}
                onChange={handleVolumeChange}
                onErrorChange={handleVolumeError}
                disabled={disabled}
                min={{ value: 0 }}
                max={volumeMax || { value: 9999 }}
                showSuccess={showSuccessState}
                inputWidth={70}
                theme={dark ? 'dark' : 'light'}
              />
            </div>
            {showSecondInput && (
              <div className="buyline__input_container">
                {labels?.find((label) => label.key === 'price') && (
                  <div className="buyline__label--description">
                    {labels.find((label) => label.key === 'price')?.label}
                  </div>
                )}
                <InputNumber
                  label="€/MWh"
                  value={internalPrice}
                  onChange={handlePriceChange}
                  onErrorChange={handlePriceError}
                  disabled={disabled}
                  min={{ value: 0 }}
                  max={priceMax || { value: 9999 }}
                  showSuccess={showSuccessState}
                  inputWidth={85}
                  theme={dark ? 'dark' : 'light'}
                />
              </div>
            )}
          </div>
          <div className="buyline__recette">
            {labels?.find((label) => label.key === 'total') && (
              <div className="buyline__label--description">
                {labels.find((label) => label.key === 'total')?.label}
              </div>
            )}
            <div className="buyline__total">
              <Chip 
                width="fit-content" 
                bgColor={
                  calculatePrice() === 0 
                    ? (dark ? '#292E33' : '#F2F4F4') 
                    : (dark ? '#005896' : '#E1F5FD')
                }
              >
                <ValueWithUnit
                  cost={calculatePrice()}
                  textColor={
                    calculatePrice() === 0 
                      ? '#999FA1' 
                      : (dark ? '#B3E5F9' : '#005896')
                  }
                  type="euro"
                />
              </Chip>
            </div>
          </div>
        </div>
        {showStatus ? (
          <div className="buyline__status">
            {showStatus === 'accepted' ? (
              <SuccessIcon className="buyline__status-icon" />
            ) : showStatus === 'partial' ? (
              <PartialIcon className="buyline__status-icon" />
            ) : (
              <FailureIcon className="buyline__status-icon" />
            )}
          </div>
        ) : (
          <div className="buyline__actions">
            {!disabled && (
              <button
                className={`buyline__send ${isSendDisabled || isLoading ? 'buyline__send--disabled' : ''}`}
                onClick={handleSend}
                disabled={isSendDisabled || isLoading}
                aria-label={isLoading ? 'Sending...' : iconType === 'edit' ? 'Edit' : 'Send'}
              >
                {isLoading ? (
                  <SpinnerIcon className="buyline__icon" />
                ) : iconType === 'edit' ? (
                  <EditIcon className="buyline__icon" disabled={isSendDisabled} />
                ) : (
                  <SendIcon className="buyline__icon" disabled={isSendDisabled} />
                )}
              </button>
            )}
            {showTrashButton && (
              <button
                className="buyline__trash"
                onClick={handleClear}
                disabled={isLoading}
                aria-label="Clear"
              >
                <TrashIcon className="buyline__icon" disabled={isLoading} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="buyline__border" />
    </div>
  );
};
