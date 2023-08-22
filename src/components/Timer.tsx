import { useRef, useEffect } from 'react';
import { MdCropRotate } from 'react-icons/md'

import '../sass/Timer.scss';
import { FlipNumberButtonBottom } from './FlipNumbers';
import { ScoreOne } from './Score';

interface TimerProps {
  timerOne: number;
  currentTimer: number;
}

function Timer({ timerOne, currentTimer }: TimerProps) {

  const timerRef = useRef<HTMLDivElement>(null)

    function rotateClock() {
      const el = timerRef.current as HTMLDivElement
      const timerStyle = window.getComputedStyle(el)
      const rotate = timerStyle.transform
      if (rotate === 'matrix(-1, 0, 0, -1, 0, 0)') {
        el.style.transform = 'rotate(0deg)'
      } else {
        el.style.transform = 'rotate(180deg)'
      }
  }


  function formatTime(deciseconds: number) {
    if (deciseconds === Infinity) return 'Unlimited'

    const minutes = Math.floor(deciseconds / 600);
    const seconds = Math.floor((deciseconds % 600) / 10);
    const deci = deciseconds % 10;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${deci}`;
  };

  useEffect(() => {
    const el = timerRef.current as HTMLDivElement
    if (currentTimer === 1) {
      el.style.backgroundColor = 'red'
      el.style.color = '#fff'
    } else {
      el.style.backgroundColor = '#fff'
      el.style.color = '#000'
    }
  }, [currentTimer])

  return (
    <div className='timer-one'>
      <div className='timer-counter-one' ref={timerRef}>{formatTime(timerOne)}</div>
      <span className='flip-time' onClick={rotateClock}><MdCropRotate /></span>
      <FlipNumberButtonBottom />
      <ScoreOne />
    </div>
  );
}

export default Timer;
