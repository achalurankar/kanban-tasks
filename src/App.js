import { useState } from 'react';
import './App.css';
import Util from './util/Util';
import Data from './data/Data';
import Modal from './components/Modal';

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

    function openModal() {
        let input = { name : document.querySelector('#task-name'), description : document.querySelector('#task-description'), status : document.querySelector('#task-status'), createAnother : document.querySelector('#create-another')}
        var modal = document.querySelector(".modal");
        input.createAnother.checked = false
        modal.style.display = "block";
    }

    function handleSave(task) {
        task.id = Data.getUniqueId()
        Data.insertTask(task)
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
            <Modal onSave={handleSave} />
        </>
    );
}

export default App;
