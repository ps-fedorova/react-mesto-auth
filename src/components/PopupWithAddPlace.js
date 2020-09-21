import PopupWithForm from "./PopupWithForm";
import React from "react";

function PopupWithAddPlace(props) {

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  });
  const [link, setLink] = React.useState('');
  const [linkError, setLinkError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  });

  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isLinkValid, setIsLinkValid] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);


  React.useEffect(() => {
    if (isNameValid && isLinkValid) setIsFormValid(true);

    return () => {
      setIsFormValid(false);
    };
  }, [isNameValid, isLinkValid]);


  React.useEffect(() => {
    setNameError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
    setLinkError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
    setName('');
    setLink('');
    setIsNameValid(false);
    setIsLinkValid(false);
  }, [props.isOpen]);


  function handleNameChange(evt) {
    setName(evt.target.value);

    if (!evt.target.validity.valid) {
      setNameError({
        classInput: 'popup__input_error',
        classError: 'popup__error_visible',
        errorMessage: evt.target.validationMessage
      });
      setIsNameValid(false);

    } else {
      setNameError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsNameValid(true);
    }
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value)

    if (!evt.target.validity.valid) {
      setLinkError({
        classInput: 'popup__input_error',
        classError: 'popup__error_visible',
        errorMessage: evt.target.validationMessage
      });
      setIsLinkValid(false);

    } else {
      setLinkError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsLinkValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCardSubmit({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitName={props.isPopupLoading ? 'Создать...' : 'Создать'}
      isDisabled={!isFormValid}
    >
      <label className="popup__form-field">
        <input
          className={`popup__input popup__input_new-card ${nameError.classInput}`}
          id="name-card"
          maxLength="30"
          minLength="2"
          name="title"
          placeholder="Название"
          required
          type="text"
          value={name}
          onChange={handleNameChange}/>

        <span
          className={`popup__error ${nameError.classError}`}
          id="about-error"
        >
          {nameError.errorMessage}
        </span>
      </label>
      <label className="popup__form-field">
        <input
          className={`popup__input popup__input_new-card-link ${linkError.classInput}`}
          id="link"
          name="src"
          placeholder="Ссылка на картинку"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}/>
        <span
          className={`popup__error ${linkError.classError}`}
          id="about-error"
        >
          {linkError.errorMessage}
        </span>
      </label>
    </PopupWithForm>
  )
}

export default PopupWithAddPlace