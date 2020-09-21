import React from 'react';
import Form from './Form';

function Entrance(props) {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: '',
  });

  const [passwordError, setPasswordError] = React.useState({
    classInput: '',
    classError: '',
    errorMessage: '',
  });

  const [password, setPassword] = React.useState('');
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [inputPasswordType, setInputPasswordType] = React.useState('password');

  React.useEffect(() => {
    if (emailValid && passwordValid) setIsFormValid(true);

    return () => {
      setIsFormValid(false);
    };
  }, [emailValid, passwordValid]);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);

    if (!evt.target.validity.valid) {
      setEmailError({
        classInput: 'form__input_error',
        classError: 'form__error_visible',
        errorMessage: evt.target.validationMessage,
      });
      setEmailValid(false);
    } else {
      setEmailError({
        classInput: '',
        classError: '',
        errorMessage: '',
      });
      setEmailValid(true);
    }
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);

    if (!evt.target.validity.valid) {
      setPasswordError({
        classInput: 'form__input_error',
        classError: 'form__error_visible',
        errorMessage: evt.target.validationMessage,
      });
      setPasswordValid(false);
    } else {
      setPasswordError({
        classInput: '',
        classError: '',
        errorMessage: '',
      });
      setPasswordValid(true);
    }
  }

  function onSubmit(evt) {
    evt.preventDefault();
    if (!email && !password) return;
    props.onSubmit(password, email);
    setPassword('');
  }

  function handleShowPassword() {
    if (inputPasswordType === 'password') {
      setInputPasswordType('text');
    } else {
      setInputPasswordType('password');
    }
  }

  return (

    <div className="entrance">
      <Form
        formName='entrance'
        title={props.title}
        submitName={props.submitName}
        entrance={true}
        onSubmit={onSubmit}
        path={props.path}
        entranceText={props.entranceText}
        entranceLinkText={props.entranceLinkText}
        isDisabled={!isFormValid}
      >
        <label className="form__field form__field_type_entrance">
          <input
            name='email'
            className={`form__input form__input_type_entrance ${emailError.classInput}`}
            id="name-card"
            placeholder="Email"
            required
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
          <span
            className={`form__error ${emailError.classError}`}
            id="about-error"
          >
          {emailError.errorMessage}
          </span>
        </label>
        <label className="form__field form__field_type_entrance">
          <input
            className={`form__input form__input_type_entrance ${passwordError.classInput}`}
            onChange={handlePasswordChange}
            type={inputPasswordType}
            id='password'
            name='password'
            value={password}
            placeholder='Пароль'
            minLength='4'
            maxLength='30'
            required
          />
          <button
            type='button'
            className={`button form__input-password form__input-password_type_${inputPasswordType} `}
            onClick={handleShowPassword}
            onKeyDown={(evt) => evt.preventDefault}/>
          <span
            className={`form__error ${passwordError.classError}`}
            id="about-error"
          >
          {passwordError.errorMessage}
            </span>
        </label>
      </Form>
    </div>
  );
}

export default Entrance;
