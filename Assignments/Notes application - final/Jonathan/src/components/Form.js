import TextareaAutosize from 'react-textarea-autosize'


const Form = ({ handleSumbit, handleData, handleChangeTitle, handleChangeBody, buttonLabel }) => {
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
            </div>
            <div className="d-flex justify-content-center mt-2">
                {buttonLabel = "Update" ?
                    <button className="btn btn-primary mt-4">{buttonLabel}</button>
                    :
                    <button className="save btn btn-primary">{buttonLabel}</button>}
            </div>
        </form>
    )
}

export default Form