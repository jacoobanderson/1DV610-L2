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
    toDoList.createToDoItem('A2 creation2')
    toDoList.createToDoItem('A2 creation3')
    toDoList.createToDoItem('A2 creation4')
    toDoList.createToDoItem('A2 creation5')

    for (let i = 0; i < toDoItems.length; i++) {
        this.#printToDoItem(toDoItems[i])
    }

    const itemView = {
        1: '\nCreate a new TODO item',
        2: 'Edit a TODO item',
        3: 'Remove a TODO item'
    }

    const itemFunctionality = {
        1: () => console.log('test'),
        2: () => console.log('test'),
        3: () => console.log('test')
    }
    
    this.#ui.createSubMenu(itemView, itemFunctionality)
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
