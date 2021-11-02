import { useState } from 'react'
import App from '../App'
import UserInfoContext from './UserInfoContext';

function ContextWrapper() {
    const firstUserInfo = {
      email: 'first@gmail.com'
    }
    const secondUserInfo = {
      email: 'second@yahoo.com'
    }
    const [userInfoState, setUserInfoState] = useState(firstUserInfo)
    const changeUser = () => {
      if(userInfoState.email === firstUserInfo.email)
        setUserInfoState(secondUserInfo)
      else 
        setUserInfoState(firstUserInfo)
    }
    return <div>
      <button onClick={changeUser}>
              Change User
      </button>
      <UserInfoContext.Provider value={userInfoState}>
        <App />
      </UserInfoContext.Provider>
    </div>
  }
  export default ContextWrapper