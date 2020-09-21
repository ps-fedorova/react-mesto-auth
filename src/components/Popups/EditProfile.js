import React from 'react';
import FormPopup from './FormPopup';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function EditProfile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: '',
  });

  const [description, setDescription] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: '',
  });

  const [isFormValid, setIsFormValid] = React.useState(true);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsFormValid(true);
    setNameError({
      classInput: '',
      classError: '',
      errorMessage: '',
    });
    setDescriptionError({
      classInput: '',
      classError: '',
      errorMessage: '',
    });
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);

    if (!evt.target.validity.valid) {
      setNameError({
        classInput: 'form__input_error',
        classError: 'form__error_visible',
        errorMessage: evt.target.validationMessage,
      });
      setIsFormValid(false);
    } else {
      setNameError({
        classInput: '',
        classError: '',
        errorMessage: '',
      });
      setIsFormValid(true);
    }
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);

    if (!evt.target.validity.valid) {
      setDescriptionError({
        classInput: 'form__input_error',
        classError: 'form__error_visible',
        errorMessage: evt.target.validationMessage,
      });
      setIsFormValid(false);
    } else {
      setDescriptionError({
        classInput: '',
        classError: '',
        errorMessage: '',
      });
      setIsFormValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
    setIsFormValid(true);
  }

  return (
    <FormPopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="profile"
      title="Редактировать профиль"
      isDisabled={!isFormValid}
      submitName={props.isPopupLoading ? 'Сохранить...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="form__field form__field_type_popup">
        <input
          className={`form__input form__input_type_popup ${nameError.classInput}`}
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
          className={`form__error ${nameError.classError}`}
          id="about-error"
        >
          {nameError.errorMessage}
        </span>
      </label>

      <label className="form__field form__field_type_popup">
        <input
          className={`form__input form__input_type_popup ${descriptionError.classInput}`}
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
          className={`form__error ${descriptionError.classError}`}
          id="about-error"
        >
          {descriptionError.errorMessage}
        </span>
      </label>

    </FormPopup>
  );
}

export default EditProfile;
