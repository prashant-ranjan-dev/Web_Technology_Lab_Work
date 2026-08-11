/* =========================================================
   WEB TECHNOLOGY QUIZ
   Quiz Engine
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const TOTAL_QUESTIONS = 20;


/* =========================================================
   QUESTION BANK
   ========================================================= */

const allQuestions = [

    {
        question: "HTML: What is the purpose of <!DOCTYPE html>?",
        options: [
            "Defines document type and HTML version",
            "Adds a stylesheet",
            "Creates a new HTML element",
            "Specifies character encoding"
        ],
        answer: "Defines document type and HTML version"
    },

    {
        question: "HTML: Which tag creates a hyperlink?",
        options: [
            "<a>",
            "<link>",
            "<nav>",
            "<href>"
        ],
        answer: "<a>"
    },

    {
        question: "HTML: Which tag is used for a table row?",
        options: [
            "<tr>",
            "<td>",
            "<th>",
            "<table>"
        ],
        answer: "<tr>"
    },

    {
        question: "HTML: Which attribute sets the source of an image?",
        options: [
            "src",
            "href",
            "alt",
            "title"
        ],
        answer: "src"
    },

    {
        question: "CSS: Which selector targets all paragraph elements?",
        options: [
            "p",
            ".paragraph",
            "#paragraph",
            "paragraph"
        ],
        answer: "p"
    },

    {
        question: "CSS: Which property changes text color?",
        options: [
            "color",
            "background",
            "font-size",
            "border-color"
        ],
        answer: "color"
    },

    {
        question: "CSS: What property controls space outside the element border?",
        options: [
            "margin",
            "padding",
            "border",
            "width"
        ],
        answer: "margin"
    },

    {
        question: "CSS: Which property centers inline text inside an element?",
        options: [
            "text-align",
            "align-items",
            "justify-content",
            "vertical-align"
        ],
        answer: "text-align"
    },

    {
        question: "CSS: Which property hides an element from display?",
        options: [
            "display: none",
            "visibility: hidden",
            "opacity: 0",
            "overflow: hidden"
        ],
        answer: "display: none"
    },

    {
        question: "JavaScript: Which keyword declares a block-scoped variable?",
        options: [
            "let",
            "var",
            "constantly",
            "function"
        ],
        answer: "let"
    },

    {
        question: "JavaScript: Which keyword defines a function?",
        options: [
            "function",
            "method",
            "def",
            "func"
        ],
        answer: "function"
    },

    {
        question: "JavaScript: How do you select an element by its id?",
        options: [
            "document.getElementById()",
            "document.querySelectorAll()",
            "document.getElementsByClassName()",
            "document.getElementsByTagName()"
        ],
        answer: "document.getElementById()"
    },

    {
        question: "JavaScript: Which method attaches an event handler to an element?",
        options: [
            "addEventListener()",
            "attachEvent()",
            "onEvent()",
            "setEvent()"
        ],
        answer: "addEventListener()"
    },

    {
        question: "JavaScript: What does === compare?",
        options: [
            "Value and type",
            "Only value",
            "Only type",
            "Reference only"
        ],
        answer: "Value and type"
    },

    {
        question: "OOP: Which keyword defines a class in JavaScript?",
        options: [
            "class",
            "struct",
            "object",
            "module"
        ],
        answer: "class"
    },

    {
        question: "OOP: Which keyword indicates inheritance in JavaScript classes?",
        options: [
            "extends",
            "inherits",
            "implements",
            "uses"
        ],
        answer: "extends"
    },

    {
        question: "OOP: Which method is called when a new class instance is created?",
        options: [
            "constructor",
            "initialize",
            "setup",
            "start"
        ],
        answer: "constructor"
    },

    {
        question: "OOP: What does encapsulation mean?",
        options: [
            "Hiding internal object details",
            "Reusing code across classes",
            "Overloading methods",
            "Converting classes to objects"
        ],
        answer: "Hiding internal object details"
    },

    {
        question: "OOP: What is polymorphism?",
        options: [
            "Same method name, different behavior",
            "Single inheritance only",
            "Hiding implementation details",
            "Creating new objects from classes"
        ],
        answer: "Same method name, different behavior"
    },

    {
        question: "JavaScript: Which array method creates a new array with results of calling a function on every element?",
        options: [
            "map()",
            "filter()",
            "reduce()",
            "forEach()"
        ],
        answer: "map()"
    },

    {
        question: "HTML: Which semantic element represents the main content of a page?",
        options: [
            "<main>",
            "<section>",
            "<article>",
            "<aside>"
        ],
        answer: "<main>"
    },

    {
        question: "CSS: Which unit is relative to the font size of the element?",
        options: [
            "em",
            "px",
            "cm",
            "%"
        ],
        answer: "em"
    },

    {
        question: "CSS: Which property makes an element a flex container?",
        options: [
            "display: flex",
            "flex-direction",
            "justify-content",
            "align-items"
        ],
        answer: "display: flex"
    },

    {
        question: "HTML: Which input type is used for email addresses?",
        options: [
            "email",
            "text",
            "tel",
            "url"
        ],
        answer: "email"
    },

    {
        question: "JavaScript: Which method selects the first element that matches a CSS selector?",
        options: [
            "querySelector()",
            "querySelectorAll()",
            "getElementById()",
            "getElementsByClassName()"
        ],
        answer: "querySelector()"
    },

    {
        question: "JavaScript: Which function converts a string to an integer?",
        options: [
            "parseInt()",
            "toString()",
            "Number()",
            "parseFloat()"
        ],
        answer: "parseInt()"
    },

    {
        question: 'OOP: In a class method, what does the "this" keyword refer to?',
        options: [
            "The current class instance",
            "The parent class",
            "A global variable",
            "A function parameter"
        ],
        answer: "The current class instance"
    },

    {
        question: "HTML: Which element represents the largest heading?",
        options: [
            "<h1>",
            "<h2>",
            "<h3>",
            "<header>"
        ],
        answer: "<h1>"
    },

    {
        question: "CSS: Which property sets the spacing between letters?",
        options: [
            "letter-spacing",
            "word-spacing",
            "line-height",
            "text-indent"
        ],
        answer: "letter-spacing"
    },

    {
        question: "JavaScript: Which method creates a new array with elements that pass a test?",
        options: [
            "filter()",
            "map()",
            "reduce()",
            "forEach()"
        ],
        answer: "filter()"
    },

    {
        question: "OOP: What does abstraction mean?",
        options: [
            "Showing only relevant details",
            "Creating duplicate objects",
            "Encrypting methods",
            "Preventing inheritance"
        ],
        answer: "Showing only relevant details"
    },

    {
        question: "HTML: Which tag defines a list item?",
        options: [
            "<li>",
            "<ul>",
            "<ol>",
            "<list>"
        ],
        answer: "<li>"
    },

    {
        question: "CSS: Which property controls the space inside an element border?",
        options: [
            "padding",
            "margin",
            "border",
            "width"
        ],
        answer: "padding"
    },

    {
        question: "JavaScript: Which method adds a new item to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        answer: "push()"
    }

];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const introPage =
    document.getElementById("introPage");

