import Util from "../../util/Util"
import TaskForm from "../TaskForm/TaskForm"
import Data from "../../data/Data";

export default function Tasks(props) {

    let boardId = props.selectedBoardId
    let tasks = props.tasks
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
            for(let task of tasks[section]) {
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

    function drag(event) {
        event.dataTransfer.setData("targetId", event.target.id);
        event.dataTransfer.setData("fromSectionId", event.target.parentNode.id);
    }

    function drop(ev) {
        ev.preventDefault()
        var targetId = ev.dataTransfer.getData("targetId")
        var fromSectionId = ev.dataTransfer.getData("fromSectionId")
        if(Util.isSame(ev.currentTarget.id, fromSectionId)) return
        Data.replaceTask(targetId, fromSectionId, ev.currentTarget.id)
        props.onTaskUpdate()
    }
    
    function allowDrop(event) {
        event.preventDefault();
    }

    function handleSave(task) {
        task.id = Data.getUniqueId()
        task.boardId = boardId
        Data.insertTask(task)
        props.onTaskUpdate()
    }

    function deleteTask(taskId) {
        Data.removeTask(taskId)
        props.onTaskUpdate()
    }

    return(
        <>
            <div className='main-container'>
                <div className='kanban-board'>
                    {kanbanSections}
                </div>
            </div>
            <TaskForm onSave={handleSave} />
        </>
    )

}