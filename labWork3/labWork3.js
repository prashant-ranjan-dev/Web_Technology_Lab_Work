const TOTAL_QUESTIONS = 20;
const allQuestions = [
    {
        question: 'HTML: What is the purpose of <!DOCTYPE html>?',
        options: [
            'Defines document type and HTML version',
            'Adds a stylesheet',
            'Creates a new HTML element',
            'Specifies character encoding'
        ],
        answer: 'Defines document type and HTML version'
    },
    {
        question: 'HTML: Which tag creates a hyperlink?',
        options: [
            '<a>',
            '<link>',
            '<nav>',
            '<href>'
        ],
        answer: '<a>'
    },
    {
        question: 'HTML: Which tag is used for a table row?',
        options: [
            '<tr>',
            '<td>',
            '<th>',
            '<table>'
        ],
        answer: '<tr>'
    },
    {
        question: 'HTML: Which attribute sets the source of an image?',
        options: [
            'src',
            'href',
            'alt',
            'title'
        ],
        answer: 'src'
    },
    {
        question: 'CSS: Which selector targets all paragraph elements?',
        options: [
            'p',
            '.paragraph',
            '#paragraph',
            'paragraph'
        ],
        answer: 'p'
    },
    {
        question: 'CSS: Which property changes text color?',
        options: [
            'color',
            'background',
            'font-size',
            'border-color'
        ],
        answer: 'color'
    },
    {
        question: 'CSS: What property controls space outside the element border?',
        options: [
            'margin',
            'padding',
            'border',
            'width'
        ],
        answer: 'margin'
    },
    {
        question: 'CSS: Which property centers inline text inside an element?',
        options: [
            'text-align',
            'align-items',
            'justify-content',
            'vertical-align'
        ],
        answer: 'text-align'
    },
    {
        question: 'CSS: Which property hides an element from display?',
        options: [
            'display: none',
            'visibility: hidden',
            'opacity: 0',
            'overflow: hidden'
        ],
        answer: 'display: none'
    },
    {
        question: 'JavaScript: Which keyword declares a block-scoped variable?',
        options: [
            'let',
            'var',
            'constantly',
            'function'
        ],
        answer: 'let'
    },
    {
        question: 'JavaScript: Which keyword defines a function?',
        options: [
            'function',
            'method',
            'def',
            'func'
        ],
        answer: 'function'
    },
    {
        question: 'JavaScript: How do you select an element by its id?',
        options: [
            'document.getElementById()',
            'document.querySelectorAll()',
            'document.getElementsByClassName()',
            'document.getElementsByTagName()'
        ],
        answer: 'document.getElementById()'
    },
    {
        question: 'JavaScript: Which method attaches an event handler to an element?',
        options: [
            'addEventListener()',
            'attachEvent()',
            'onEvent()',
            'setEvent()'
        ],
        answer: 'addEventListener()'
    },
    {
        question: 'JavaScript: What does === compare?',
        options: [
            'Value and type',
            'Only value',
            'Only type',
            'Reference only'
        ],
        answer: 'Value and type'
    },
    {
        question: 'OOP: Which keyword defines a class in JavaScript?',
        options: [
            'class',
            'struct',
            'object',
            'module'
        ],
        answer: 'class'
    },
    {
        question: 'OOP: Which keyword indicates inheritance in JavaScript classes?',
        options: [
            'extends',
            'inherits',
            'implements',
            'uses'
        ],
        answer: 'extends'
    },
    {
        question: 'OOP: Which method is called when a new class instance is created?',
        options: [
            'constructor',
            'initialize',
            'setup',
            'start'
        ],
        answer: 'constructor'
    },
    {
        question: 'OOP: What does encapsulation mean?',
        options: [
            'Hiding internal object details',
            'Reusing code across classes',
            'Overloading methods',
            'Converting classes to objects'
        ],
        answer: 'Hiding internal object details'
    },
    {
        question: 'OOP: What is polymorphism?',
        options: [
            'Same method name, different behavior',
            'Single inheritance only',
            'Hiding implementation details',
            'Creating new objects from classes'
        ],
        answer: 'Same method name, different behavior'
    },
    {
        question: 'JavaScript: Which array method creates a new array with results of calling a function on every element?',
        options: [
            'map()',
            'filter()',
            'reduce()',
            'forEach()'
        ],
        answer: 'map()'
    },
    {
        question: 'HTML: Which semantic element represents the main content of a page?',
        options: [
            '<main>',
            '<section>',
            '<article>',
            '<aside>'
        ],
        answer: '<main>'
    },
    {
        question: 'CSS: Which unit is relative to the font size of the element?',
        options: [
            'em',
            'px',
            'cm',
            '%'
        ],
        answer: 'em'
    },
    {
        question: 'CSS: Which property makes an element a flex container?',
        options: [
            'display: flex',
            'flex-direction',
            'justify-content',
            'align-items'
        ],
        answer: 'display: flex'
    },
    {
        question: 'HTML: Which input type is used for email addresses?',
        options: [
            'email',
            'text',
            'tel',
            'url'
        ],
        answer: 'email'
    },
    {
        question: 'JavaScript: Which method selects the first element that matches a CSS selector?',
        options: [
            'querySelector()',
            'querySelectorAll()',
            'getElementById()',
            'getElementsByClassName()'
        ],
        answer: 'querySelector()'
    },
    {
        question: 'JavaScript: Which function converts a string to an integer?',
        options: [
            'parseInt()',
            'toString()',
            'Number()',
            'parseFloat()'
        ],
        answer: 'parseInt()'
    },
    {
        question: 'OOP: In a class method, what does the "this" keyword refer to?',
        options: [
            'The current class instance',
            'The parent class',
            'A global variable',
            'A function parameter'
        ],
        answer: 'The current class instance'
    },
    {
        question: 'HTML: Which element represents the largest heading?',
        options: [
            '<h1>',
            '<h2>',
            '<h3>',
            '<header>'
        ],
        answer: '<h1>'
    },
    {
        question: 'CSS: Which property sets the spacing between letters?',
        options: [
            'letter-spacing',
            'word-spacing',
            'line-height',
            'text-indent'
        ],
        answer: 'letter-spacing'
    },
    {
        question: 'JavaScript: Which method creates a new array with elements that pass a test?',
        options: [
            'filter()',
            'map()',
            'reduce()',
            'forEach()'
        ],
        answer: 'filter()'
    },
    {
        question: 'OOP: What does abstraction mean?',
        options: [
            'Showing only relevant details',
            'Creating duplicate objects',
            'Encrypting methods',
            'Preventing inheritance'
        ],
        answer: 'Showing only relevant details'
    },
    {
        question: 'HTML: Which tag defines a list item?',
        options: [
            '<li>',
            '<ul>',
            '<ol>',
            '<list>'
        ],
        answer: '<li>'
    },
    {
        question: 'CSS: Which property controls the space inside an element border?',
        options: [
            'padding',
            'margin',
            'border',
            'width'
        ],
        answer: 'padding'
    },
    {
        question: 'JavaScript: Which method adds a new item to the end of an array?',
        options: [
            'push()',
            'pop()',
            'shift()',
            'unshift()'
        ],
        answer: 'push()'
    }
];

