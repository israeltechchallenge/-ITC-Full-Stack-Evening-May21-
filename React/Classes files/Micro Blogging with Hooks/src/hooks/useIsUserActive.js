import { useState, useEffect  } from 'react'
import { getFirestore, doc,  onSnapshot } from "firebase/firestore";


const useIsUserActive = (userId) => {
    const [userActive, setUserActive] = useState(false)
    const db = getFirestore();
    useEffect(() => {
        const updateState = (snapShot) => {
            const results = []
            setUserActive(snapShot.data().active)
          }
          const a = doc(db, 'users', userId)
          const unsub = onSnapshot(a, (querySnapshot) => updateState(querySnapshot));
          return () => {
              unsub()
          }
    })
    return userActive
}

export default useIsUserActive