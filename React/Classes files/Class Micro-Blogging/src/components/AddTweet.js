import { useState } from 'react'

export default function AddTweet({ AddNewTweet }) {
    const [tweetText, setTweetText] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(true)
    
    const handleChange = (e) => {
        setTweetText(e.target.value)
        if(e.target.value.length < 1 || e.target.value.length > 140)
            setSubmitDisabled(true)
        else 
            setSubmitDisabled(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        AddNewTweet({text:tweetText,user:'israel'})
    }
    return (
        <div className="addTweet">
            <form onSubmit={handleSubmit} className="addTweetForm">
                <textarea 
                    className={'newTweetTextArea'} 
                    placeholder="What you have in mind..."
                    value={tweetText}
                    onChange={handleChange}
                    />
                <div className="submitButton" style={{opacity:submitDisabled ? '0.5' : '1'}}>
                    <input type="submit" className="addTweetSubmit" value="Tweet" disabled={submitDisabled}/>    
                </div>
                
            </form>
        </div>
    )
}

