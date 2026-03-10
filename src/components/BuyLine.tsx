import React, { useEffect, useState } from 'react';
import { InputNumber } from './InputNumber';
import './BuyLine.css';
import { Chip } from './Chip';
import { ValueWithUnit } from './ValueWithUnit';
import {
  EditIcon,
  FailureIcon,
  PartialIcon,
  SendIcon,
  SpinnerIcon,
  SuccessIcon,
  TrashIcon,
} from './Icons';

interface BuyLineProps {
  title?: string;
  volume?: string;
  retainedVolume?: number | undefined;
  price?: string;
  bidStatus?: string;
  defaultPrice?: number;
  showSecondInput?: boolean;
  showTrashButton?: boolean;
  disabled?: boolean;
  volumeMax?: { value: number };
  priceMax?: { value: number };
  volumeMin?: { value: number };
  priceMin?: { value: number };
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
  theme?: 'light' | 'dark' | 'slate';
  hasBorderBottom?: boolean;
}

export const BuyLine: React.FC<BuyLineProps> = ({
  title = 'Achat 3',
  volume = '',
  retainedVolume = undefined,
  price = '',
  bidStatus = '',
  defaultPrice,
  showSecondInput = true,
  showTrashButton = false,
  disabled = false,
  volumeMax,
  priceMax,
  volumeMin = { value: 0 },
  priceMin = { value: 0 },
  iconType = 'send',
  labels,
  onVolumeChange,
  onPriceChange,
  onSend,
  onClear,
  className = '',
  showStatus,
  theme = 'light',
  hasBorderBottom = true,
}) => {
  const [internalVolume, setInternalVolume] = useState(volume);
  const [internalRetainedVolume, setInternalRetainedVolume] = useState(retainedVolume);
  const [internalPrice, setInternalPrice] = useState(price);
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volumeHasError, setVolumeHasError] = useState(false);
  const [retainedVolumeHasError, setRetainedVolumeHasError] = useState(false);
  const [priceHasError, setPriceHasError] = useState(false);

  // MODIFICATION: La valeur devient automatiquement le min si elle est inférieure
  const handleVolumeChange = (newValue: string) => {
    const numValue = parseFloat(newValue);
    
    // Si c'est un nombre et qu'il est inférieur au min, on force la valeur au min
    if (newValue !== '' && !isNaN(numValue) && volumeMin && numValue < volumeMin.value) {
      const minValue = volumeMin.value.toString();
      setInternalVolume(minValue);
      onVolumeChange?.(minValue);
      setVolumeHasError(false); // Pas d'erreur puisque c'est maintenant valide
      return;
    }

    setInternalVolume(newValue);
    onVolumeChange?.(newValue);
  };

  // MODIFICATION: La valeur devient automatiquement le min si elle est inférieure
  const handlePriceChange = (newValue: string) => {
    const numValue = parseFloat(newValue);
    
    // Si c'est un nombre et qu'il est inférieur au min, on force la valeur au min
    if (newValue !== '' && !isNaN(numValue) && priceMin && numValue < priceMin.value) {
      const minValue = priceMin.value.toString();
      setInternalPrice(minValue);
      onPriceChange?.(minValue);
      setPriceHasError(false); // Pas d'erreur puisque c'est maintenant valide
      return;
    }

    setInternalPrice(newValue);
    onPriceChange?.(newValue);
  };

  const handleVolumeError = (hasError: boolean) => {
    // Vérifier aussi la contrainte de min dans l'erreur
    const numValue = parseFloat(internalVolume);
    if (!isNaN(numValue) && volumeMin && numValue < volumeMin.value) {
      setVolumeHasError(true);
    } else {
      setVolumeHasError(hasError);
    }
  };

  const handleRetainedVolumeError = (hasError: boolean) => {
    setRetainedVolumeHasError(hasError);
  };

  useEffect(() => {
    setInternalVolume(volume);
  }, [volume]);

  useEffect(() => {
    setInternalRetainedVolume(retainedVolume);
  }, [retainedVolume]);

  useEffect(() => {
    setInternalPrice(price);
  }, [price]);

  const handlePriceError = (hasError: boolean) => {
    const numValue = parseFloat(internalPrice);
    if (!isNaN(numValue) && priceMin && numValue < priceMin.value) {
      setPriceHasError(true);
    } else {
      setPriceHasError(hasError);
    }
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
        setShowSuccessState(false);
        setInternalVolume('');
        setInternalPrice('');
        setVolumeHasError(false);
        setPriceHasError(false);

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
      className={`buyline ${labels ? 'buyline--has-labels' : ''} ${theme === 'dark' ? 'buyline--dark' : ''} ${theme === 'slate' ? 'buyline--slate' : ''} ${className}`}
      style={
        theme === 'dark'
          ? { backgroundColor: '#292E33' }
          : theme === 'slate'
            ? { backgroundColor: '#3B434A' }
            : {}
      }
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
                min={volumeMin}
                max={volumeMax || { value: 9999 }}
                showSuccess={showSuccessState}
                inputWidth={70}
                theme={theme}
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
                  min={priceMin}
                  max={priceMax || { value: 9999 }}
                  showSuccess={showSuccessState}
                  inputWidth={85}
                  theme={theme}
                />
              </div>
            )}
          </div>
          {(bidStatus === 'accepted' || bidStatus === 'pending') && <div className="buyline__recette">
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
                    ? theme === 'dark'
                      ? '#292E33'
                      : theme === 'slate'
                        ? '#3B434A'
                        : '#F2F4F4'
                    : theme === 'dark' || theme === 'slate'
                      ? '#005896'
                      : '#E1F5FD'
                }
              >
                <ValueWithUnit
                  cost={calculatePrice()}
                  textColor={
                    calculatePrice() === 0
                      ? '#999FA1'
                      : theme === 'dark' || theme === 'slate'
                        ? '#B3E5F9'
                        : '#005896'
                  }
                  type="euro"
                />
              </Chip>
            </div>
          </div>}
        </div>
        {retainedVolume && (
          <div className="buyline__recette ml-20">

            <div className="buyline__total">
              <Chip
                width="fit-content"
                bgColor={
                  theme === 'dark'
                    ? '#005896'
                    : theme === 'slate'
                      ? '#005896'
                      : '#E1F5FD'
                }
              >
                <ValueWithUnit
                  cost={internalRetainedVolume}
                  textColor={
                    theme === 'dark' || theme === 'slate'
                      ? '#B3E5F9'
                      : '#005896'
                  }
                  type="megawatt"
                />
              </Chip>
            </div>
          </div>
        )}
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
      {hasBorderBottom && <div className="buyline__border" />}
    </div>
  );
};