/*
    Data class containing utilty methods for handling data
*/
export default class Data {
    static loadData() {
        let data = window.localStorage.getItem('appData')
        //if data not present setup empty object
        if(!data) 
            data = {todo: [], inprogress: [], review: [], done: []}
        if(typeof(data) === 'string') data = JSON.parse(data)
        return data
    }

    static insertTask(task) {
        let data = Data.loadData()
        data[`${task.status}`].push(task)
        Data.setLocalStorage(data)
    }

    static setLocalStorage(data) {
        window.localStorage.setItem('appData', JSON.stringify(data, null, 2))
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
            Data.setLocalStorage(data)
        }
    }

    static removeTask(taskId) {
        let data = Data.loadData()
        let sectionsToSearch = ['todo', 'inprogress', 'review', 'done']
        sectionsToSearch.every(section => {
            return Data.removeTaskFrom(data, taskId, section)
        })
        Data.setLocalStorage(data) //commit changes
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