import './Boards.css';
import Data from '../../data/Data';
import BoardForm from '../BoardForm/BoardForm';
import { useState } from 'react';

export default function Boards(props) {

    const[boards, setBoards] = useState(Data.loadBoards())

    function getBoards() {
        let boardsMarkup = []
        let selectedBoardId = props.selectedBoardId
        boardsMarkup.push(<div key="0" className={`board${selectedBoardId.toString() === '0' ? ' selected' : ''}`} id="0" onClick={(event) => handleBoardClick(event)}>All</div>)
        for(let board of boards) {
            boardsMarkup.push(<div className={`board${selectedBoardId.toString() === board.id.toString() ? ' selected' : ''}`} key={board.id} id={board.id} onClick={(event) => handleBoardClick(event)}>{board.name}</div>)
        }
        return boardsMarkup
    }

    function handleBoardClick(event) {
        let boardId = event.currentTarget.id
        props.onBoardClick(boardId)
    }

    function openBoardForm() {
        var modal = document.querySelector("#board-form");
        modal.style.display = "block";
    }

    function handleSave(board) {
        board.id = Data.getUniqueId()
        Data.insertBoard(board)
        setBoards(Data.loadBoards())
    }

    return (
        <>
            <div className="boards">
                <div title="New Board" className="new-board-btn" onClick={() => openBoardForm()}>New</div>
                {getBoards()}
            </div>
            <BoardForm onSave={(board) => handleSave(board)}/>
        </>

    )
}