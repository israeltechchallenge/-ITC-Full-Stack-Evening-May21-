import localForage from "localforage";
import Tweet from './../components/Tweet';

export const getTweetsFromLocalStore = async () => {
    try {
        const tweets = await localForage.getItem('tweets')
         return tweets
    }
    catch (e) {
        console.log('error getting tweets',e)
        return []
    }
  
}

export const saveTweets = async (tweets) => {
    try {
        await localForage.setItem('tweets', tweets)
    }
    catch (e){
        console.log(e)
    }
    
}