import React from 'react';
import Form from '../Form';

function FormPopup(props) {
  return (
    <div className={`popup popup__closed popup__${props.name} ${(props.isOpen) ? 'popup_opened' : ''}`}>
        <Form
          title={props.title}
          name={props.name}
          isDisabled={props.isDisabled}
          onSubmit={props.onSubmit}
          submitName={props.submitName}
          children={props.children}
          isPopup={true}
          infoTooltip={props.infoTooltip}
          onClose={props.onClose}
        />

      <div className="popup__overlay" onClick={props.onClose}/>
    </div>
  );
}

export default FormPopup;
