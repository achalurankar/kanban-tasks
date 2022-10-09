/*
    Data class containing utilty methods for handling data
*/
export default class Data {

    static TASKS = 'tasks'
    static BOARDS = 'boards'

    static loadBoards() {
        let boards = window.localStorage.getItem(Data.BOARDS)
        //if data not present setup empty object
        if(!boards) {
            boards = []
        }
        if(typeof(boards) === 'string') boards = JSON.parse(boards) 
        return boards
    }

    static loadData(boardId) {
        let data = window.localStorage.getItem(Data.TASKS)
        //if data not present setup empty object
        let filteredData = {todo: [], inprogress: [], review: [], done: []}
        if(!data) 
            data = filteredData
        else {
            data = JSON.parse(data)
            if(boardId) {
                for(let key of Object.keys(data)) {
                    let tasks = []
                    for(let task of data[key]) {
                        if(task.boardId.toString() === boardId.toString()) {
                            tasks.push(task)
                        }
                    }    
                    filteredData[key] = tasks
                }
                data = filteredData
            }
        }
        return data
    }

    static insertTask(task) {
        let data = Data.loadData()
        data[`${task.status}`].push(task)
        Data.setTasks(data)
    }

    static insertBoard(board) {
        let boards = Data.loadBoards()
        boards.push(board)
        window.localStorage.setItem(Data.BOARDS, JSON.stringify(boards, null, 2))
    }

    static setTasks(data) {
        window.localStorage.setItem(Data.TASKS, JSON.stringify(data, null, 2))
    }
    
    static replaceTask(taskIdToReplace, FromSectionId, toSectionId) {
        let data = Data.loadData()
        //get item to push from old section
        let taskToReplace
        let newFromList = []
        for(let task of data[`${FromSectionId}`]) {
            if(task.id.toString() === taskIdToReplace) {
                taskToReplace = task
            } else {
                newFromList.push(task)
            }
        }
        if(taskToReplace) {
            data[`${toSectionId}`].push(taskToReplace)
            data[`${FromSectionId}`] = newFromList
            Data.setTasks(data)
        }
    }

    static removeTask(taskId) {
        let data = Data.loadData()
        let sectionsToSearch = ['todo', 'inprogress', 'review', 'done']
        sectionsToSearch.every(section => {
            return Data.removeTaskFrom(data, taskId, section)
        })
        Data.setTasks(data) //commit changes
    }

    static removeTaskFrom(data, taskId, section) {
        let newList = []
        let elementFound = false
        for(let item of data[`${section}`]) {
            if(taskId !== item.id.toString()) {
                newList.push(item)
            } else {
                elementFound = true
            }
        }
        if(elementFound) {
            data[`${section}`] = newList
            return false // false to stop iteration as element is found and deletion is done
        }
        return true // to continue iteration to check next section
    }
    
    static getUniqueId() {
        return new Date().getTime()
    }
}