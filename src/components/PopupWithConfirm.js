import PopupWithForm from "./PopupWithForm";
import React from "react";

function PopupWithConfirm(props) {

  const  handleCardDelete = (evt) => {
    evt.preventDefault();
    props.onCardDelete();
  }

  return (
  <PopupWithForm
    name="areYouSure"
    title="Вы уверены?"
    submitName="Да"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleCardDelete}
  />

  )
}

export default PopupWithConfirm;