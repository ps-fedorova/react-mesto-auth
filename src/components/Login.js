import React from 'react';
import Entrance from './Entrance';

function Login(props) {

  function submitForm(password, email) {
    props.onLogin(password, email);
  }

  return (
    <Entrance
      submitName="Войти"
      title="Вход"
      entranceText='Ещё не зарегистрированы? '
      entranceLinkText='Регистрация'
      path='/sign-up'
      onSubmit={submitForm}
      cleanCodeStatusInfo={props.cleanCodeStatusInfo}
    />
  );
}

export default Login;
