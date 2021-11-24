import { useEffect } from 'react';
import AddTweet from './components/AddTweet';
import TweetList from './components/TweetList';
import { useState } from 'react';
import { useAddTweet } from './utlis/server'
import { getFirestore,  collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";


import InfoContext from './components/InfoContext';
function App() {
  const db = getFirestore();
  const [tweets, setTweets] = useState([])
  const [users, setUsers] = useState([])

  const [inAddingProcces, setInAddingProcces] = useState(false)
  const [isLoading, setIsloading] = useState(true)

  const AddNewTweet = async (newTweet) => {
    setInAddingProcces(true)
    const newServerTweet = await useAddTweet(newTweet)
    setInAddingProcces(false)

  }
    useEffect(() => {
      const updateState = (snapShot) => {
        setIsloading(true)
        const results = []
        snapShot.forEach((doc) => results.push({id:doc.id,...doc.data()})) 
        setTweets(results)
        console.log(results)
        setIsloading(false)
      }
      const q = query(collection(db, "tweets"), orderBy('date'));
      const unsub = onSnapshot(q, (querySnapshot) => updateState(querySnapshot));
      return () => {
          unsub()
      }
    },[])

    useEffect(() => {
      const updateState = (snapShot) => {
        const results = []
        snapShot.forEach((doc) => results.push({id:doc.id,...doc.data()})) 
        setUsers(results)
        console.log(results)
      }
      const q = query(collection(db, "users"));
      const unsub = onSnapshot(q, (querySnapshot) => updateState(querySnapshot));
      return () => {
          unsub()
      }
    },[])
  return (

    <div className="app">
      <div className="content">
        <InfoContext.Provider value={{AddNewTweet,inAddingProcces,tweets, users}}>
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
