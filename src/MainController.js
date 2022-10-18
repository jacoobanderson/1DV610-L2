import { InterfaceCreator } from "@jacoobanderson/interface-creator"
import { ToDoItem } from "./ToDoItem.js"
import { ToDoList } from "./ToDoList.js"
import { ToDoView } from "./ToDoView.js"

/**
 * The main controller.
 */
export class MainController {
  #ui
  #view
  #toDoLists

  /**
   * The constructor.
   */
  constructor() {
    this.#ui = new InterfaceCreator()
    this.#view = new ToDoView()
    this.#toDoLists = []
  }

  /**
   * Creates a initial prompt.
   */
  #createWelcomeMessage() {
    this.#ui.createPrompt(
      "Welcome, what is your name?",
      (user) => console.log("Hello " + user),
      "blue"
    )
  }

  /**
   * Gets the main menu functionality.
   *
   * @returns The functionality object.
   */
  #getMainMenuFunctionality() {
    const functionality = {
      1: () => this.#addNewTodoList(),
      2: () => this.#createToDoListSubMenu(),
    }

    return functionality
  }

  /**
   * Gets the view of all todo lists.
   *
   * @returns The view object.
   */
  #getToDoListsView() {
    const view = {}
    for (let i = 0; i < this.#toDoLists.length; i++) {
      const toDoList = this.#toDoLists[i]
      view[i + 1] = toDoList.getName()
    }
    return view
  }

  /**
   * Gets the functioonality of all todo lists.
   *
   * @returns The functionality.
   */
  #getToDoListsFunctionality() {
    const functionality = {}
    for (let i = 0; i < this.#toDoLists.length; i++) {
      const toDoList = this.#toDoLists[i]
      functionality[i + 1] = () => this.#createToDoItemMenu(toDoList)
    }
    return functionality
  }

  /**
   * Creates the todo item sub menu.
   *
   * @param {ToDoList} toDoList The list
   */
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

  /**
   * Gets the functionality of the item sub menu.
   *
   * @param {ToDoList} toDoList The list.
   * @returns The functionality object.
   */
  #getItemFunctionality(toDoList) {
    const toDoItems = toDoList.getItems()
    const itemFunctionality = {
      1: () => this.#createNewItem(toDoList),
      2: () => this.#createEditItemSubMenu(toDoItems),
      3: () => this.#removeItem(toDoList),
      4: () => this.#getRandomTask(toDoList)
    }
    return itemFunctionality
  }

  /**
   * Gets a random todo item from a list while the user still wants to.
   *
   * @param {ToDoList} toDoList The list.
   */
  #getRandomTask(toDoList) {
    const randomTask = toDoList.getRandomTask()

    if (randomTask) {
        this.#view.printToDoItem(randomTask)

        while (this.#view.printRandomItemQuestion()) {
            const randomTask = toDoList.getRandomTask()
            this.#view.printToDoItem(randomTask)
        }
    } else {
        this.#view.printRandomItemError()
        this.#returnToMainMenu()
    }
  }

  /**
   * Removes an item from a list.
   *
   * @param {ToDoList} toDoList The list.
   */
  #removeItem(toDoList) {
    const itemIndex = this.#view.printRemoveItemQuestion() - 1
    toDoList.removeToDoItem(itemIndex)
    this.#returnToMainMenu()
  }

  /**
   * Creates a new item in a list.
   *
   * @param {ToDoList} toDoList The list.
   */
  #createNewItem(toDoList) {
    const description = this.#view.printItemDescriptionQuestion()
    const deadline = this.#view.printItemDeadlineQuestion()
    const isDone = false
    toDoList.createToDoItem(description, deadline, isDone)
    this.#returnToMainMenu()
  }

  /**
   * Selects a todo item in a list.
   *
   * @param {toDoList} toDoList The list.
   * @returns The selected item.
   */
  #selectItem(toDoList) {
    const selectedItemNumber = this.#view.selectItemView()
    const selectedItem = toDoList[selectedItemNumber - 1]
    return selectedItem
  }

  /**
   * Gets the edit item menu functionality
   *
   * @param {ToDoItem} toDoItem The item.
   * @returns The functionality object.
   */
  #getEditItemFunctionality(toDoItem) {
    const editFunctionality = {
      1: () => this.#changeItemDescription(toDoItem),
      2: () => this.#changeItemDeadline(toDoItem),
      3: () => this.#markItemAsDone(toDoItem),
      4: () => this.#advanceProgression(toDoItem)
    }
    return editFunctionality
  }

  /**
   * Creates the sub menu for editing an item.
   *
   * @param {ToDoList} toDoList The list that has the item.
   */
  #createEditItemSubMenu(toDoList) {
    const selectedItem = this.#selectItem(toDoList)
    const editView = this.#view.getEditItemView()
    const editFunctionality = this.#getEditItemFunctionality(selectedItem)

    this.#ui.createSubMenu(editView, editFunctionality)
  }

  /**
   * Advances the progression of an item.
   *
   * @param {ToDoItem} toDoItem The item.
   */
  #advanceProgression(toDoItem) {
    toDoItem.advanceProgression()
    this.#returnToMainMenu()
  }

  /**
   * Changes the description of an item.
   *
   * @param {ToDoItem} toDoItem The item.
   */
  #changeItemDescription(toDoItem) {
    const newDescription = this.#view.printChangeItemDescriptionQuestion()
    toDoItem.setDescription(newDescription)
    this.#returnToMainMenu()
  }

  /**
   * Changes the item deadline.
   *
   * @param {ToDoItem} toDoItem The todo item.
   */
  #changeItemDeadline(toDoItem) {
    const newDeadline = this.#view.printChangeItemDeadlineQuestion()
    toDoItem.setDeadline(newDeadline)
    this.#returnToMainMenu()
  }

  /**
   * Marks an todo item as done.
   *
   * @param {ToDoItem} toDoItem The todo item to be marked as done.
   */
  #markItemAsDone(toDoItem) {
    toDoItem.setIsDone(true)
    this.#returnToMainMenu()
  }

  /**
   * Creates a todo list.
   *
   * @param {string} listName The name of the list.
   */
  #createToDoList(listName) {
    const newTodoList = new ToDoList(listName)
    this.#toDoLists.push(newTodoList)
  }

  /**
   * Adds a new todo list.
   */
  #addNewTodoList() {
    const listName = this.#view.promptUserForListName()
    this.#createToDoList(listName)
    this.#returnToMainMenu()
  }

  /**
   * Creates the main menu.
   */
  #createMainMenu() {
    const mainMenuOptions = this.#view.getMainMenuOptions()
    const mainMenuFunctionality = this.#getMainMenuFunctionality()
    this.#ui.setMainMenu(mainMenuOptions)
    this.#ui.assignMainMenuFunctionality(mainMenuFunctionality)
  }

  /**
   * Creates a todo list sub menu.
   */
  #createToDoListSubMenu() {
    const subMenuView = this.#getToDoListsView()
    const subMenuFunctionality = this.#getToDoListsFunctionality()
    this.#view.printToDoListViewInstructions()
    this.#ui.createSubMenu(subMenuView, subMenuFunctionality)
  }

  /**
   * Returns to the main menu.
   */
  #returnToMainMenu() {
    this.#ui.start()
  }

  /**
   * Starts the application.
   */
  start() {
    this.#createWelcomeMessage()
    this.#createMainMenu()
    this.#ui.addReturnToMenuOption()
    this.#ui.addExitOption()
    this.#ui.start()
  }
}
