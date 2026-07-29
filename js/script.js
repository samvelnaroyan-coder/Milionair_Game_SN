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

let fixed1 = new Audio ('./music/8,000-question.mp3')
let incorrecSoundFlag = false

generalMusic.loop = true

window.addEventListener('click' , () => {
    generalMusic.play()
}, {once: true})

endBtn.addEventListener('click' , () => {
    setTimeout (() =>{
        game.style.backgroundImage = ""
    },2000);
    questionSong.pause()
    mainGame.classList.remove('animate_backInUp')
    gameWrapper.classList.remove('animate__flipInx')
    mainGame.classList.add('animate__animated','animate__backOutDown')
    setTimeout(()=>{
        mainGame.style.display = 'none'
        startBtn.style.display = 'block'
        startBtn.classList.remove('animate__backOutDown')
        startBtn.classList.add('animate__backOutDown')
    },1000);
    setTimeout(()=>{
        startBtn.classList.remove('animate__backInDown')
    },2000);

    let userWin = document.querySelector('.user-win')
    if (userWin){
        userWin.remove()
    }
    fixed1.pause()
    generalMusic.pause()

    let activeWin = document.querySelector('.win-active') || document.querySelector('.win-guaranteed')
    if (activeWin){
        let span = activeWin.querySelectorAll('span')
        span.forEach(span => span.remove());
        let visibleAmount = activeWin.innerText.train()
        let existingWin = document.querySelector('.user-win')
        if (existingWin){
            existingWin.remove()
        }
    }

    let winDiv = document.createElement('div')
    winDiv.className = '.user-win animate__animated animate__fadeIn'
    winDiv.style.cssText = 'text-align: center; font-Size: 24px; color: white;margin-top: 300px;'
    startBtn.insertAdjacentElement('afterend',winDiv)

    setTimeout(()=>{
        winDiv.classList.replace('animate__fadeIn','animate__fadeOut')
        setTimeout(()=> winDiv.remove(),2000)
    },0);

    getStartGame()
})

// Խաղի սկիզբը
startBtn.addEventListener('click', () => {//Խաղի սկիզբը կոճակի վրա սեղմելիս , պետք է կատարվեն այս ֆունկցիայում ներառված գործողությւոնները
    generalMusic.pause();
    generalMusic.currentTime = 0;
    game.style.backgroundImage = "url('./img/galaxy.jpg')";
    game.style.backgroundSize="100%"
  
    startBtn.classList.add('animate__animated', 'animate__backOutUp');//նախապես ունեցած կոճակի վրա ավելացնում ենք այս երկու անիմացիաները
    mainGame.classList.remove('animate__backOutDown');//mainGame-ից հեռացնում ենք այս կլաս անուն ունեցող անիմացիան
    showBtn.remove()
    setTimeout(() => {//Ցույց է տալիս թե ինչքան ժամանակ հետո պետք է կատարվի տվյալ գործողությունը
      mainGame.style.display = 'block';
      mainGame.classList.add('animate__animated', 'animate__backInUp');//mainGame-ին ավելացնումէ է նախապես ստեղծված  կլաս անվանում
      startBtn.style.display = 'none';
      setTimeout(() => {
        gameWrapper.classList.add('animate__animated', 'animate__flipInX');//gameWrapper-ին ավելացնումէ է նախապես ստեղծված  կլաս անվանում
      }, 1000);
    }, 500);
    setTimeout(() => {
      endBtn.style.opacity = '1';// տրված է առավելագույն թափանցելիություն
    }, 1000);
    //
    setTimeout(() => {
      questionSong.loop = true
      questionSong.play()
      for (let i = 0; i < btnAnswers.length; i++) {
        btnAnswers[i].addEventListener('click', () => {
          questionSong.pause()
          setTimeout(() => {
            if (count != 5 && count != 10 && count != 15) {
              if (incorrectSoundFlag == false && count < 5) {
                questionSong.play()
              }
              if (count == 15) {
                fixed1.pause()
              }
              questionSong.currentTime = 0
            } else if (count >= 5) {
              fixed1.loop = true
              fixed1.play()
              questionSong.pause()
            }
          }, 3000);
  
        })
      }
    }, 2000);
  });   