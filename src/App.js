import { useState } from 'react';
import './App.css';
import Data from './data/Data';
import Boards from './components/Boards/Boards';
import Tasks from './components/Tasks/Tasks';

function App() {
    const[boardId, setBoardId] = useState(0)
    const[tasks, setTasks] = useState(Data.loadData(boardId))

    function handleBoardClick(selectedBoardId) {
        setBoardId(selectedBoardId)
        setTasks(Data.loadData(selectedBoardId))
    }

    function updateTasks() {
        setTasks(Data.loadData(boardId))
    }

    return (
        <>
            <Boards selectedBoardId={boardId} onBoardClick={(selectedBoardId) => handleBoardClick(selectedBoardId)}/>
            <Tasks tasks={tasks} onTaskUpdate={updateTasks} selectedBoardId={boardId} />
        </>
    );
}

export default App;
