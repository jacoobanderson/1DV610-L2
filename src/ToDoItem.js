export class ToDoItem {
    #description
    #deadline
    #isDone
    #progression = 0

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

    setDeadline(newDeadline) {
        this.#deadline = newDeadline
    }

    getIsDone() {
        return this.#isDone
    }

    setIsDone(isDone) {
        this.#isDone = isDone
    }

    getProgression() {
        return this.#progression
    }

    advanceProgression() {
        this.#progression += 25
        if (this.#progressionIsDone()) {
            this.#isDone = true
        }
    }

    #progressionIsDone() {
        const maxProgression = 100
        if (this.#progression === maxProgression) {
            return true
        }
        return false
    }
}