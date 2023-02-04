
var userClickedPattern = [];
var buttonColors = ['green','red','yellow','blue'];
var gamePattern = [];
var level = 0;
var started = false;

function nextSequence(){
    var newNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[newNumber];
    gamePattern.push(randomColor);
    pressedButton = $("#"+randomColor);
    animateButton(pressedButton);
    playAudio(randomColor);
    level++;
    $('h1').text('Level '+level);
    
}
function onKeyPress(){
    if (started == false){
        nextSequence();
        started = true;
    } 
}
function reset(){
    wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
    $('h1').text('Game Over, press a key to try again');
    $("body").addClass("wrong");
    setTimeout(()=> {$("body").removeClass("wrong");},200);
}

function checkAnswer(currLevel){
    x = Math.min(currLevel, userClickedPattern.length)

    for(let i=0;i< x; i++){
        if (gamePattern[i]== userClickedPattern[i]){

        } else{
            reset();
        }
    }
    if(currLevel == userClickedPattern.length){
        userClickedPattern = [];
        setTimeout(()=> {nextSequence();},1000);
    }
}


$(".btn").on('click',function(){
    var chosenColor = this.id;
    userClickedPattern.push(chosenColor);
    animateButton($('#'+chosenColor));
    playAudio(chosenColor);
    checkAnswer(level);
});


function animateButton(pressedButton){
    
    pressedButton.addClass("pressed");
    setTimeout(()=>{$(pressedButton.removeClass("pressed"))},200);
}

function playAudio(buttonPressed){
    switch (buttonPressed) {
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;

        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
    
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;

        default:
            console.log('Something went wrong'+buttonPressed);
            break;
    }
}

$(document).on("keydown",onKeyPress);