const quizCard =
    document.getElementById("quizCard");

const resultCard =
    document.getElementById("resultCard");

const startButton =
    document.getElementById("startButton");

const reviewButton =
    document.getElementById("reviewButton");

const homeButton =
    document.getElementById("homeButton");

const nextButton =
    document.getElementById("nextButton");

const nextButtonText =
    document.getElementById("nextButtonText");

const questionText =
    document.getElementById("questionText");

const optionsList =
    document.getElementById("optionsList");

const progressText =
    document.getElementById("progressText");

const progressBar =
    document.getElementById("progressBar");

const scoreText =
    document.getElementById("scoreText");

const categoryBadge =
    document.getElementById("categoryBadge");

const selectionMessage =
    document.getElementById("selectionMessage");

const resultMessage =
    document.getElementById("resultMessage");

const finalScore =
    document.getElementById("finalScore");

const percentageScore =
    document.getElementById("percentageScore");

const correctCount =
    document.getElementById("correctCount");

const incorrectCount =
    document.getElementById("incorrectCount");

const scoreRing =
    document.getElementById("scoreRing");


/* =========================================================
   QUIZ STATE
   ========================================================= */

let selectedQuestions = [];

let currentIndex = 0;

let score = 0;

let selectedAnswer = null;


/* =========================================================
   UTILITY
   ========================================================= */

/**
 * Fisher-Yates shuffle.
 */
function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            copy[i],
            copy[randomIndex]
        ] = [
            copy[randomIndex],
            copy[i]
        ];

    }

    return copy;
}


/**
 * Extract category from question prefix.
 */
function getCategory(question) {

    const separatorIndex =
        question.indexOf(":");

    if (separatorIndex === -1) {
        return "GENERAL";
    }

    return question
        .substring(0, separatorIndex)
        .trim();

}


/**
 * Remove category prefix from displayed question.
 */
function getQuestionText(question) {

    const separatorIndex =
        question.indexOf(":");

    if (separatorIndex === -1) {
        return question;
    }

    return question
        .substring(separatorIndex + 1)
        .trim();

}


/* =========================================================
   QUESTION SELECTION
   ========================================================= */

function pickRandomQuestions() {

    return shuffle(allQuestions)

        .slice(0, TOTAL_QUESTIONS)

        .map(question => ({

            ...question,

            options: shuffle(question.options)

        }));

}


/* =========================================================
   START QUIZ
   ========================================================= */

