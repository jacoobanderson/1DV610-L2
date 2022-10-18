import prompt from "prompt-sync"
import { ToDoItem } from "./ToDoItem.js"

export class ToDoView {
  /**
   * Prompts a user.
   *
   * @returns {string} Returns the input.
   */
  #promptUser() {
    const readInput = prompt()
    return readInput()
  }

  /**
   * Gets the main menu options.
   *
   * @returns The main menu options.
   */
  getMainMenuOptions() {
    const options = {
      1: "Create a TODO list",
      2: "View your TODO lists",
    }
    return options
  }

  /**
   * Gets the item menu view.
   *
   * @returns The item menu view.
   */
  getItemView() {
    const itemView = {
      1: "Create a new TODO item",
      2: "Edit a TODO item",
      3: "Remove a TODO item",
      4: "Get a random task to do!"
    }
    return itemView
  }

  /**
   * Gets the edit item view.
   *
   * @returns The edit item view.
   */
  getEditItemView() {
    const editView = {
      1: "Change description",
      2: "Change deadline",
      3: "Mark as done",
      4: "Advance a TODO item progression by 25%"
    }
    return editView
  }

  /**
   * Prints the select item view.
   *
   * @returns The user input.
   */
  selectItemView() {
    console.log("Which item do you wish to select?")
    return this.#promptUser()
  }

  /**
   * Prints the name of list question.
   */
  printNameOfListQuestion() {
    console.log("What do you want to name your todo list?")
  }

  /**
   * Prints the todo list instructions.
   */
  printToDoListViewInstructions() {
    console.log("Choose a list that you wish to view or update: \n")
  }

  /**
   * Prints the current todo list message.
   */
  printCurrentToDosMessage() {
    console.log("Your current TODOs: \n")
  }

  /**
   * Prints the remove an item question.
   *
   * @returns The user input.
   */
  printRemoveItemQuestion() {
    console.log("Which item do you wish to remove?")
    const input = this.#promptUser()
    return input
  }

  /**
   * Prints the item description question.
   *
   * @returns The user input.
   */
  printItemDescriptionQuestion() {
    console.log("What is the description of the TODO item?")
    const description = this.#promptUser()
    return description
  }

  /**
   * Prints the item deadline question.
   *
   * @returns The user input.
   */
  printItemDeadlineQuestion() {
    console.log("When is the deadline for this TODO item?")
    const deadline = this.#promptUser()
    return deadline
  }

  /**
   * Prints the change item description question.
   *
   * @returns The user input.
   */
  printChangeItemDescriptionQuestion() {
    console.log("What do you wish to change the description to?")
    const input = this.#promptUser()
    return input
  }

  /**
   * Prints the change item deadline question.
   *
   * @returns The user input.
   */
  printChangeItemDeadlineQuestion() {
    console.log("What do you wish to change the deadline to?")
    const input = this.#promptUser()
    return input
  }

  /**
   * Prints a ToDo item's information.
   *
   * @param {ToDoItem} toDoItem The TodoItem
   */
  printToDoItem(toDoItem) {
    const isDoneOrNot = toDoItem.getIsDone() ? "Done" : "Not done"
    const progression = toDoItem.getIsDone() ? "" : toDoItem.getProgression() + "%"
    const description = toDoItem.getDescription()
    const deadline = toDoItem.getDeadline()

    console.log(description + " (" + deadline + "): " + isDoneOrNot + " " + progression)
  }

  /**
   * Prints the random todo item question.
   *
   * @returns If the user has answered yes or no, true/false.
   */
  printRandomItemQuestion() {
    console.log('Do you wish to randomize again? (yes/no)')
    const input = this.#promptUser().toLowerCase()

    if (input === 'yes') {
        return true
    }
    return false
  }

  /**
   * Prints the error of when a random item cannot be retrieved because it doesnt exist.
   */
  printRandomItemError() {
    console.log('There are no items available in this list.')
  }

  /**
   * Prompts the user for a list name.
   *
   * @returns The list name.
   */
  promptUserForListName() {
    this.printNameOfListQuestion()
    const toDoListName = this.#promptUser()
    return toDoListName
  }
}
