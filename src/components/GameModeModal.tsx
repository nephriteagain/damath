import { useRef, useEffect, ChangeEvent } from 'react'

import {AiOutlineInfoCircle} from 'react-icons/ai'
import { BsFillFileRuledFill } from 'react-icons/bs'
import { RiTimerFlashLine } from 'react-icons/ri'

import { useGlobalContext } from "../context/GameContext"
import '../sass/GameModeModal.scss'

interface GameModeModalProps {
  showRules: () => void
}

const GameModeModal = ({ showRules }: GameModeModalProps) => {


  const {
    gameMode,
    setGameMode,
    timeLimit,
    setTimeLimit,
    setTimerOne,
    setTimerTwo
  } = useGlobalContext()


  const wholeRef = useRef<HTMLButtonElement>(null)
  const integerRef = useRef<HTMLButtonElement>(null)
  const countingRef = useRef<HTMLButtonElement>(null)

  const gameModeRef = useRef('')
  const alertRef = useRef<HTMLDivElement>(null)
  const dropdropRef = useRef<HTMLSelectElement>(null)



  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
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
    const element = dropdropRef.current as HTMLSelectElement
    element.style.opacity  = '0'
  }


  useEffect(() => {
    setTimerOne(timeLimit)
    setTimerTwo(timeLimit)

    
  }, [timeLimit])


  function selectCountingMode() {
    const intEl = integerRef.current as HTMLButtonElement
    const wholeEl = wholeRef.current as HTMLButtonElement
    const countingEl = countingRef.current as HTMLButtonElement

    intEl.classList.remove('selected-mode')
    wholeEl.classList.remove('selected-mode')
    countingEl.classList.add('selected-mode')

    gameModeRef.current = 'COUNTING'
  }

  function selectWholeMode() {
    const intEl = integerRef.current as HTMLButtonElement
    const wholeEl = wholeRef.current as HTMLButtonElement
    const countingEl = countingRef.current as HTMLButtonElement

    countingEl.classList.remove('selected-mode')
    intEl.classList.remove('selected-mode')
    wholeEl.classList.add('selected-mode')

    gameModeRef.current = 'WHOLE'
  }
  function selectIntegerMode() {
    const intEl = integerRef.current as HTMLButtonElement
    const wholeEl = wholeRef.current as HTMLButtonElement
    const countingEl = countingRef.current as HTMLButtonElement

    countingEl.classList.remove('selected-mode')
    wholeEl.classList.remove('selected-mode')
    intEl.classList.add('selected-mode')

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
      const alertEl = alertRef.current as HTMLDivElement
      alertEl.style.transform = 'translate(-50%, 0%)'
      setTimeout(() => {
        alertEl.style.transform = 'translate(-50%, -500%)'
      }, 3000)
    }
  }


  function formatTime (deciseconds: number) {
    if (deciseconds === Infinity) return 'Unlimited'
    const minutes = Math.floor(deciseconds / 600);
    const seconds = Math.floor((deciseconds % 600) / 10);
    const deci = deciseconds % 10;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${deci}`;
  };



  

  function showTimer() {
    const dropdownEl = dropdropRef.current as HTMLSelectElement
    const dropdown = window.getComputedStyle(dropdownEl)
    const opacity = dropdown.opacity
    if (opacity === '0') {
      dropdownEl.style.opacity = '1'
    } else {
      dropdownEl.style.opacity = '0'
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