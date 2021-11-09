import React from 'react'
import Tweet from './Tweet';

export default function TweetList({ tweets }) {
    return (
        <div className="tweetsList">
            {tweets && tweets.map(tweet => <Tweet tweet={tweet} key={tweet.id || ''} />)}
        </div>
    )
}
