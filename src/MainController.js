import { InterfaceCreator } from "@jacoobanderson/interface-creator"
import { ToDoList } from "./ToDoList.js"
import prompt from "prompt-sync"

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
        2: () => this.#printToDoLists()
    }

    return functionality
  }

  #printNameOfListQuestion() {
    console.log("What do you want to name your todo list?")
  }

  #printToDoLists() {
    for (let i = 0; i < this.#toDoLists.length; i++) {
        const toDoList = this.#toDoLists[i]
        console.log((i + 1) + '. ' + toDoList.getName())
    }
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

  #returnToMainMenu() {
    this.#ui.start()
  }

  start() {
    this.#createWelcomeMessage()
    this.#createMainMenu()
    this.#ui.start()
  }
}
