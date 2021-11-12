 import { getFirestore, addDoc, collection } from "firebase/firestore";
import axios from 'axios'
import { useContext  } from "react";
import { FirebaseContext } from './firebase'

export const getTweetsFromServer = async () => {
    try {
        const tweets = await axios.get('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet')
         return tweets.data.tweets
    }
    catch (e) {
        console.log('error getting tweets',e)
        return []
    }
}
export const useAddTweet = async (tweet) => {
    const db = getFirestore();
    //const firebase = useContext(FirebaseContext)
    try {
        //const createdTweet = await axios.post('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',tweet)
        const docRef = await addDoc(collection(db, "tweets"), tweet);
        return docRef
    }
    catch (e) {
        console.log('error adding tweets',e)
        alert(e)
    }
}