/**
 * The class that represents the ToDoItem.
 */
export class ToDoItem {
    #description
    #deadline
    #isDone
    #progression = 0

    /**
     * The constructor.
     *
     * @param {string} description The description of the item.
     * @param {string} deadline The deadline of the item.
     * @param {boolean} isDone If the item is done or not.
     */
    constructor(description, deadline, isDone) {
        this.#description = description
        this.#deadline = deadline
        this.#isDone = isDone
    }

    /**
     * Gets the description.
     *
     * @returns The description.
     */
    getDescription() {
        return this.#description
    }

    /**
     * Sets the description.
     *
     * @param {string} newDescription The new description.
     */
    setDescription(newDescription) {
        this.#description = newDescription
    }

    /**
     * Gets the deadline.
     *
     * @returns The deadline.
     */
    getDeadline() {
        return this.#deadline
    }

    /**
     * Sets the deadline.
     *
     * @param {string} newDeadline The new deadline.
     */
    setDeadline(newDeadline) {
        this.#deadline = newDeadline
    }

    /**
     * Gets the is done boolean.
     *
     * @returns If it is done or not.
     */
    getIsDone() {
        return this.#isDone
    }

    /**
     * Sets the is done boolean.
     *
     * @param {boolean} isDone If it is done or not.
     */
    setIsDone(isDone) {
        this.#isDone = isDone
    }

    /**
     * Gets the progression of the item.
     *
     * @returns The progession.
     */
    getProgression() {
        return this.#progression
    }

    /**
     * Advances the progression of this item.
     */
    advanceProgression() {
        this.#progression += 25
        if (this.#progressionIsDone()) {
            this.#isDone = true
        }
    }

    /**
     * Checks if the progression is 100%, marks the item as done if so.
     *
     * @returns If the progression is done or not.
     */
    #progressionIsDone() {
        const maxProgression = 100
        if (this.#progression === maxProgression) {
            return true
        }
        return false
    }
}