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
        2: () => this.#createToDoListSubMenu()
    }

    return functionality
  }

  #printNameOfListQuestion() {
    console.log("What do you want to name your todo list?")
  }

  #printToDoListViewInstructions() {
    console.log('Choose a list that you wish to view or update: \n')
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
    const isDoneOrNot = toDoItem.getIsDone() ? 'Done' : 'Not done'
    console.log(toDoItem.getDescription() + ' (' + toDoItem.getDeadline() + '): ' + isDoneOrNot)
  }


  #createToDoItemMenu(toDoList) {
    console.log('Your current TODOs: \n')
    const toDoItems = toDoList.getItems()

    for (let i = 0; i < toDoItems.length; i++) {
        this.#printToDoItem(toDoItems[i])
    }

    const itemView = this.#getItemView()
    const itemFunctionality = this.#getItemFunctionality(toDoList)
    
    this.#ui.createSubMenu(itemView, itemFunctionality)
  }

  #getItemFunctionality(toDoList) {
    const itemFunctionality = {
        1: () => this.#createNewItem(toDoList),
        2: () => console.log('test'),
        3: () => console.log('test')
    }
    return itemFunctionality
  }


  #printItemDescriptionQuestion() {
    console.log('What is the description of the TODO item?')
    const description = this.#promptUser()
    return description
  }

  #printItemDeadlineQuestion() {
    console.log('When is the deadline for this TODO item?')
    const deadline = this.#promptUser()
    return deadline
  }

  #createNewItem(toDoList) {
    const description =  this.#printItemDescriptionQuestion()
    const deadline = this.#printItemDeadlineQuestion()
    const isDone = false
    toDoList.createToDoItem(description, deadline, isDone)
    this.#returnToMainMenu()
  }

  #getItemView() {
    const itemView = {
        1: '\nCreate a new TODO item',
        2: 'Edit a TODO item',
        3: 'Remove a TODO item'
    }
    return itemView
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
