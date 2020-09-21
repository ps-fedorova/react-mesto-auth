import React from 'react';

function MenuMobile(props) {
  return (
    <div className={`menu-mobile__position ${props.isShowMenu}`}>
      <menu className='menu-mobile'>
        <span>{props.email}</span>
        <button className='button link header__link menu-mobile__exit' onClick={props.signOut}>Выйти</button>
      </menu>
    </div>
  );
}

export default MenuMobile;
