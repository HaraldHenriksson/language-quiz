
//QUERY SELECTORS
const picEl = document.querySelector("#pic");
const startEl = document.querySelector("#start");
const namesEl = document.querySelector("#names");
const tenEl = document.querySelector("#ten");
const twentyEl = document.querySelector("#twenty");
const allEl = document.querySelector("#all");
const resultEl = document.querySelector('#result');
const restartEl = document.querySelector('#restart');
const questionEl = document.querySelector('#question');
const picResultEl = document.querySelector('#picResult');

restartEl.style.display ="none";

startEl.addEventListener("click", () => {
  startEl.style.display = "none";
  namesEl.style.display = "flex";
  picEl.style.display = "flex";
  questionEl.style.display = "none";
  restartEl.style.display ="flex";
});

// MAKING A COPY OF ARRAY
arrayCopy = [...array];

// ADDING FISHER YATES METHOD
const shuffleArr = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

let shortMode = false;
let defaultMode = false;
let longMode = false;


tenEl.addEventListener("click", () => {
  shortMode = true
});

twentyEl.addEventListener("click", () => {
  defaultMode = true
});

allEl.addEventListener("click", () => {
  longMode = true
});

let guesses = 0;
let corrNrOfGuesses = 0;
let newRandomArr = [];
let corrClassmate = "";
let corrName = "";
let allCorrect = [];
let allWrong = [];
let namesNotToShow = [];

// const newClassmate = () => {
//   arrayCopy = array.filter(array => array.name !== namesNotToShow[guesses].name[2]);
//   return arrayCopy
// }

// START function
const start = () => {
  if (guesses !== array.length) {
    // array = array.filter(array => array.name !== namesNotToShow);
    corrClassmate = array[guesses]
    picEl.src = "students/" + corrClassmate.image
    corrName = corrClassmate.name
    arrayCopy = array.filter(array => array.name !== corrName);
    

    //SHUFFLE THE ARRAY
    shuffleArr(arrayCopy);  
    //GENERATE NEW ARRAY
    newRandomArr = arrayCopy.slice(0, 3);
    newRandomArr.push({name: corrName});
    namesNotToShow.push({name: newRandomArr});
    console.log(namesNotToShow)
    //SHUFFFLE NEW ARRAY AGAIN SO RIGHT BUTTON ISN'T AT THE SAME SPOT EVERY TIME 
    shuffleArr(newRandomArr);

    namesEl.innerHTML = "";

    // DISPLAYING NAMES FROM NEW ARRAY
    newRandomArr.forEach((names) => {
      //console.log(names.name)
      if (names.name === corrName) {
        namesEl.innerHTML += `<button id="corrGuess" class="btn btn-light">${names.name}</button>`;
      } else
        namesEl.innerHTML += `<button id="btn" class="btn btn-light">${names.name}</button>`;
    });
  }
};
start();


const display = () => {
  namesEl.style.display = "none";
    picEl.style.display = "none";
}

const displayResult = () => {
  allCorrect.forEach((img) => {
    picResultEl.innerHTML += `<img id="correctPicResult" src="students/${img.image}" alt="Picture of correct guessed classmate">`
  })
  allWrong.forEach((img) => {
    picResultEl.innerHTML += `<img id="wrongPicResult" src="students/${img.image}" alt="Picture of wrong guessed classmate">`
  })
}

let complete = false

namesEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    guesses++;
    console.log(guesses);
    if (e.target.id === `corrGuess`) {
      corrNrOfGuesses++;
      e.target.classList.replace("btn-light", "btn-success");
      allCorrect.push({image: corrClassmate.image});
      startDelay();
    } else {
      e.target.classList.replace("btn-light", "btn-danger");
      allWrong.push({image: corrClassmate.image});
      startDelay();
    }
    console.log(guesses, corrNrOfGuesses);
  }
  if (shortMode === true && guesses === 10) {
    display();
    resultEl.innerHTML += `<button class="btn btn-light">You got ${corrNrOfGuesses} out of 10 correct</button>`;
    complete = true
    displayResult();
  } else if (defaultMode === true && guesses === 20) {
    display();
    resultEl.innerHTML += `<button class="btn btn-light">You got ${corrNrOfGuesses} out of 20 correct</button>`;
    displayResult();
    complete = true
  } else if (longMode === true && guesses === array.length) {
    display();
    resultEl.innerHTML += `<button class="btn btn-light">You got ${corrNrOfGuesses} out of 35 correct</button>`;
    displayResult();
    complete = true
  }
});

const startDelay = () => {
  setTimeout( () => {
      if (!complete) {
        start();
      }
  }, 400);
};



restartEl.addEventListener('click', () => {
  location.reload();
})

//[Math.floor(Math.random() * array.length)]  