function startQuiz() {

    selectedQuestions =
        pickRandomQuestions();

    currentIndex = 0;

    score = 0;

    selectedAnswer = null;

    introPage.hidden = true;

    resultCard.hidden = true;

    quizCard.hidden = false;

    showQuestion();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SHOW QUESTION
   ========================================================= */

function showQuestion() {

    const current =
        selectedQuestions[currentIndex];


    selectedAnswer = null;


    /* Question number */

    const questionNumber =
        String(currentIndex + 1).padStart(2, "0");

    const totalNumber =
        String(TOTAL_QUESTIONS).padStart(2, "0");


    progressText.textContent =
        `${questionNumber} / ${totalNumber}`;


    /* Progress */

    const progressPercentage =
        ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

    progressBar.style.width =
        `${progressPercentage}%`;


    /* Score */

    scoreText.textContent =
        score;


    /* Category */

    categoryBadge.textContent =
        getCategory(current.question);


    /* Question */

    questionText.textContent =
        getQuestionText(current.question);


    /* Reset options */

    optionsList.innerHTML = "";


    /* Create options */

    current.options.forEach(
        (option, index) => {

            const optionButton =
                document.createElement("button");


            optionButton.type =
                "button";


            optionButton.className =
                "option";


            optionButton.dataset.value =
                option;


            const letter =
                String.fromCharCode(65 + index);


            optionButton.innerHTML = `

                <span class="option-letter">
                    ${letter}
                </span>

                <span class="option-text">
                    ${escapeHTML(option)}
                </span>

            `;


            optionButton.addEventListener(
                "click",
                () => selectAnswer(
                    optionButton,
                    option
                )
            );


            optionsList.appendChild(
                optionButton
            );

        }
    );


    /* Reset next button */

    nextButton.disabled = true;

    nextButtonText.textContent =
        currentIndex === TOTAL_QUESTIONS - 1
            ? "Submit Assessment"
            : "Next Question";


    selectionMessage.textContent =
        "Choose an option to continue.";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SELECT ANSWER
   ========================================================= */

function selectAnswer(
    clickedButton,
    answer
) {

    selectedAnswer = answer;


    document
        .querySelectorAll(".option")
        .forEach(option => {

            option.classList.remove(
                "selected"
            );

        });


    clickedButton.classList.add(
        "selected"
    );


    nextButton.disabled = false;


    selectionMessage.textContent =
        "Answer selected. Continue when ready.";

}


/* =========================================================
   SUBMIT CURRENT ANSWER
   ========================================================= */

function submitCurrentAnswer() {

    if (selectedAnswer === null) {

        return false;

    }


    const current =
        selectedQuestions[currentIndex];


    if (
        selectedAnswer === current.answer
    ) {

        score += 1;

    }


    return true;

}


/* =========================================================
   NEXT QUESTION
   ========================================================= */

function nextQuestion() {

    if (!submitCurrentAnswer()) {

        return;

    }


    if (
        currentIndex <
        TOTAL_QUESTIONS - 1
    ) {

        currentIndex += 1;

        showQuestion();

    } else {

        showResult();

    }

}


/* =========================================================
   RESULT SCREEN
   ========================================================= */

function showResult() {

    quizCard.hidden = true;

    resultCard.hidden = false;


    const percentage =
        Math.round(
            (score / TOTAL_QUESTIONS) * 100
        );


    const incorrect =
        TOTAL_QUESTIONS - score;


    /* Score */

    finalScore.textContent =
        score;


    percentageScore.textContent =
        `${percentage}%`;


    correctCount.textContent =
        score;


    incorrectCount.textContent =
        incorrect;


    /* Circular score */

    const degrees =
        percentage * 3.6;


    scoreRing.style.background = `

        conic-gradient(

            #155eef
            ${degrees}deg,

            #273244
            ${degrees}deg

        )

    `;


    /* Performance message */

    if (percentage >= 90) {

        resultMessage.textContent =
            "Outstanding performance. You have demonstrated excellent command of the assessed concepts.";

    } else if (percentage >= 75) {

        resultMessage.textContent =
            "Great performance. You have a strong understanding of the core concepts.";

    } else if (percentage >= 60) {

        resultMessage.textContent =
            "Good effort. Your fundamentals are developing well, with room for further improvement.";

    } else if (percentage >= 40) {

        resultMessage.textContent =
            "A decent attempt. Review the fundamentals and challenge yourself again.";

    } else {

        resultMessage.textContent =
            "Keep practicing. Revisiting the fundamentals will help strengthen your understanding.";

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   RETURN TO INTRO
   ========================================================= */

function goHome() {

    quizCard.hidden = true;

    resultCard.hidden = true;

    introPage.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   HTML ESCAPING
   ========================================================= */

function escapeHTML(value) {

    return value

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

startButton.addEventListener(
    "click",
    startQuiz
);


reviewButton.addEventListener(
    "click",
    startQuiz
);


homeButton.addEventListener(
    "click",
    goHome
);


nextButton.addEventListener(
    "click",
    nextQuestion
);


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Press Enter or Space to continue
         * when an answer has been selected.
         */

        if (
            (event.key === "Enter" ||
             event.key === " ") &&
            !nextButton.disabled &&
            !quizCard.hidden
        ) {

            event.preventDefault();

            nextQuestion();

        }

    }
);