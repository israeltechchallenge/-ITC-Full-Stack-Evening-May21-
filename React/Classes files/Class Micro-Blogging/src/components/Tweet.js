import React from 'react'

export default function Tweet( { tweet }) {
    return (
        <div className="tweet">
            <div className="tweet-user">
                {tweet.user}
            </div>
            <div className="tweet-text">
                {tweet.text}
            </div>
        </div>
    )
}
