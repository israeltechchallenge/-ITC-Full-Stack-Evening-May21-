import { useEffect } from 'react';
import AddTweet from './components/AddTweet';
import TweetList from './components/TweetList';
import { useState } from 'react';
import { getTweetsFromLocalStore, saveTweets } from './utlis/localstore'
function App() {
  const [tweets, setTweets] = useState([])
  const AddNewTweet = (newTweet) => setTweets([ newTweet,...tweets ])
  useEffect(() => {
    const getTweets = async () => {
      const currentTweets = await getTweetsFromLocalStore()
      setTweets(currentTweets)
      console.log('got the tweets:',currentTweets )
    }
    getTweets()
  }, [])

  useEffect(() => {
    saveTweets(tweets)
    console.log('saved tweets:',tweets)
  }, [tweets])
  return (

    <div className="app">
      <div className="content">
      <AddTweet AddNewTweet={AddNewTweet}/>
      <TweetList tweets={tweets} />
      </div>
    </div>
  );
}

export default App;
