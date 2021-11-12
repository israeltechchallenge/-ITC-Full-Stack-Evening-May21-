import { useContext } from 'react'
import Tweet from './Tweet';
import InfoContext from './InfoContext'
export default function TweetList() {
    const infoConsumer = useContext(InfoContext)
    return (
        <div className="tweetsList">
            {infoConsumer.tweets && infoConsumer.tweets.map(tweet => {
                return <Tweet tweet={{...tweet, userName:infoConsumer.users.find(user => user.id === tweet.userid)?.name}} key={tweet.id || ''} />
            })}
            
            
        </div>
    )
}
