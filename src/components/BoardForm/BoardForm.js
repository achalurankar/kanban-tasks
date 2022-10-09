export default function BoardForm(props) {

    function closeModal() {
        var modal = document.querySelector("#board-form");
        modal.style.display = "none";
    }

    function handleSaveClick() {
        let board = {}
        let boardName = document.querySelector('#board-name')
        board.name = boardName.value
        props.onSave(board)
        closeModal()
        boardName.value = '' // reset
    }

    return (
        <div id="board-form" className="modal">
            <div className="modal-content">
                <div className="create-new-task-block" id="create-new-task-block">
                    <strong id="modal-heading">Create board</strong>
                    <span className="form-row">
                        <label className="form-row-label" htmlFor="board-name">Board</label>
                        <input className="form-row-input" type="text" name="board-name" id="board-name"></input>
                    </span>
                    <div className="form-btn-container">
                        <div style={{display:"none"}} className="create-another-container">
                            <input type="checkbox" id="create-another-board"></input>
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