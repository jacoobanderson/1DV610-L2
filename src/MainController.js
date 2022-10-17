import { InterfaceCreator } from "@jacoobanderson/interface-creator"
import { ToDoList } from "./ToDoList.js"
import prompt from "prompt-sync"
import { ToDoItem } from "./ToDoItem.js"

export class MainController {
  #ui
  #toDoLists

  constructor() {
    this.#ui = new InterfaceCreator()
    this.#toDoLists = []
  }

  /**
   * Prompts a user.
   *
   * @returns {string} Returns the input.
   */
  #promptUser() {
    const readInput = prompt()
    return readInput()
  }

  #createWelcomeMessage() {
    this.#ui.createPrompt(
      "Welcome, what is your name?",
      (user) => console.log("Hello " + user),
      "blue"
    )
  }

  #getMainMenuOptions() {
    const options = {
      1: "Create a TODO list",
      2: "View your TODO lists",
    }
    return options
  }

  #getMainMenuFunctionality() {
    const functionality = {
      1: () => this.#addNewTodoList(),
      2: () => this.#createToDoListSubMenu(),
    }

    return functionality
  }

  #printNameOfListQuestion() {
    console.log("What do you want to name your todo list?")
  }

  #printToDoListViewInstructions() {
    console.log("Choose a list that you wish to view or update: \n")
  }

  #getToDoListsView() {
    const view = {}
    for (let i = 0; i < this.#toDoLists.length; i++) {
      const toDoList = this.#toDoLists[i]
      view[i + 1] = toDoList.getName()
    }
    return view
  }

  #getToDoListsFunctionality() {
    const functionality = {}
    for (let i = 0; i < this.#toDoLists.length; i++) {
      const toDoList = this.#toDoLists[i]
      functionality[i + 1] = () => this.#createToDoItemMenu(toDoList)
    }
    return functionality
  }

  #printToDoItem(toDoItem) {
    const isDoneOrNot = toDoItem.getIsDone() ? "Done" : "Not done"
    console.log(
      toDoItem.getDescription() +
        " (" +
        toDoItem.getDeadline() +
        "): " +
        isDoneOrNot
    )
  }

  #createToDoItemMenu(toDoList) {
    console.log("Your current TODOs: \n")
    const toDoItems = toDoList.getItems()

    for (let i = 0; i < toDoItems.length; i++) {
      this.#printToDoItem(toDoItems[i])
    }

    const itemView = this.#getItemView()
    const itemFunctionality = this.#getItemFunctionality(toDoList)

    this.#ui.createSubMenu(itemView, itemFunctionality)
  }

  #getItemFunctionality(toDoList) {
    const toDoItems = toDoList.getItems()
    const itemFunctionality = {
      1: () => this.#createNewItem(toDoList),
      2: () => this.#createEditItemSubMenu(toDoItems),
      3: () => console.log("test"),
    }
    return itemFunctionality
  }

  #printItemDescriptionQuestion() {
    console.log("What is the description of the TODO item?")
    const description = this.#promptUser()
    return description
  }

  #printItemDeadlineQuestion() {
    console.log("When is the deadline for this TODO item?")
    const deadline = this.#promptUser()
    return deadline
  }

  #createNewItem(toDoList) {
    const description = this.#printItemDescriptionQuestion()
    const deadline = this.#printItemDeadlineQuestion()
    const isDone = false
    toDoList.createToDoItem(description, deadline, isDone)
    this.#returnToMainMenu()
  }

  #getItemView() {
    const itemView = {
      1: "Create a new TODO item",
      2: "Edit a TODO item",
      3: "Remove a TODO item",
    }
    return itemView
  }

  #getEditItemView() {
    const editView = {
      1: "Change description",
      2: "Change deadline",
      3: "Mark as done",
    }
    return editView
  }

  #selectItemView() {
    console.log("Which item do you wish to select?")
    return this.#promptUser()
  }

  #selectItem(toDoList) {
    const selectedItemNumber = this.#selectItemView()
    const selectedItem = toDoList[selectedItemNumber - 1]
    return selectedItem
  }

  #getEditItemFunctionality(toDoItem) {
    const editFunctionality = {
      1: () => this.#changeItemDescription(toDoItem),
      2: () => this.#changeItemDeadline(toDoItem),
      3: () => this.#markItemAsDone(toDoItem),
    }
    return editFunctionality
  }

  #createEditItemSubMenu(toDoList) {
    const selectedItem = this.#selectItem(toDoList)
    const editView = this.#getEditItemView()
    const editFunctionality = this.#getEditItemFunctionality(selectedItem)

    this.#ui.createSubMenu(editView, editFunctionality)
  }

  #printChangeItemDescriptionQuestion() {
    console.log("What do you wish to change the description to?")
    const input = this.#promptUser()
    return input
  }

  #changeItemDescription(toDoItem) {
    const newDescription = this.#printChangeItemDescriptionQuestion()
    toDoItem.setDescription(newDescription)
    this.#returnToMainMenu()
  }

  #changeItemDeadline(toDoItem) {
    const newDeadline = this.#printChangeItemDeadlineQuestion()
    toDoItem.setDeadline(newDeadline)
    this.#returnToMainMenu()
  }

  #markItemAsDone(toDoItem) {
    toDoItem.setIsDone(true)
    this.#returnToMainMenu()
  }

  #printChangeItemDeadlineQuestion() {
    console.log("What do you wish to change the deadline to?")
    const input = this.#promptUser()
    return input
  }

  #promptUserForListName() {
    this.#printNameOfListQuestion()
    const toDoListName = this.#promptUser()
    return toDoListName
  }

  #createToDoList(listName) {
    const newTodoList = new ToDoList(listName)
    this.#toDoLists.push(newTodoList)
  }

  #addNewTodoList() {
    const listName = this.#promptUserForListName()
    this.#createToDoList(listName)
    this.#returnToMainMenu()
  }

  #createMainMenu() {
    const mainMenuOptions = this.#getMainMenuOptions()
    const mainMenuFunctionality = this.#getMainMenuFunctionality()
    this.#ui.setMainMenu(mainMenuOptions)
    this.#ui.assignMainMenuFunctionality(mainMenuFunctionality)
  }

  #createToDoListSubMenu() {
    const subMenuView = this.#getToDoListsView()
    const subMenuFunctionality = this.#getToDoListsFunctionality()
    this.#printToDoListViewInstructions()
    this.#ui.createSubMenu(subMenuView, subMenuFunctionality)
  }

  #returnToMainMenu() {
    this.#ui.start()
  }

  start() {
    this.#createWelcomeMessage()
    this.#createMainMenu()
    this.#ui.start()
  }
}
