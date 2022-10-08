import { useState } from 'react';
import './App.css';
import Util from './util/Util';
import Data from './data/Data';

function App() {
    const[data, setData] = useState(Data.loadData())
    let kanbanSections = createSections()

    function createSections() {
        let sections = []
        sections.push(getBlock('todo'))
        sections.push(getBlock('inprogress'))
        sections.push(getBlock('review'))
        sections.push(getBlock('done'))

        function getBlock(section) {
            let label = Util.sectionIdVsLabel[section]
            let taskBlocks = []
            for(let task of data[section]) {
                taskBlocks.push(
                    <div className='task' key={task.id} id={task.id} draggable='true' onDragStart={(event) => drag(event)}>
                        <span>{task.name}</span>
                        <span className='deleteBtn' onClick={() => deleteTask(`${task.id}`)}>&times;</span>
                    </div>
                )
            }
            return (
                <div id={section} key={section} className='kanban-block'>
                    <div className='block-header'>
                        <span id="heading">{label}</span>
                        <button id='task-button' onClick={() => openModal()}>+</button>
                    </div>
                    <div className='tasks' id={section} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
                        {taskBlocks}
                    </div>
                </div>
            )
        }

        return sections
    }

    function openModal(task) {
        let input = { name : document.querySelector('#task-name'), description : document.querySelector('#task-description'), status : document.querySelector('#task-status'), createAnother : document.querySelector('#create-another')}
        var modal = document.querySelector(".modal");
        if(task) {
            input.name.value = task.name
            input.description.value = task.description
            input.status.value = task.status
        } else {
            resetModal()
        }
        input.createAnother.checked = false
        modal.style.display = "block";
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
        task.id = Data.getUniqueId()
        Data.insertTask(task)
        resetModal()
        if(!input.createAnother.checked) {
            closeModal()
        }
        setData(Data.loadData())
    }

    function drag(event) {
        event.dataTransfer.setData("targetId", event.target.id);
        event.dataTransfer.setData("fromSectionId", event.target.parentNode.id);
    }

    function drop(ev) {
        ev.preventDefault()
        var targetId = ev.dataTransfer.getData("targetId")
        var fromSectionId = ev.dataTransfer.getData("fromSectionId")
        if(ev.currentTarget.id === fromSectionId) return
        Data.replaceTask(targetId, fromSectionId, ev.currentTarget.id)
        setData(Data.loadData())
    }

    function deleteTask(taskId) {
        Data.removeTask(taskId)
        setData(Data.loadData())
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    return (
        <>
            <div className='main-container'>
                <div className='kanban-board'>
                    {kanbanSections}
                </div>
            </div>
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
        </>
    );
}

export default App;
