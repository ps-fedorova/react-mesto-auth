import React from "react";
import ButtonClose from './ButtonClose';

function PopupWithForm(props) {

  return (
    <div className={`popup popup__closed popup__${props.name} ${(props.isOpen) ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <ButtonClose closeHandler={props.onClose}/>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate>
          {props.children} {/*Здесь вставка из App.js*/}
          <button type="submit" className={`button popup__button ${props.isDisabled ? 'popup__button_disabled' : ''}`}
                  onClick={props.onSubmit}
          >{props.submitName} </button>
        </form>
      </div>
      <div className="popup__overlay" onClick={props.onClose}/>
    </div>
  );
}

export default PopupWithForm;
