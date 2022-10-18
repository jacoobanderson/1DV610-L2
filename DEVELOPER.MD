## L1 MODULE USED
https://github.com/jacoobanderson/1DV610-L1

## Vision

This application is a tool which can help people keep track of their tasks and allow them to structure their work. The users can create different lists of related things to do as well as create, remove and edit tasks in these lists. There are two parts of this application that are supposed to encourage the user to do their tasks:

1. The progression system which allows the user to seperate the task into smaller pieces and by doing so getting a sense of accomplishment each time they advance the progression. When the progression is at 100% the task is automatically marked as done.

2. The randomizing task system allows the user to get a random task to do which helps the user deciding what to actually do and by doing so making it easier to start.

## Description of code
The code consists of two classes which controls the inner functionality of the core purpose of the application, these are the ToDoItem and ToDoList. 

The ToDoItem handles the functionality of each task, getters and setters for attributes as well as methods handling the progression and marking the task as done. 

The ToDoList handles the lists of tasks and has an array of ToDoItems and handles not only naming the list but also creating, removing, finding and randomizing the ToDoItems of the specific list.

The ToDoView handles all printing and basically the view as well as input in the application while the MainController has the responsibility of connecting the view with the core functionality. The MainController also handles the set up and functionality of the module InterfaceCreator. 

The application has several parts which can be improved such as error handling in a better and more effective way. The functionality can be extended and the application can allow for more things that aligns with the vision of the app, simplifying tasks, deadlines etc. New functionality and more complex tools could be implemented that is related to the subject.

## Requirements

F1. The user should be able to create a TODO list. </br>
F2. The list should contain what to do and the deadline. </br>
F3. The user should be able to create, remove and update the TODO items. </br>
F4. The user should be able to mark the TODO as finished. </br>
F5. The user should be able to advance the progression of the task. </br>
F6. If the task progression is 100% the task should be set to done. </br>
F7. The user should be able to get a random task suggestion. </br>
F8. The user should be able to keep randomizing tasks. </br>
F9. The user should be able to exit the program. </br>
F10. The user should be able to return to the main menu. </br>
F11. When the user has marked a task as done, the progression should be removed.

### Test cases
​
| Vad testas      | input | output | utfall PASS/FAIL |
| --------- | --------- | ------ | ------- |
| **TC1** F1. Create a TODO list         |  1. Run npm start in the terminal.</br>  2. Type the name Jacob and press enter </br> 3. Enter the number 1 to create a list. </br> 4. Enter the name TestList </br> 5. Enter the number 2 to view the list.    | The list should be shown as 1. TestList    |    PASS     |
| **TC2**  F2. Create a TODO item        |    1. TC1 </br> 2. Select the list by entering the number 1 (1. TestList) </br> 3. Enter the number 1 to create an item. </br> 4. Enter the description "Test task" and the deadline "2022-10-18". </br> 5. View the TestList    |   "Test task (2022-10-18) Not done 0%" should appear  |    PASS     |
|  **TC3** F3. Remove a TODO item         |   1. TC2 </br> 2. Enter the number 3 to remove an item.</br> 3. Enter the number 1 to select the first (and only) item to remove </br> 4. View TestList      |  The item should no longer be in the list.   |    PASS     |
| **TC4** F3. Update a TODO item's information   |1. TC2 </br> 2. Enter 2 to edit a TODO item </br> 3. Select the item by entering the number 1. </br> 4. Enter the number 1 to change the description </br> 5. Enter the description "Edited TODO task" </br> 6. View TestList  | The description of the task should now be "Edited TODO task"   |    PASS     |
| **TC4.1** F3. Update a TODO item's information   |1. TC2 </br> 2. Enter 2 to edit a TODO item </br> 3. Select the item by entering the number 1. </br> 4. Enter the number 1 to change the description </br> 5. Enter the description "Edited TODO task" </br> 6. View TestList  | The description of the task should now be "Edited TODO task"   |    PASS     |
| **TC4.2** F3. Change a TODO item's deadline  |1. TC2 </br> 2. Enter 2 to edit a TODO item </br> 3. Select the item by entering the number 1. </br> 4. Enter the number 2 to change the deadline </br> 5. Enter the deadline "2022-12-12" </br> 6. View TestList  | The deadline of the task should now be "2022-12-12"   |    PASS     |
| **TC4.3** F4. Mark item as done   |1. TC2 </br> 2. Enter 2 to edit a TODO item </br> 3. Select the item by entering the number 1. </br> 4. Enter the number 3 to mark the task as done </br> 5. View TestList  | The task should now say "Done" instead of "Not done"   |    PASS     |
| **TC4.4** F5. Advance the progession of a TODO item.   |1. TC2 </br> 2. Enter 2 to edit a TODO item </br> 3. Select the item by entering the number 1. </br> 4. Enter the number 4 advance the progression </br> 5. View TestList  | The task should now have a "25%" progression instead of "0%".   |    PASS     |
|  **TC5** F6. If the progression of a TODO item is 100% it should automatically become a done task.         |  1. Repeat TC4.4 four times </br> 2. View TestList  |   The TODO item should now be marked as "Done"    |   PASS      |
|  **TC6**  F7. F8. The user should be able to randomize a task   |  1. Repeat TC2 three times</br> 2. View TestList</br> 3. Enter the number 4 </br> 4. Enter "yes" to keep randomizing 5 times</br>  |  Each time the item shown should be random.  |   PASS      |
|  **TC7** F9. The user should be able to exit the program     |  1. Enter npm start in the terminal</br> 2. Type the name "Jacob" and press enter</br> 3. Enter "q" to exit the application  |    The application should now have exited  |    PASS     |
|  **TC8**  F10. Return to main menu   |  1. Enter npm start in the terminal</br> 2. Type the name "Jacob" and press enter</br> 3. Enter the number 2 </br> 4. Enter "0"  | The main menu should now be shown |    PASS     |
|  **TC9**  F11. When the task is done, the progression should not be shown   | 1. TC4.4 2. View TestList | The percentage should not be seen, only "Done" after the task description.  |    PASS     |
