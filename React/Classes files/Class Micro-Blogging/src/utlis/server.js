 import axios from 'axios'


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
export const addTweet = async (tweet) => {
    try {
        const createdTweet = await axios.post('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',tweet)
         return createdTweet.data
    }
    catch (e) {
        console.log('error adding tweets',e)
        alert(e)
    }
}