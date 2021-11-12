
import useIsUserActive from '../hooks/useIsUserActive'
export default function Tweet( { tweet, userName }) {

    const userActive = useIsUserActive(tweet.userid)

    return (
        <div className="tweet">
            <div className="tweet-user" style={{color:userActive ? 'green':'red'}}>
                {tweet.userName}
            </div>
            <div className="tweet-text">
                {tweet.content}
            </div>
        </div>
    )
}
