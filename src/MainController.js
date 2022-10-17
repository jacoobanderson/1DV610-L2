import { InterfaceCreator } from "@jacoobanderson/interface-creator"
import { ToDoList } from "./ToDoList.js"
import { ToDoView } from "./ToDoView.js"

export class MainController {
  #ui
  #view
  #toDoLists

  constructor() {
    this.#ui = new InterfaceCreator()
    this.#view = new ToDoView()
    this.#toDoLists = []
  }

  #createWelcomeMessage() {
    this.#ui.createPrompt(
      "Welcome, what is your name?",
      (user) => console.log("Hello " + user),
      "blue"
    )
  }

  #getMainMenuFunctionality() {
    const functionality = {
      1: () => this.#addNewTodoList(),
      2: () => this.#createToDoListSubMenu(),
    }

    return functionality
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

  #createToDoItemMenu(toDoList) {
    this.#view.printCurrentToDosMessage()
    const toDoItems = toDoList.getItems()

    for (let i = 0; i < toDoItems.length; i++) {
      this.#view.printToDoItem(toDoItems[i])
    }

    const itemView = this.#view.getItemView()
    const itemFunctionality = this.#getItemFunctionality(toDoList)

    this.#ui.createSubMenu(itemView, itemFunctionality)
  }

  #getItemFunctionality(toDoList) {
    const toDoItems = toDoList.getItems()
    const itemFunctionality = {
      1: () => this.#createNewItem(toDoList),
      2: () => this.#createEditItemSubMenu(toDoItems),
      3: () => this.#removeItem(toDoList),
    }
    return itemFunctionality
  }

  #removeItem(toDoList) {
    const itemIndex = this.#view.printRemoveItemQuestion() - 1
    toDoList.removeToDoItem(itemIndex)
    this.#returnToMainMenu()
  }

  #createNewItem(toDoList) {
    const description = this.#view.printItemDescriptionQuestion()
    const deadline = this.#view.printItemDeadlineQuestion()
    const isDone = false
    toDoList.createToDoItem(description, deadline, isDone)
    this.#returnToMainMenu()
  }

  #selectItem(toDoList) {
    const selectedItemNumber = this.#view.selectItemView()
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
    const editView = this.#view.getEditItemView()
    const editFunctionality = this.#getEditItemFunctionality(selectedItem)

    this.#ui.createSubMenu(editView, editFunctionality)
  }

  #changeItemDescription(toDoItem) {
    const newDescription = this.#view.printChangeItemDescriptionQuestion()
    toDoItem.setDescription(newDescription)
    this.#returnToMainMenu()
  }

  #changeItemDeadline(toDoItem) {
    const newDeadline = this.#view.printChangeItemDeadlineQuestion()
    toDoItem.setDeadline(newDeadline)
    this.#returnToMainMenu()
  }

  #markItemAsDone(toDoItem) {
    toDoItem.setIsDone(true)
    this.#returnToMainMenu()
  }

  #createToDoList(listName) {
    const newTodoList = new ToDoList(listName)
    this.#toDoLists.push(newTodoList)
  }

  #addNewTodoList() {
    const listName = this.#view.promptUserForListName()
    this.#createToDoList(listName)
    this.#returnToMainMenu()
  }

  #createMainMenu() {
    const mainMenuOptions = this.#view.getMainMenuOptions()
    const mainMenuFunctionality = this.#getMainMenuFunctionality()
    this.#ui.setMainMenu(mainMenuOptions)
    this.#ui.assignMainMenuFunctionality(mainMenuFunctionality)
  }

  #createToDoListSubMenu() {
    const subMenuView = this.#getToDoListsView()
    const subMenuFunctionality = this.#getToDoListsFunctionality()
    this.#view.printToDoListViewInstructions()
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
