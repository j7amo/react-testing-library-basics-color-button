/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [buttonText, setButtonText] = useState('Change to blue');
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const buttonClickHandler = () => {
    setButtonColor((prevState) => (prevState === 'red' ? 'blue' : 'red'));
    setButtonText((prevState) => (prevState === 'Change to blue' ? 'Change to red' : 'Change to blue'));
  };

  const checkBoxClickHandler = (evt) => {
    if (evt.target.checked === true) {
      setIsButtonEnabled(false);
      setButtonColor('grey');
    } else {
      setIsButtonEnabled(true);
      setButtonColor(buttonText === 'Change to blue' ? 'red' : 'blue');
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
