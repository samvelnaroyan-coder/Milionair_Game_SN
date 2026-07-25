'usw strict'

let mainGame = document.querySelector('.game-block'),
gameWrapper = document.querySelector('.game-wrap'),
startBtn = document.querySelector('.start-btn'),
endBtn = document.querySelector('.end-btn'),
btnAnswers = document.querySelector('.answer'),
blockQuestion = document.querySelector('.question'),
helpBtns = document.querySelector('.hints-help'),
winBlock = document.querySelector('.wins-block'),
helpFifty = document.querySelector('.fifty-fifty'),
helpHall = document.querySelector('.hall-help'),
helpFriend = document.querySelector('.call-friend'),
helpAI = document.querySelector('.ai-help'),
game = document.querySelector('.game')

let changeQuestion = document.getElementById('hintBox')
let extraQuestion = document.getElementById('extra')
let flagExtra = true

let endB = document.getElementById('end')

const popup = document.getElementById('rulesPopup')
const showBtn = document.getElementById('showRules')

let aiExplainBlock = document.getElementById('aiExplainBlock')
let aiExplainText = document.getElementById('aiExplainText')
let aiExplainClose = document.getElementById('aiExplainClose')

const OPENAI_KEY = ''
const OPENAI_Model = ''

showBtn.addEventListener('click' , function(){
    popup.classList.add('show')
})

popup.addEventListener('click' , function(){
    popup.classList.remove('show')
})

const generalMusic = new Audio ('./music/end-sound.mp3')
const questionSong= new Audio ('./music/question-sound.mp3')
let count = 0

let fixed = new Audio ('./music/8,000-question.mp3')
let incorrecSoundFlag = false

generalMusic.loop = true

window.addEventListener('click' , () => {
    generalMusic.play()
}, {once: true})

endBtn.addEventListener('click' , () => {
    setTimeout (() =>{
        game.style.backgroundImage = ""
    },200)
    questionSong.pause()
    mainGame.classList.remove('animate_backInUp')
})