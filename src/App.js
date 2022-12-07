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

console.log('initiating request')
fetch('https://playful-otter-5orsso-dev-ed.my.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9pRzvMkjMb6mVmRLS1jKALgWzMgGDQhnBh4MfyEQv_ATznjlpPw9ffz3Ur.ZxRF3K6347v7GnsdgUeuJh&client_secret=6781FB6C8723F54B5C352552D8386E7ADD2CFB9F9D863C627F15155AF7E82DA4&username=achal_urankar@playful-otter-5orsso.com&password=achal123BMcp5piJtsoVWlOZd5q9WQs7', {
    method : "POST"
})
.then(res => res.json())
.then(res => {
    console.log('in then')
    console.log('res', res)
    console.log('stringified', JSON.stringify(res))
}).catch(err => {
    console.log('in catch')
    console.log('err', err)
    console.log('stringified', JSON.stringify(err))
})