const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const reviewButton = document.getElementById('reviewButton');
const quizCard = document.getElementById('quizCard');
const resultCard = document.getElementById('resultCard');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('scoreText');
const nextButton = document.getElementById('nextButton');
const resultMessage = document.getElementById('resultMessage');
const finalScore = document.getElementById('finalScore');

let selectedQuestions = [];
let currentIndex = 0;
let score = 0;

function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function pickRandomQuestions() {
    const shuffledPool = shuffle(allQuestions);
    return shuffledPool.slice(0, TOTAL_QUESTIONS).map(question => ({
        ...question,
        options: shuffle(question.options)
    }));
}

function showQuestion() {
    const current = selectedQuestions[currentIndex];
    questionText.textContent = current.question;
    optionsList.innerHTML = '';

    current.options.forEach((option, optionIndex) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <label>
            <input type="radio" name="quizOption" value="${option}">
            <span>${option}</span>
          </label>
        `;
        optionsList.appendChild(li);
    });

    progressText.textContent = `Question ${currentIndex + 1} / ${TOTAL_QUESTIONS}`;
    scoreText.textContent = `Score: ${score}`;
    nextButton.textContent = currentIndex < TOTAL_QUESTIONS - 1 ? 'Next' : 'Submit';
}

function getSelectedAnswer() {
    const selectedInput = document.querySelector('input[name="quizOption"]:checked');
    return selectedInput ? selectedInput.value : null;
}

function updateScore() {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer === null) {
        alert('Please select an answer before continuing.');
        return false;
    }
    if (selectedAnswer === selectedQuestions[currentIndex].answer) {
        score += 1;
    }
    return true;
}

function showResult() {
    quizCard.style.display = 'none';
    resultCard.style.display = 'block';
    restartButton.style.display = 'inline-block';
    finalScore.textContent = score;

    const percent = Math.round((score / TOTAL_QUESTIONS) * 100);
    if (percent >= 90) {
        resultMessage.textContent = 'Excellent work! You mastered the quiz.';
    } else if (percent >= 70) {
        resultMessage.textContent = 'Great job! You performed very well.';
    } else if (percent >= 50) {
        resultMessage.textContent = 'Good effort. A little more practice will help.';
    } else {
        resultMessage.textContent = 'Keep trying. Review the questions and try again.';
    }
}

function startQuiz() {
    selectedQuestions = pickRandomQuestions();
    currentIndex = 0;
    score = 0;
    quizCard.style.display = 'block';
    resultCard.style.display = 'none';
    restartButton.style.display = 'none';
    showQuestion();
}

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', startQuiz);
reviewButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', () => {
    if (!updateScore()) {
        return;
    }
    currentIndex += 1;
    if (currentIndex < TOTAL_QUESTIONS) {
        showQuestion();
    } else {
        showResult();
    }
});