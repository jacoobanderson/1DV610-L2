import { ToDoItem } from "./ToDoItem.js"

/**
 * The class that represents the ToDoList.
 */
export class ToDoList {
    #toDoItems
    #name

    /**
     * The constructor
     * @param {string} name The name of the list.
     */
    constructor(name) {
        this.#toDoItems = []
        this.#name = name
    }

    /**
     * Gets the items.
     *
     * @returns The items.
     */
    getItems() {
        return this.#toDoItems
    }

    /**
     * Gets the name of the list.
     *
     * @returns The name of the list.
     */
    getName() {
        return this.#name
    }

    /**
     * Sets the name of the list.
     *
     * @param {string} newName The new name of the list.
     */
    setName(newName) {
        this.#name = newName
    }

    /**
     * Creates a ToDo item.
     *
     * @param {string} description The description of the item.
     * @param {string} deadline The deadline of the item.
     * @param {boolean} isDone If it is done or not.
     */
    createToDoItem(description, deadline, isDone) {
        const item = new ToDoItem(description, deadline, isDone)
        this.#toDoItems.push(item)
    }

    /**
     * Removes an item from the list.
     *
     * @param {Number} index The index of the item.
     */
    removeToDoItem(index) {
        this.#toDoItems.splice(index, 1)
    }

    /**
     * Finds and returns a ToDo item.
     *
     * @param {Number} index The index of the item in the list.
     * @returns The item of that index.
     */
    findItemByIndex(index) {
        return this.#toDoItems[index]
    }

    /**
     * Updates the description of an item.
     *
     * @param {ToDoItem} item The item of which the description should be updated.
     */
    updateItemDescription(item) {
        item.setDescription()
    }

    /**
     * Gets a random number between 0 and the length of the list.
     *
     * @returns The random number.
     */
    #getRandomItemListIndex() {
        const lengthOfList = this.#toDoItems.length
        return Math.floor(Math.random() * lengthOfList)
    }

    /**
     * Gets a random task.
     *
     * @returns The random task.
     */
    getRandomTask() {
        const randomIndex = this.#getRandomItemListIndex()
        return this.#toDoItems[randomIndex]
    }
}