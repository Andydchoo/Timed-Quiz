const startBtn = document.getElementById('start');
const questionContainer = document.getElementById('questionsContainer');
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answers');
const nextBtn = document.getElementById('next');
const score = document.getElementById('score');


let shuffle;
let currentQuestion;
let correctCount;

const questions = [
    {
        question: "Who was JavaScript created by?",
        choices: [
            {text: 'Microsoft', correct: false},
            {text: 'Oracle', correct: true},
            {text: 'Apple', correct: true},
            {text: 'Java', correct: true}
        ]
    },
    {
        question: "Is Null and object?",
        choices: [
            {text: 'Yes', correct: true},
            {text: 'No', correct: false}
        ]
    },
    {
        question: "Which is a reserved word in JavaScript?",
        choices: [
            {text: 'undefined', correct: true},
            {text: 'default', correct: false},
            {text: 'throw', correct: false},
            {text: 'javascript', correct: false}
        ]
    },
    {
        question: "Which of these are not coding languages?",
        choices: [
            {text: 'Coffee', correct: true},
            {text: 'Java', correct: false},
            {text: 'Python', correct: false},
            {text: 'Ruby', correct: false}
        ]
    },
]

function startQuiz() {
    startBtn.classList.add('hide');
    shuffle = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    correctCount = 0;
    score.innerHTML = 'Score: ' + correctCount;
    questionContainer.classList.remove('hide');
    nextQuestion();
}

function nextQuestion() {
    resetQuestion();
    showQuestion(shuffle[currentQuestion]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.choices.forEach(choices => {
        const btn = document.createElement('button');
        btn.innerText = choices.text;
        btn.classList.add('btn');
        if (choices.correct) {
            btn.dataset.correct = choices.correct;
        }
        btn.addEventListener('click', selectAnswer);
        answerBtnEl.appendChild(btn);
    })
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct;
    setStatus(document.body, correct);
    Array.from(answerBtnEl.children).forEach(btn => {
        setStatus(btn, btn.dataset.correct);
    })
    if (shuffle.length > currentQuestion + 1) {
        nextBtn.classList.remove('hide');
    } else {
        startBtn.innerText = "Play again";
        startBtn.classList.remove('hide');
    }
}

function setStatus(element, correct) {
    clearStatus(element);
    if (correct) {
        element.classList.add('correct');
        correctCount++;
        score.innerHTML = 'Score: ' + correctCount;
    } else {
        element.classList.add('wrong');
    }
}

function clearStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');

}

function resetQuestion() {
    clearStatus(document.body);
    nextBtn.classList.add('hide');
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild);
    }
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    nextQuestion();
})