export class ToDoItem {
    #description
    #deadline
    #isDone

    constructor(description, deadline, isDone) {
        this.#description = description
        this.#deadline = deadline
        this.#isDone = isDone
    }

    getDescription() {
        return this.#description
    }

    setDescription(newDescription) {
        this.#description = newDescription
    }

    getDeadline() {
        return this.#deadline
    }

}