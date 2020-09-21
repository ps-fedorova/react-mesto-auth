import React from 'react';
import FormPopup from './FormPopup';

function InfoTooltip(props) {
  return (
    <FormPopup
      name="info-tooltip"
      formName='infoTooltip'
      isOpen={props.isOpen}
      onClose={props.onClose}
      loggedIn={props.loggedIn}
      infoTooltip={true}
    >
      <img src={props.codeStatusInfo.iconStatus} alt='Иконка с ответом сервера' className='form__icon'/>
      <div className='form__position-title-popup-info'>
        <p className='form__title'>{props.codeStatusInfo.text}</p>
      </div>
    </FormPopup>
  );
}

export default InfoTooltip;
