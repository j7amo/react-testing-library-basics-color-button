/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

export const replaceCamelCaseWithSpaces = (camelCaseName) => camelCaseName.replace(/\B([A-Z])\B/g, ' $1');

function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const [buttonText, setButtonText] = useState(
    `Change to ${replaceCamelCaseWithSpaces('MidnightBlue')}`,
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const buttonClickHandler = () => {
    setButtonColor((prevState) => (prevState === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'));
    setButtonText((prevState) => (prevState === 'Change to Midnight Blue'
      ? `Change to ${replaceCamelCaseWithSpaces('MediumVioletRed')}`
      : `Change to ${replaceCamelCaseWithSpaces('MidnightBlue')}`));
  };

  const checkBoxClickHandler = (evt) => {
    if (evt.target.checked === true) {
      setIsButtonEnabled(false);
      setButtonColor('grey');
    } else {
      setIsButtonEnabled(true);
      setButtonColor(
        buttonText === `Change to ${replaceCamelCaseWithSpaces('MidnightBlue')}`
          ? 'MediumVioletRed'
          : 'MidnightBlue',
      );
    }
  };

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor }}
        type="button"
        onClick={buttonClickHandler}
        disabled={!isButtonEnabled}
      >
        {buttonText}
      </button>
      <label htmlFor="disable-button-checkbox">Disable button</label>
      <input
        id="disable-button-checkbox"
        type="checkbox"
        onChange={checkBoxClickHandler}
      />
    </div>
  );
}

export default App;
