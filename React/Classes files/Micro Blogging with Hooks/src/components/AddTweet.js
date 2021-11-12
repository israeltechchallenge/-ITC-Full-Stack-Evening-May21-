import { useState, useContext } from 'react'
import InfoContext from './InfoContext'
export default function AddTweet() {
    const [tweetText, setTweetText] = useState('')
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const infoConsumer = useContext(InfoContext)
    const handleChange = (e) => {
        setTweetText(e.target.value)
        if(e.target.value.length < 1 || e.target.value.length > 140)
            setSubmitDisabled(true)
        else 
            setSubmitDisabled(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newDate = new Date().toISOString()
        infoConsumer.AddNewTweet({content:tweetText,userid:'y1jBBj4dCL1L5Js700Xp',date:newDate})
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
                    <input type="submit" className="addTweetSubmit" value="Tweet" disabled={submitDisabled || infoConsumer.inAddingProcces}/>    
                </div>
                
            </form>
        </div>
    )
}

