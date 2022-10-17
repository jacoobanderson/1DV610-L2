import { ToDoItem } from "./ToDoItem.js"

export class ToDoList {
    #toDoItems
    #name

    constructor(name) {
        this.#toDoItems = []
        this.#name = name
    }

    getItems() {
        return this.#toDoItems
    }

    getName() {
        return this.#name
    }

    setName(newName) {
        this.#name = newName
    }

    createToDoItem(description, deadline, isDone) {
        const item = new ToDoItem(description, deadline, isDone)
        this.#toDoItems.push(item)
    }

    removeToDoItem(index) {
        this.#toDoItems.splice(index, 1)
    }

    findItemByIndex(index) {
        return this.#toDoItems[index]
    }

    updateItemDescription(item) {
        item.setDescription()
    }

}