import React from 'react';
import {
  Route, Switch, useLocation, Redirect, useHistory,
} from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImageZoom from './Popups/ImageZoom';
import Confirm from './Popups/Confirm';
import EditProfile from './Popups/EditProfile';
import EditAvatar from './Popups/EditAvatar';
import AddPlace from './Popups/AddPlace';
import Spinner from './Spinner';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/API';
import Login from './Login';
import MenuMobile from './MenuMobile';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './Popups/InfoTooltip';
import * as auth from '../utils/auth';

import success from '../images/status-code-SUCCESS.svg';
import clientError from '../images/status-code-CLIENT_ERROR.svg';
import loading from '../images/status-code-LOADING-black.svg';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    avatar: '',
    about: '',
    _id: '',
  });
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPopupLoading, setIsPopupLoading] = React.useState(false);

  const [dataImage, setDataImage] = React.useState({
    link: '',
    name: '',
  });
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [codeStatusInfo, setCodeStatusInfo] = React.useState({
    iconStatus: loading,
    text: 'Загрузка...',
  });

  const [isShowMenu, setIsShowMenu] = React.useState('menu-mobile_type_close');
  const [classHeaderMenu, setClassHeaderMenu] = React.useState('header__menu_type_closed');
  const location = useLocation();
  const history = useHistory();

  // Проверить токен
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [history]);


  function cleanCodeStatusInfo() {
    setCodeStatusInfo(
      {
        iconStatus: loading,
        text: 'Загрузка...',
      }
    )
  }

  function handleRegister(password, email) {

    cleanCodeStatusInfo();

    auth.register(escape(password), email)
      .then(() => {
        setCodeStatusInfo({ iconStatus: success, text: 'Регистрация прошла успешно!' });
      })
      .catch((err) => setCodeStatusInfo({ iconStatus: clientError, text: err.message }));
    setInfoTooltipOpen(true);
  }


  function handleLogin(password, email) {

    cleanCodeStatusInfo();

    auth.authorize(escape(password), email)
      .then((data) => {
        auth.getContent(data)
          .then((res) => {
            setEmail(res.data.email);
          })
          .catch(err => console.log(err));
        setLoggedIn(true);
        setCodeStatusInfo({ iconStatus: success, text: 'Вход выполнен!' });
        history.push('/');
      })

      .catch((err) => setCodeStatusInfo({ iconStatus: clientError, text: err.message }))
    setInfoTooltipOpen(true);
  }

  React.useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getInitialUserInfo(), api.getInitialCards()])
      .then(([initialUserInfo, initialCards]) => {
        setCurrentUser(initialUserInfo);
        setCards(initialCards);
        setIsLoading(false);
      })
      .catch((err) => console.log(`Данные пользователя и карточки не прогрузились. ${err}`));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setCardDelete(card);
    setIsConfirmPopupOpen(true);
  }

  function handleCardZoom(props) {
    setSelectedCard(true);
    setDataImage({ link: props.link, name: props.name });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(false);
    setInfoTooltipOpen(false);
  }

  function handleEsc(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Не удалось поставить лайк. ${err}`);
      });
  }

  function handleCardDelete() {
    api.deleteCard(cardDelete._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardDelete._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки. ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsPopupLoading(true);
    return api.editUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка обновлении информации о пользователе. ${err}`))
      .finally(() => {
        setIsPopupLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsPopupLoading(true);
    return api.editUserAvatar({ avatar })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка при обновлении аватара. ${err}`))
      .finally(() => {
        setIsPopupLoading(false);
      });
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsPopupLoading(true);
    return api.postUserCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки. ${err}`))
      .finally(() => {
        setIsPopupLoading(false);
      });
  };

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
    history.push('/sign-in');
  }

  function showMenu() {
    isShowMenu === 'menu-mobile_type_close'
      ? setIsShowMenu('menu-mobile_type_open')
      : setIsShowMenu('menu-mobile_type_close');

    classHeaderMenu === 'header__menu_type_opened'
      ? setClassHeaderMenu('header__menu_type_closed')
      : setClassHeaderMenu('header__menu_type_opened')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {loggedIn &&
      < MenuMobile
        email={email}
        signOut={handleSignOut}
        isShowMenu={isShowMenu}
      />
      }
      <Header
        loggedIn={loggedIn}
        locaction={location}
        email={email}
        signOut={handleSignOut}
        showMenu={showMenu}
        classHeaderMenu={classHeaderMenu}
      />
      <Switch>
        {isLoading
          ? <Spinner/>
          : <ProtectedRoute exact path="/"
                            loggedIn={loggedIn}
                            component={Main}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddCard={handleAddCardClick}
                            onCardZoom={handleCardZoom}
                            onCardDelete={handleDeleteCardClick}
                            onCardLike={handleCardLike}
                            cards={cards}
          />
        }
        <Route path='/sign-in'>
          <Login onLogin={handleLogin}/>
        </Route>

        <Route path='/sign-up'>
          <Register onRegister={handleRegister}/>
        </Route>

        <Route>
          {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
        </Route>
      </Switch>

      <Footer/>

      <EditAvatar
        isOpen={isEditAvatarPopupOpen}
        isPopupLoading={isPopupLoading}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfile
        isOpen={isEditProfilePopupOpen}
        isPopupLoading={isPopupLoading}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlace
        isOpen={isAddCardPopupOpen}
        isPopupLoading={isPopupLoading}
        onClose={closeAllPopups}
        onAddCardSubmit={handleAddPlaceSubmit}
      />

      <Confirm
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        loggedIn={loggedIn}
        codeStatusInfo={codeStatusInfo}
      />

      <ImageZoom
        isOpen={selectedCard}
        onClose={closeAllPopups}
        image={dataImage}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
