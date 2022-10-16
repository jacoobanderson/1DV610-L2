import { InterfaceCreator } from "@jacoobanderson/interface-creator"

export class MainController {
  #interfaceCreator

  constructor() {
    this.#interfaceCreator = new InterfaceCreator()
  }

  #createWelcomeMessage() {
    this.#interfaceCreator.createPrompt("Welcome, what is your name?", (user) =>
      console.log("Hello " + user), 'blue'
    )
  }

  start() {
    this.#createWelcomeMessage()
    this.#interfaceCreator.start()
  }
}
