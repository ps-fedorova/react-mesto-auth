import React from 'react';
import Entrance from './Entrance';

function Register(props) {
  function submitForm(password, email) {
    props.onRegister(password, email);
  }

  return (
    <Entrance
      submitName="Зарегистрироваться"
      title="Регистрация"
      entranceText='Уже зарегистрированы? '
      entranceLinkText='Войти'
      onSubmit={submitForm}
      path='/sign-in'
    />
  );
}

export default Register;
