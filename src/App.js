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

    function openModal() {
        console.log('in open modal')
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
        setData(Data.loadData)
    }

    function deleteTask(taskId) {

    }

    function allowDrop(event) {
        event.preventDefault();
    }

    return (
        <div className='main-container'>
            <div className='kanban-board'>
                {kanbanSections}
            </div>
        </div>
    );
}

export default App;
