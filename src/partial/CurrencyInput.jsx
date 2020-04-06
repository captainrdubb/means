import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const defaultMaskOptions = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyInput = ({ inputProps }) => {
  const mask = createNumberMask(defaultMaskOptions);
  return <MaskedInput inputMode='numeric' mask={mask} {...inputProps} />;
};

export default CurrencyInput;
