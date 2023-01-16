
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
const sloganEl = document.querySelector('#slogan');
const counterEl = document.querySelector('#counter');
const pointsEl = document.querySelector('#points');
const nextEl = document.querySelector('#next');
const progressEl = document.querySelector('#progress-bar');

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

let counter = 0;
function count() {
  counter++;
  counterEl.innerHTML = `${counter} /10`
}

let corrNrOfGuesses = 0;
function points() {
  corrNrOfGuesses++
  pointsEl.innerHTML = `${corrNrOfGuesses}⭐️`
}

let progress = 0;
const progressBar = document.querySelector("#progress");

function updateProgress() {
  progress++;
  progressBar.style.width = `${progress}0%`;
}


tenEl.addEventListener("click", () => {
  shortMode = true
  sloganEl.style.display = "none"
  nextEl.style.display = "block"
  progressEl.style.display = "block"
  counterEl.innerHTML = `${counter} /10`
});

twentyEl.addEventListener("click", () => {
  defaultMode = true
  sloganEl.style.display = "none"
  nextEl.style.display = "block"
  progressEl.style.display = "block"
  counterEl.innerHTML = counter + "/20"
});

allEl.addEventListener("click", () => {
  longMode = true
  sloganEl.style.display = "none"
  nextEl.style.display = "block"
  progressEl.style.display = "block"
  counterEl.innerHTML = counter + "/" + array.length
});

let guesses = 0;
let newRandomArr = [];
let corrClassmate = "";
let corrName = "";
let allCorrect = [];
let allWrong = [];
let namesNotToShow = [];

// START function
const start = () => {
  if (guesses !== array.length) {

    shuffleArr(array)

    array = array.filter(image => !namesNotToShow.includes(image))
    
    corrClassmate = array[0]
    picEl.src = corrClassmate.image
    corrName = corrClassmate.name
    console.log(corrClassmate)
    namesNotToShow.push(corrClassmate)
    console.log(namesNotToShow)
    arrayCopy = array.filter(array => array.name !== corrName);
    

    //SHUFFLE THE ARRAY
    shuffleArr(arrayCopy);  
    //GENERATE NEW ARRAY
    newRandomArr = arrayCopy.slice(0, 3);
    newRandomArr.push({name: corrName});
    //SHUFFFLE NEW ARRAY AGAIN SO RIGHT BUTTON ISN'T AT THE SAME SPOT EVERY TIME 
    shuffleArr(newRandomArr);

    namesEl.innerHTML = "";

    // DISPLAYING NAMES FROM NEW ARRAY
    newRandomArr.forEach((names) => {
      if (names.name === corrName) {
        namesEl.innerHTML += `<button id="corrGuess" class="btn">${names.name}</button>`;
      } else
        namesEl.innerHTML += `<button id="btn" class="btn">${names.name}</button>`;
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
    picResultEl.innerHTML += `<img id="correctPicResult" src="${img.image}" alt="Picture of correct guessed classmate">`
  })
  allWrong.forEach((img) => {
    picResultEl.innerHTML += `<img id="wrongPicResult" src="${img.image}" alt="Picture of wrong guessed classmate">`
  })
}

let complete = false

namesEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.id === `corrGuess`) {
      count()
      points()
      e.target.classList.add("btn-success");
      allCorrect.push({image: corrClassmate.image});
      startDelay();
    } else {
      count()
      e.target.classList.add( "btn-danger");
      allWrong.push({image: corrClassmate.image});
      startDelay();
    }
    updateProgress()
  }

  // if (shortMode === true && guesses === 10) {
  //   display();
  //   resultEl.innerHTML += `<button class="btn btn-light">You got ${corrNrOfGuesses} out of 10 correct</button>`;
  //   complete = true
  //   displayResult();
  // } else if (defaultMode === true && guesses === 20) {
  //   display();
  //   resultEl.innerHTML += `<button class="btn btn-light">You got ${corrNrOfGuesses} out of 20 correct</button>`;
  //   displayResult();
  //   complete = true
  // } else if (longMode === true && guesses === array.length) {
  //   display();
  //   resultEl.innerHTML += `<button class="btn btn-light">You got ${corrNrOfGuesses} out of 35 correct</button>`;
  //   displayResult();
  //   complete = true
  // }

});

// const startDelay = () => {
//   setTimeout( () => {
//       if (!complete) {
//         start();
//       }
//   }, 400);
// };

 const startDelay = () => {
  


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

    nextEl.addEventListener('click', (e) => {
      if (e.target.tagName === "BUTTON" && !complete) {
        
                   start();
                 
      }
   })
  
 };

restartEl.addEventListener('click', () => {
  location.reload();
})
