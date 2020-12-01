const game = {
    // GAME CORE PROPERTIES
    numSquares : 6,
    colors : [],
    pickedColor:"",
    clickedSquare: "",

    // ELEMENT SELECTOR PROPERTIES
    rgbDisplay : document.querySelector("h1 span"),
    square : document.querySelectorAll(".square"),
    message : document.getElementById("message"),
    reset : document.getElementById("reset"),
    h1 : document.querySelector("h1"),
    mode : document.querySelectorAll(".mode"),

    init(){
        this.setupButtonListeners();
        this.setupSquareListerners();    
        this.resetGame();
    },


    // EVENT LISTENER PROPERTIES
    setupButtonListeners() {
        for (i=0; i<this.mode.length; i++) {
            this.mode[i].addEventListener("click", function(){
                game.mode[0].classList.remove("selected");
                game.mode[1].classList.remove("selected");
        
                this.classList.add("selected");
        
                this.textContent === "Easy" ? game.numSquares = 3 : game.numSquares = 6;
        
                game.resetGame();
            })
            
        }
        this.reset.addEventListener("click", function(){
            game.resetGame();    
        })
    },

    setupSquareListerners() {
        for (i=0; i<this.square.length; i++){
            this.square[i].style.backgroundColor = this.colors[i];
        
            this.square[i].addEventListener("click", function(){
                game.clickedSquare=this.style.backgroundColor;
        
                if (game.clickedSquare === game.pickedColor) {            
                    game.rightAnswer();
                } else {
                    this.style.backgroundColor = document.querySelector("body").style.backgroundColor;
                    game.message.textContent = "Try Again";
                }
            })
        }
    },


    // GAME CORE METHODS

    rightAnswer() {
        for (i=0; i<this.square.length; i++){
            this.square[i].style.backgroundColor = this.pickedColor;
            this.h1.style.backgroundColor = this.pickedColor;
            this.message.textContent= "Correct";
            this.reset.textContent= "Play Again? "
        }
    },

    pickColor(){
        let random = Math.floor(Math.random() * this.colors.length)
        return this.colors[random];
    },

    generateColors(num){
        let arr = [];
        for (i=0; i<num; i++){
            arr.push(this.randomColor());
            // arr[i] = randomColor();       
        }
        return arr;
    },

    randomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
    
        return "rgb("+r+", "+g+", "+b+")";
    },

    resetGame(){
        this.message.textContent="";
        this.colors=this.generateColors(this.numSquares);
        this.pickedColor = this.pickColor();
        this.rgbDisplay.textContent = this.pickedColor;
        for (i=0; i<this.square.length; i++){
            if(this.colors[i]){
                this.square[i].style.display = "block";
                this.square[i].style.backgroundColor = this.colors[i];
            }else {
                this.square[i].style.display = "none";
            }       
        }   
            this.reset.textContent = "New Colors "    
            this.h1.style.backgroundColor = "steelblue";
    }
}


game.init();