import React from "react";
import ButtonClose from "./ButtonClose";

function PopupWithImage(props) {

  return (
    <div className={`popup popup__closed popup__zoom-card ${props.isOpen && "popup_opened"}`}>
      <div className="popup__zoom">
        <img
          src={props.image.link}
          alt={props.image.name}
          className="popup__image"/>
        <ButtonClose closeHandler={props.onClose}/>
        <h2 className="popup__card-name">{props.image.name}</h2>
      </div>
      <div className="popup__overlay" onClick={props.onClose}/>
    </div>
  )
}

export default PopupWithImage;