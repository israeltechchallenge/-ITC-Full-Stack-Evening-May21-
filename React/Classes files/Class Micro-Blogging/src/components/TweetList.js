import { useContext } from 'react'
import Tweet from './Tweet';
import InfoContext from './InfoContext'
export default function TweetList() {
    const infoConsumer = useContext(InfoContext)
    return (
        <div className="tweetsList">
            {infoConsumer.tweets && infoConsumer.tweets.map(tweet => <Tweet tweet={tweet} key={tweet.id || ''} />)}
        </div>
    )
}
