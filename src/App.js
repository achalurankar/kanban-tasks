import { useState } from 'react';
import './App.css';
import Util from './util/Util';
import Data from './data/Data';
import TaskForm from './components/TaskForm/TaskForm';
import Boards from './components/Boards/Boards';

function App() {
    const[boardId, setBoardId] = useState(0)
    const[data, setData] = useState(Data.loadData(boardId))
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
                        <button id='task-button' onClick={() => openTaskForm()}>+</button>
                    </div>
                    <div className='tasks' id={section} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}>
                        {taskBlocks}
                    </div>
                </div>
            )
        }

        return sections
    }

    function openTaskForm() {
        let input = { name : document.querySelector('#task-name'), description : document.querySelector('#task-description'), status : document.querySelector('#task-status'), createAnother : document.querySelector('#create-another')}
        var modal = document.querySelector("#task-form");
        input.createAnother.checked = false
        modal.style.display = "block";
    }

    function handleSave(task) {
        task.id = Data.getUniqueId()
        task.boardId = boardId
        Data.insertTask(task)
        setData(Data.loadData(boardId))
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
        setData(Data.loadData(boardId))
    }

    function deleteTask(taskId) {
        Data.removeTask(taskId)
        setData(Data.loadData(boardId))
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function handleBoardClick(selectedBoardId) {
        setBoardId(selectedBoardId)
        setData(Data.loadData(selectedBoardId))
    }

    return (
        <>
            <Boards selectedBoardId={boardId} onBoardClick={(selectedBoardId) => handleBoardClick(selectedBoardId)}/>
            <div className='main-container'>
                <div className='kanban-board'>
                    {kanbanSections}
                </div>
            </div>
            <TaskForm onSave={handleSave} />
        </>
    );
}

export default App;
