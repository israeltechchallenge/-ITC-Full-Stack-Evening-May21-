import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './Quacker.scss';

import NavBar from './components/navBar';
import Home from './components/home';
import Profile from './components/profile';
import UserInfoContext from './components/userInfoContext';
import { UserInfoStateI } from './interfaces/profileStatesI';

import localforage from 'localforage';

const ContextWrapper:React.FC = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfoStateI>({ userName: 'A.J. Kwak' });

  const getLocalforageUserInfo = async () => {
    const getUserInfo: UserInfoStateI | null = await localforage.getItem('userInfo');
    setUserInfo(getUserInfo ? getUserInfo : { userName: 'A.J. Kwak' });
  }

  useEffect(() => {
      getLocalforageUserInfo();
  }, []);

  console.log(userInfo);
  return (
      <UserInfoContext.Provider value={userInfo}>
        {props.children}
      </UserInfoContext.Provider>
  );
}

const Quacker:React.FC = (): JSX.Element => {

  return (
    <ContextWrapper>
      <NavBar />
      <div className="Quacker">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <footer className="Quacker-footer">
          <p>© all rights reserved to <a className="Quacker-link" href="https://www.linkedin.com/in/yaniv-aflalo-8aa92386/" target="_blank" rel="noreferrer">Yaniv Aflalo</a>, full stack developer</p>
        </footer>
      </div>
    </ContextWrapper>
  );
}

export default Quacker;