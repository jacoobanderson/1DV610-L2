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
        1: () => this.#addNewTodoList()
    }

    return functionality
  }

  #printNameOfListQuestion() {
    console.log("What do you want to name your todo list?")
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
  }

  #createMainMenu() {
    const mainMenuOptions = this.#getMainMenuOptions()
    const mainMenuFunctionality = this.#getMainMenuFunctionality()
    this.#ui.setMainMenu(mainMenuOptions)
    this.#ui.assignMainMenuFunctionality(mainMenuFunctionality)
  }

  start() {
    this.#createWelcomeMessage()
    this.#ui.start()
  }
}
