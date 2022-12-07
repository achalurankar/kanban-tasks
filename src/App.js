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

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    console.log('status', this.status)
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       //document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("POST", "https://playful-otter-5orsso-dev-ed.my.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9pRzvMkjMb6mVmRLS1jKALgWzMgGDQhnBh4MfyEQv_ATznjlpPw9ffz3Ur.ZxRF3K6347v7GnsdgUeuJh&client_secret=6781FB6C8723F54B5C352552D8386E7ADD2CFB9F9D863C627F15155AF7E82DA4&username=achal_urankar@playful-otter-5orsso.com&password=achal123BMcp5piJtsoVWlOZd5q9WQs7", true);
xhttp.send();