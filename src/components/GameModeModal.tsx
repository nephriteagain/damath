import { useRef, useEffect } from 'react'

import {AiOutlineInfoCircle} from 'react-icons/ai'
import { BsFillFileRuledFill } from 'react-icons/bs'
import { RiTimerFlashLine } from 'react-icons/ri'

import { useGlobalContext } from "../context/GameContext"
import '../sass/GameModeModal.scss'


const GameModeModal = ({ showRules }) => {


  const {
    gameMode,
    setGameMode,
    timeLimit,
    setTimeLimit,
    setTimerOne,
    setTimerTwo
  } = useGlobalContext()


  const wholeRef = useRef()
  const integerRef = useRef()
  const countingRef = useRef()

  const gameModeRef = useRef('')
  const alertRef = useRef()
  const dropdropRef = useRef()



  function handleSelectChange(event) {
    event.preventDefault();
    let selectedValue = event.target.value

    switch (selectedValue) {
      case '5:00':
        setTimeLimit(3000);
        break;
      case '1:00':
        setTimeLimit(600);
        break;
      case '3:00':
        setTimeLimit(1800);
        break;
      case '10:00':
        setTimeLimit(6000);
        break;
      case 'Unlimited':
        setTimeLimit(Infinity);
        break;
      default:
        setTimeLimit(3000)
        break;
    }
    dropdropRef.current.style.opacity = '0'
  }


  useEffect(() => {
    setTimerOne(timeLimit)
    setTimerTwo(timeLimit)

    
  }, [timeLimit])


  function selectCountingMode() {
    integerRef.current.classList.remove('selected-mode')
    wholeRef.current.classList.remove('selected-mode')
    countingRef.current.classList.add('selected-mode')

    gameModeRef.current = 'COUNTING'
  }

  function selectWholeMode() {
    countingRef.current.classList.remove('selected-mode')
    integerRef.current.classList.remove('selected-mode')
    wholeRef.current.classList.add('selected-mode')

    gameModeRef.current = 'WHOLE'
  }
  function selectIntegerMode() {
    countingRef.current.classList.remove('selected-mode')
    wholeRef.current.classList.remove('selected-mode')
    integerRef.current.classList.add('selected-mode')

    gameModeRef.current = 'INTEGER'
  }

  function startGame() {
    if (
      gameModeRef.current === 'WHOLE' || 
      gameModeRef.current === 'INTEGER' ||
      gameModeRef.current === 'COUNTING'
      ) {
      setGameMode(gameModeRef.current)
      
    } else {
      alertRef.current.style.transform = 'translate(-50%, 0%)'
      setTimeout(() => {
        alertRef.current.style.transform = 'translate(-50%, -500%)'
      }, 3000)
    }
  }


  function formatTime (deciseconds) {
    if (deciseconds === Infinity) return 'Unlimited'
    const minutes = Math.floor(deciseconds / 600);
    const seconds = Math.floor((deciseconds % 600) / 10);
    const deci = deciseconds % 10;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${deci}`;
  };



  

  function showTimer() {
    const dropdown = window.getComputedStyle(dropdropRef.current)
    const opacity = dropdown.opacity
    if (opacity === '0') {
      dropdropRef.current.style.opacity = '1'
    } else {
      dropdropRef.current.style.opacity = '0'
  }
}


  return (
    <div className='game-mode-modal-background'>
      <div className='game-mode-modal'>
        <p className="game-mode-header">
        Select a Game Mode
        </p>
        <div>
          <button className="mode-counting" ref={countingRef}
            onClick={selectCountingMode}
          >Counting
          </button>
          <button className="mode-whole" ref={wholeRef}
            onClick={selectWholeMode}
          >Whole
          </button>
          <button className="mode-integer" ref={integerRef}
            onClick={selectIntegerMode}
          >Integer 
          </button> 

          <div className='selected-time'>
            {formatTime(timeLimit)}
          </div> 

          <select 
            className='time-dropdown'
            onChange={handleSelectChange}
            ref={dropdropRef}
          >
            <option defaultValue="5:00">5:00</option>
            <option value="1:00">1:00</option>
            <option value="3:00">3:00</option>
            <option value="10:00">10:00</option>
            <option value="Unlimited">Unlimited</option>
          </select>


        </div>
        <span className='rule-icon'
          onClick={showRules}
        >
          <BsFillFileRuledFill />
        </span>
        <span className='timer-icon' onClick={showTimer}>
          <RiTimerFlashLine />
        </span>
        <button className="btn-start-game"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
      <div className='notification' ref={alertRef}>
        <p>
        Pick a Game Mode First!
        </p>
      </div>
    </div> 
  )
}

export default GameModeModal