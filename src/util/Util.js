export default class Util {

    static sectionIdVsLabel = {
        "todo" : "Todo",
        "inprogress" : "In Progress",
        "review" : "Review",
        "done" : "Done",
    }

    static isSame(a, b) {
        return a.toString() === b.toString()
    }

}