# QuizMeister

### [Click to view live page](https://pchandler858.github.io/QuizMeister/)

## How to Use the App

1.  Click the "Start" button to begin the quiz.
2.  You will have 75 seconds to answer 15 multiple-choice questions.
3.  Select an answer by clicking on one of the provided choices.
4.  After selecting an answer, click the "Next" button to proceed to the next question.
5.  If you answer a question incorrectly, 10 seconds will be deducted from your remaining time.
6.  The quiz will end after you have answered all 15 questions or the timer runs out.
7.  Once the quiz is completed, your score will be displayed.
8.  Click the "Try Again?" button to start the quiz over.

## Code Description

The app is built using JavaScript, and it has the following functions:

- `startGame()` - This function starts the quiz and sets up the game by setting the initial score, time limit, selecting 15 random questions, and calling the `setNextQuestion()` function.
- `setNextQuestion()` - This function displays the next question in the quiz by resetting the state, and calling the `showQuestion()` function with the next question.
- `showQuestion(question)` - This function displays the current question and its answer choices by creating buttons with the answer choices and adding event listeners to them.
- `resetState()` - This function resets the state of the quiz by clearing any status classes, hiding the score container, and removing all answer buttons.
- `selectAnswer(e)` - This function checks if the selected answer is correct, updates the score or reduces time, sets the status class of the selected answer button and disables all other buttons. It also displays the "Next" button to proceed to the next question or displays a message and calls the `endGame()` function if it is the last question or the timer has run out.
- `setStatusClass(element, correct)` - This function sets the status class of an element depending on whether the answer is correct or not.
- `clearStatusClass(element)` - This function removes any existing status class from an element.
- `endGame()` - This function stops the timer, stores the score in local storage, and navigates to the score screen.
- `updateTimer()` - This function updates the timer and checks if the timer has run out. If it has run out, it calls the `endGame()` function.
- `stopTimer()` - This function stops the timer by clearing the intervalId.

## Technologies Used

- HTML
- CSS
- JavaScript

## License

This project is licensed under the MIT License.

## Demonstration

![screen-gif](/assets/demo.gif)
