import React from 'react';
import { Link } from 'react-router-dom';
import ButtonClose from './ButtonClose';

function Form(props) {
  const classTitle = `${(props.entrance)
    ? 'form__title'
    : 'form__title form__title_popup'
  }`;

  const classButton = `button form__button
  ${props.entrance
    ? 'form__button_type_entrance'
    : `form__button_type_popup ${props.isDisabled ? 'form__button_disabled' : ''}`
}`;

  const classPosition = `${props.entrance
    ? 'form__position'
    : 'form__position form__position_type_popup'}`;

  const classContainer = `${props.entrance
    ? 'form__container'
    : 'form__container form__container_popup'}`;

  return (

    <div className={classContainer}>

      {!props.entrance && <ButtonClose closeHandler={props.onClose}/>}

      <h2 className={classTitle}>{props.title}</h2>
      <form className={classPosition} name={props.name} noValidate>

        {props.entrance
          ? <div className="form__position_type_entrance">{/* Обертка нужна, чтобы кнопка "войти" была подвижной */}
            {props.children} {/* Здесь лежат "инпуты" */}
          </div>
          : <>
            {props.children} {/* для попапов подвижность не нудна */}
          </>
        }

        {/* Если у нас попап с советами, то нет кнопки "отправить" */}
        {!props.infoTooltip
        && (
          <button type="submit"
                  className={classButton}
                  onClick={props.onSubmit}>
            {props.submitName}
          </button>
        )}

      </form>

      {/* ТЕКСТ под кнопкой "отправить" только для входа */}
      {props.entrance
      && (<span className='form__entrance-text'>
        {props.entranceText}
        <Link
          to={props.path} className='link'>{props.entranceLinkText}
        </Link>
      </span>)
      }

    </div>

  );
}

export default Form;
