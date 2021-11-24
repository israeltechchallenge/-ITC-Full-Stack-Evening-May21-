import { useEffect } from 'react';
import AddTweet from './components/AddTweet';
import TweetList from './components/TweetList';
import { useState } from 'react';
import { getTweetsFromServer, addTweet } from './utlis/server'
import InfoContext from './components/InfoContext';
function App() {

  const [tweets, setTweets] = useState([])
  const [inAddingProcces, setInAddingProcces] = useState(false)
  const [isLoading, setIsloading] = useState(true)

  const getTweets = async () => {
    const currentTweets = await getTweetsFromServer()
    setTweets(currentTweets)
    setIsloading(false)
  }

  const AddNewTweet = async (newTweet) => {
    setInAddingProcces(true)
    const newServerTweet = await addTweet(newTweet)
    setInAddingProcces(false)
    console.log({newServerTweet})
    setTweets([ newServerTweet,...tweets ])
  }
  

  useEffect(() => {
    getTweets()
  }, [])

  useEffect(() => {
    setInterval(getTweets,2000)
  },[])


  return (

    <div className="app">
      <div className="content">
        <InfoContext.Provider value={{AddNewTweet,inAddingProcces,tweets}}>
          <AddTweet/>
          {isLoading ?
            <div className="loading">
                Loading...
            </div> 
          :
            <TweetList />
          }
          </InfoContext.Provider>
      </div>
    </div>
  );
}

export default App;
