export default function Keyboard(props) {
    
    function handleSaveClick() {
        let task = {}
        let input = { name : document.querySelector('#task-name'), description : document.querySelector('#task-description'), status : document.querySelector('#task-status'), createAnother : document.querySelector('#create-another')}
        task.name = input.name.value
        task.status = input.status.value
        if(!task.status) task.status = 'todo'
        task.description = input.description.value
        //if current id exists
        //set current id to task
        //updateTask(task)
        //else
        props.onSave(task)
        resetModal()
        if(!input.createAnother.checked) {
            closeModal()
        }
    }

    function resetModal() {
        let input = { name : document.querySelector('#task-name'), description : document.querySelector('#task-description'), status : document.querySelector('#task-status'), createAnother : document.querySelector('#create-another')}
        input.name.value = ''
        input.description.value = ''
        input.status.value = ''
    }

    function closeModal() {
        var modal = document.querySelector(".modal");
        modal.style.display = "none";
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="create-new-task-block" id="create-new-task-block">
                    <strong id="modal-heading">Create task</strong>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="task-name">Task</label>
                        <input className="form-row-input" type="text" name="task-name" id="task-name"></input>
                    </span>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="task-name">Description</label>
                        <textarea className="form-row-input" name="task-description" id="task-description" cols="70" rows="10"></textarea>
                    </span>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="task-name">Status</label>
                        <select className="form-row-input" name="task-status" id="task-status">
                            <option value="todo">To Do</option>
                            <option value="inprogress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </select>
                    </span>
                    <div className="form-btn-container">
                        <div className="create-another-container">
                            <input type="checkbox" id="create-another"></input>
                            <span>Create Another</span>
                        </div>
                        <div className="buttons">
                            <button id="cancel-button" onClick={() => closeModal()}>Cancel</button>
                            <button id="save-button" onClick={() => handleSaveClick()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}