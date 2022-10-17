import prompt from "prompt-sync"

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

  getMainMenuOptions() {
    const options = {
      1: "Create a TODO list",
      2: "View your TODO lists",
    }
    return options
  }

  getItemView() {
    const itemView = {
      1: "Create a new TODO item",
      2: "Edit a TODO item",
      3: "Remove a TODO item",
    }
    return itemView
  }

  getEditItemView() {
    const editView = {
      1: "Change description",
      2: "Change deadline",
      3: "Mark as done",
      4: "Advance a TODO item progression by 25%"
    }
    return editView
  }

  selectItemView() {
    console.log("Which item do you wish to select?")
    return this.#promptUser()
  }

  printNameOfListQuestion() {
    console.log("What do you want to name your todo list?")
  }

  printToDoListViewInstructions() {
    console.log("Choose a list that you wish to view or update: \n")
  }

  printCurrentToDosMessage() {
    console.log("Your current TODOs: \n")
  }

  printRemoveItemQuestion() {
    console.log("Which item do you wish to remove?")
    const input = this.#promptUser()
    return input
  }

  printItemDescriptionQuestion() {
    console.log("What is the description of the TODO item?")
    const description = this.#promptUser()
    return description
  }

  printItemDeadlineQuestion() {
    console.log("When is the deadline for this TODO item?")
    const deadline = this.#promptUser()
    return deadline
  }

  printChangeItemDescriptionQuestion() {
    console.log("What do you wish to change the description to?")
    const input = this.#promptUser()
    return input
  }

  printChangeItemDeadlineQuestion() {
    console.log("What do you wish to change the deadline to?")
    const input = this.#promptUser()
    return input
  }

  printToDoItem(toDoItem) {
    const isDoneOrNot = toDoItem.getIsDone() ? "Done" : "Not done"
    const progression = toDoItem.getIsDone() ? "" : toDoItem.getProgression() + "%"
    const description = toDoItem.getDescription()
    const deadline = toDoItem.getDeadline()

    console.log(description + " (" + deadline + "): " + isDoneOrNot + " " + progression)
  }

  promptUserForListName() {
    this.printNameOfListQuestion()
    const toDoListName = this.#promptUser()
    return toDoListName
  }
}
