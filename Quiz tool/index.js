//creating functions for quiz-score,list of quest.,and question index (eg.2 of 9 questions)
function Quiz(questions){
    this.score = 0;
    this.questions = questions
    this.questionIndex =0
}
//each  question will have question,options,correct answer
function Question(text, options, answer){
 this.text= text;
 this.options= options
 this.answer= answer
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex]
}

Quiz.prototype.checkOptionWithAnswer = function(ans){
    if(this.getQuestionByIndex().answer == ans){
       this.score++ 
    }
    this.questionIndex++
}

Quiz.prototype.isEnded =function(){
    return this.questionIndex== this.questions.length
}
// creating an array to store all quiz questions
let questions = [
  new Question("What is the correct way to declare a JavaScript variable?",
  ["var variableName;", "let variableName;", "const variableName;", "variable variableName;"],
  "let variableName;"),
  new Question("Which built-in method reverses the order of the elements of an array?",
  ["reverse()", "sort()", "push()", "pop()"],
  "reverse()"),
  new Question("What does 'DOM' stands for in JavaScript?",
  ["Document Object Model", "Data Object Model", "Dynamic Object Model", "Document Oriented Model"],
  "Document Object Model"),
  new Question("What is the result of the expression '2 + '2' in JavaScript?",
  ["4", "22", "Error", "NaN"],
  "22"),
  new Question("Which of the following is NOT a JavaScript data type?",
  ["string", "boolean", "object", "float"],
  "float")
];
let quiz= new Quiz(questions)

function displayQuestions(){
    if(quiz.isEnded()){
    showScores()
} else {
    let questionElem = document.getElementById("question")
    questionElem.innerText= quiz.getQuestionByIndex().text
    
    let choices= quiz.getQuestionByIndex().options;
    for (let i=0; i < choices.length; i++){
        let elem = document.getElementById("choice"+i)
        elem.innerText = choices[i];
        handleClickObBtn("btn"+i,choices[i])
    }

    showProgress()
}
function showProgress(){
    let curr = quiz.questionIndex+1
    let elem= document.getElementById("progress")
    elem.innerText = `Question ${curr} of ${quiz.questions.length}`
}

}
function handleClickObBtn(id, choice){
    let buttonElem =document.getElementById(id)
    buttonElem.onclick=function(){
      quiz.checkOptionWithAnswer(choice)  
      displayQuestions()
    }
}
function showScores(){
    let result = `<h1>Result</h1><h2 id="score">Thank you! Here are your results: <br>Score: ${quiz.score}/${questions.length} <br> Marks percentage: ${(quiz.score/questions.length)*100}% </h2>`
    let quizElem = document.getElementById("quiz")
    quizElem.innerHTML= result
}

displayQuestions();