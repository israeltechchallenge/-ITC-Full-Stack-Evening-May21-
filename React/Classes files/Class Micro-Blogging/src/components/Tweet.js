import React from 'react'

export default function Tweet( { tweet }) {
    return (
        <div className="tweet">
            <div className="tweet-user">
                {tweet.userName}
            </div>
            <div className="tweet-text">
                {tweet.content}
            </div>
        </div>
    )
}
