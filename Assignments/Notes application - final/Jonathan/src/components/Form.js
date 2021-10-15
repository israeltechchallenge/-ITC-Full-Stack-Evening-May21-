import TextareaAutosize from 'react-textarea-autosize'
import DateTimePicker from 'react-datetime-picker';

const Form = ({ handleSumbit, handleData, handleDate, handleChangeTitle, handleChangeBody, buttonLabel, handleChangeDate }) => {
    return (
        <form onSubmit={handleSumbit}>
            <div className="mt-1">
                <input type="text"
                    name="title"
                    id="title"
                    value={handleData.title}
                    className="form-control border-0 mb-2"
                    placeholder="Title"
                    onChange={handleChangeTitle} />
                <TextareaAutosize
                    id="notes"
                    name="body"
                    cols="40"
                    minRows={2}
                    cacheMeasurements
                    placeholder="Type to add a note..."
                    className="form-control border-0 textarea"
                    value={handleData.body}
                    onChange={handleChangeBody}
                    required
                />
                {buttonLabel !== "Update" ?
                    <div className="d-flex justify-content-center align-center">
                        <label htmlFor="datetime" className="me-2">DateToRemind:</label>
                        <DateTimePicker
                            id="datetime"
                            name="datetime"
                            onChange={handleChangeDate}
                            value={handleDate}
                            required
                        /> 
                    </div> 
                    : null

                }


            </div>

            <div className="d-flex justify-content-center mt-2">
                {buttonLabel === "Update" ?
                    <button className="btn btn-primary mt-4">{buttonLabel}</button>
                    :
                    <button className="save btn btn-primary mt-4">{buttonLabel}</button>}
            </div>
        </form>
    )
}

export default Form