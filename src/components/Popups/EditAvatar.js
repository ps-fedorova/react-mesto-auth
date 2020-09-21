import React from 'react';
import FormPopup from './FormPopup';

function EditAvatar(props) {
  const avatarRef = React.useRef();

  const [urlError, setUrlError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: '',
  });

  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setUrlError({
      classInput: '',
      classError: '',
      errorMessage: '',
    });
    setIsFormValid(false);
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleChange() {
    const avatar = avatarRef.current;

    if (!avatar.validity.valid) {
      setUrlError({
        classInput: 'form__input_error',
        classError: 'form__error_visible',
        errorMessage: avatar.validationMessage,
      });
      setIsFormValid(false);
    } else {
      setUrlError({
        classInput: '',
        classError: '',
        errorMessage: '',
      });
      setIsFormValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <FormPopup
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
      submitName={props.isPopupLoading ? 'Сохранить...' : 'Сохранить'}
    >
      <label className="form__field form__field_type_popup">
        <input
          className={`form__input form__input_type_popup  ${urlError.classInput}`}
          id="link-avatar"
          ref={avatarRef}
          onChange={handleChange}
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          type="url"
        />
        <span
          className={`form__error ${urlError.classError}`}
          id="link-avatar-error"
        >
          {urlError.errorMessage}
          </span>
      </label>

    </FormPopup>
  );
}

export default EditAvatar;
