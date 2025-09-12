/**
 * Formats a number using French locale formatting
 * @param value - The number to format
 * @returns Formatted string with French number conventions (spaces as thousands separators)
 */
export const formatFrenchNumber = (value: number): string => {
  return new Intl.NumberFormat('fr-FR').format(value);
};

/**
 * Formats a number or string value for display
 * @param value - The value to format (number or string)
 * @returns Formatted string if input is number, original string if input is string
 */
export const formatDisplayValue = (value: number | string | undefined): string => {
  if (typeof value === 'number') {
    return formatFrenchNumber(value);
  }
  return String(value ?? '');
};
