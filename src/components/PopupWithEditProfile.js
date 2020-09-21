import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function PopupWithEditProfile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  });
  const [description, setDescription] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  });

  const [isFormValid, setIsFormValid] = React.useState(true);


  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsFormValid(true);
    setNameError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
    setDescriptionError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
  }, [currentUser, props.isOpen]);


  function handleNameChange(evt) {
    setName(evt.target.value);

    if (!evt.target.validity.valid) {
      setNameError({
        classInput: 'popup__input_error',
        classError: 'popup__error_visible',
        errorMessage: evt.target.validationMessage
      });
      setIsFormValid(false);
    } else {
      setNameError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsFormValid(true);
    }
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);

    if (!evt.target.validity.valid) {
      setDescriptionError({
        classInput: 'popup__input_error',
        classError: 'popup__error_visible',
        errorMessage: evt.target.validationMessage
      });
      setIsFormValid(false);
    } else {
      setDescriptionError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsFormValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    })
    setIsFormValid(true);
  }

  
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="profile"
      title="Редактировать профиль"
      isDisabled={!isFormValid}
      submitName={props.isPopupLoading ? 'Сохранить...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className={`popup__input popup__input_user-name ${nameError.classInput}`}
          id="name"
          maxLength="40"
          name="name"
          pattern="[A-Za-zА-Яа-яЁё]*[A-Za-zА-Яа-яЁё]+[A-Za-zА-Яа-яЁё\s\-]*[A-Za-zА-Яа-яЁё]+[A-Za-zА-Яа-яЁё\s]*"
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
          type="text"
          required
        />
        <span
          className={`popup__error ${nameError.classError}`}
          id="about-error"
        >
          {nameError.errorMessage}
        </span>
      </label>

      <label className="popup__form-field">
        <input
          className={`popup__input popup__input_user-about ${descriptionError.classInput}`}
          id="about"
          maxLength="200"
          minLength="2"
          name="about"
          placeholder="О себе"
          value={description}
          onChange={handleDescriptionChange}
          type="text"
          required
        />
        <span
          className={`popup__error ${descriptionError.classError}`}
          id="about-error"
        >
          {descriptionError.errorMessage}
        </span>
      </label>

    </PopupWithForm>
  )
}

export default PopupWithEditProfile