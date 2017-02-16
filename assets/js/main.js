
var words = {
	word1: ["b", "l", "a", "n", "k", "a"],
  	word2: ["d", "h", "a", "l", "s", "i", "m"],
	word3: ["v", "e", "g", "a"]
};

var numberOfGuesses = 11;
var list = document.querySelector('#right');
var entry = document.createElement('li');
var listCreation = {
	correctGuess: [],
	incorrectGuess: [],
	initialUnder: 0,
	afterUnder: 0,
	
	//// creating blank correct list ////
	correctBlankList: function (wordz) {
		list = document.querySelector('#right');
		list.innerHTML = '';
		this.correctGuess = [];
      	entry = document.createElement('li');
      	for (var i = 0; i < wordz.length; i++) {
	        this.correctGuess.push("__");

	        //pushing correct array to DOM
	        //////////////////////////////////////////////
	        list = document.querySelector('#right');
	        entry = document.createElement('li');
	        entry.appendChild(document.createTextNode(this.correctGuess[i]));
	        list.appendChild(entry);
	        //////////////////////////////////////////////
  		}
  	},

  	//// letter match check ////
  	matchCheck: function (wordz, userGuessz) {
  		numberOfGuesses--; //decrease guess count

  		//how many elements in the array have yet to be matched
  		initialUnder = 0;
  		for (var i = 0; i < this.correctGuess.length; i++) {
  			if (this.correctGuess[i] === "__") {
  				initialUnder++;
  			}
  		}

  		//// Match code ////
      	//checking if user guess matches any letter n wordz
        for (var i = 0; i < wordz.length; i++) {
          if (userGuessz === wordz[i] && userGuessz != this.correctGuess[i]) {
            this.correctGuess[i] = userGuessz; //adding guess letter to same location as word[i]
            list = document.querySelector('#right');
            list.innerHTML = ''; //clearing DOM

            //pushing correct array to DOM
            //////////////////////////////////////////////
            for (var k = 0; k < wordz.length; k++) {
                list = document.querySelector('#right');
                entry = document.createElement('li');
                entry.appendChild(document.createTextNode(this.correctGuess[k]));
                list.appendChild(entry);
            }
          } else {
            console.log("oh no"); //sanity check
          }
        }

        //how many elements in the array have yet to be matched after checking for matches
        afterUnder = 0;
  		for (var i = 0; i < this.correctGuess.length; i++) {
  			if (this.correctGuess[i] === "__") {
  				afterUnder++;
  			}
  		}

  		//// No Match Code ////
        if (initialUnder === afterUnder) {
        	//first time encounter wrong letter
			if (this.incorrectGuess.length === 0) {
				this.incorrectGuess.push(userGuessz);

				//pushing wrong array to DOM
				//////////////////////////////////////////////
				list = document.querySelector('#wrong');
				entry = document.createElement('li');
				entry.appendChild(document.createTextNode(userGuessz));
				list.appendChild(entry);
				//////////////////////////////////////////////

			} else { //making sure incorrect letter array does not contain duplicates
	        var count = 0;
	      	for (var j = 0; j < this.incorrectGuess.length; j++) {
				if (userGuessz === this.incorrectGuess[j]) {
					count++;
				}
	        }
	        if (count < 1) {
	          this.incorrectGuess.push(userGuessz);

	          //pushing wrong array to DOM
	          //////////////////////////////////////////////
	          list = document.querySelector('#wrong');
	          entry = document.createElement('li');
	          entry.appendChild(document.createTextNode(userGuessz));
	          list.appendChild(entry);
	          //////////////////////////////////////////////
            }
          }
        }
  	},

  	//// winning codition ////
  	winningCondition: function(wordz) {
  		var winCount = 0;
  		for (var i = 0; i < this.correctGuess.length; i++) {
  			if (this.correctGuess[i] === "__") {
  				winCount++
  			}
  		}
  		if (winCount === 0) {
  			console.log("you win");
  			return true;
  		}
  	},

  	//// lose condition ////
  	losingCondition: function (numGuesses) {
    	if (numGuesses === 0) {
          console.log("you lose");
          return true;
        } else {
          console.log("keep trying!");
        }
  	}
};

var colorHTML  = {
	//updating image based on win or lose condition
	winningImgB: function () {
		document.getElementById('gameCondition').setAttribute("src", "assets/images/blanka.jpg");
	},
	winningImgD: function () {
		document.getElementById('gameCondition').setAttribute("src", "assets/images/dhalsim.jpg");
	},
	winningImgV: function () {
		document.getElementById('gameCondition').setAttribute("src", "assets/images/vega.jpg");
	},
	lossingImg: function () {
		document.getElementById('gameCondition').setAttribute("src", "assets/images/lose.jpg");
	},
	//Dom update number of guesses left
	leftGuesses: function (numz) {
		var xzy = "<p>Number of Guesses Left: " + numz + "</p>";
		document.querySelector("#guessLeft").innerHTML = xzy;
		
		// var div = document.getElementById('guessLeft');
		// div.innerHTML = div.innerHTML + numz;
	}

};


colorHTML.leftGuesses(numberOfGuesses); //DOM guess left
var w = 1; //for win count
var l = 1; //for lose count
var currentWord = words.word1; //will start with 1st word
listCreation.correctBlankList(currentWord); //starting with array of underscores

document.onkeyup = function (event) {

	var userGuess = event.key; //user guess saved
	listCreation.matchCheck(currentWord, userGuess); //will append wrong or right array
	
	//// win ////
	var winCheck = listCreation.winningCondition(currentWord);
	if (winCheck === true) { //should use some object loop
		if (currentWord === words.word1) {
			colorHTML.winningImgB(); //image associated with word1 ...
		} else if (currentWord === words.word2) {
			colorHTML.winningImgD();
		} else {
			colorHTML.winningImgV();
		}
		w++
		if (w<4) {
			
			currentWord = words["word"+w];
			listCreation.correctBlankList(currentWord);

			var listy = document.querySelector('#wrong');
			listy.innerHTML = ''; //clearing dom of wrong array
			listCreation.incorrectGuess = []; //clearing wrong array

		} else {
			w = 1; //will start at 1st object of words. an object loop prefered
			currentWord = words["word"+w];
			listCreation.correctBlankList(currentWord);

			var listy = document.querySelector('#wrong');
			listy.innerHTML = '';
			listCreation.incorrectGuess = [];
		}
		numberOfGuesses = 11; //number of guess reset to from 0 to 11
		colorHTML.leftGuesses(numberOfGuesses); //DOM number of guess left
	}

	//// loss ////
	colorHTML.leftGuesses(numberOfGuesses);

	//same as win
	var lossCheck = listCreation.losingCondition(numberOfGuesses);
	if ( lossCheck === true) {
		colorHTML.lossingImg();

		l++;
		if (l<4) {
			currentWord = words["word"+l];
			listCreation.correctBlankList(currentWord);

			var listy = document.querySelector('#wrong');
			listy.innerHTML = '';
			listCreation.incorrectGuess = [];

		} else {
			l = 1;
			currentWord = words["word"+l];
			listCreation.listCreation.correctBlankList(currentWord);

			var listy = document.querySelector('#wrong');
			listy.innerHTML = '';
			listCreation.incorrectGuess = [];
		}
		numberOfGuesses = 11;
		colorHTML.leftGuesses(numberOfGuesses);

	}

};