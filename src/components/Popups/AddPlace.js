import React from 'react';
import FormPopup from './FormPopup';

function AddPlace(props) {
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: '',
  });
  const [link, setLink] = React.useState('');
  const [linkError, setLinkError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: '',
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
      errorMessage: '',
    });
    setLinkError({
      classInput: '',
      classError: '',
      errorMessage: '',
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
        classInput: 'form__input_error',
        classError: 'form__error_visible',
        errorMessage: evt.target.validationMessage,
      });
      setIsNameValid(false);
    } else {
      setNameError({
        classInput: '',
        classError: '',
        errorMessage: '',
      });
      setIsNameValid(true);
    }
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);

    if (!evt.target.validity.valid) {
      setLinkError({
        classInput: 'form__input_error',
        classError: 'form__error_visible',
        errorMessage: evt.target.validationMessage,
      });
      setIsLinkValid(false);
    } else {
      setLinkError({
        classInput: '',
        classError: '',
        errorMessage: '',
      });
      setIsLinkValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCardSubmit({
      name,
      link,
    });
  }

  return (
    <FormPopup
      name="add-place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitName={props.isPopupLoading ? 'Создать...' : 'Создать'}
      isDisabled={!isFormValid}
    >
      <label className="form__field form__field_type_popup">
        <input
          className={`form__input form__input_type_popup ${nameError.classInput}`}
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
          className={`form__error ${nameError.classError}`}
          id="about-error"
        >
          {nameError.errorMessage}
        </span>
      </label>
      <label className="form__field form__field_type_popup">
        <input
          className={`form__input form__input_type_popup ${linkError.classInput}`}
          id="link"
          name="src"
          placeholder="Ссылка на картинку"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}/>
        <span
          className={`form__error ${linkError.classError}`}
          id="about-error"
        >
          {linkError.errorMessage}
        </span>
      </label>
    </FormPopup>
  );
}

export default AddPlace;
