import UserInfoContext from "./UserInfoContext"
import { useContext } from 'react'
function UserInfoTitle() {
    const userInfo = useContext(UserInfoContext)
 return <div>
     User Email: {userInfo.email}
 </div>
}
export default UserInfoTitle