import { InterfaceCreator } from "@jacoobanderson/interface-creator"

export class MainController {
  #ui

  constructor() {
    this.#ui = new InterfaceCreator()
  }

  #createWelcomeMessage() {
    this.#ui.createPrompt("Welcome, what is your name?", (user) =>
      console.log("Hello " + user), 'blue'
    )
  }

  #getMainMenuOptions() {
    const options = {
        1: 'Create a TODO list',
        2: 'View your TODO lists',
    }
    return options
  }

  #getMainMenuFunctionality() {
    
  }

  #createMainMenu() {
    this.#ui.setMainMenu()
  }

  start() {
    this.#createWelcomeMessage()
    this.#ui.start()
  }
}
