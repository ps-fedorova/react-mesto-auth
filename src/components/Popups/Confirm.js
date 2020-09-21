import React from 'react';
import FormPopup from './FormPopup';

function Confirm(props) {
  const handleCardDelete = (evt) => {
    evt.preventDefault();
    props.onCardDelete();
  };

  return (
    <FormPopup
      name="are-you-sure"
      title="Вы уверены?"
      submitName="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleCardDelete}

    />
  );
}

export default Confirm;
