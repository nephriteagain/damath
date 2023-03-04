import { FiRotateCw } from 'react-icons/fi'
import { RiNumber2 } from 'react-icons/ri'

import { flipNumber } from '../tsStyle/flipNumber';
import '../sass/Timer.scss';


export function FlipNumberButton() {
  return (
    <span className='number-flipper' 
      onClick={ () => flipNumber('player-two-piece')}
    >
      <FiRotateCw className='svg-rotate' />
      <RiNumber2  className='svg-number' />
    </span>
  )
}

export function FlipNumberButtonBottom() {
  return (
    <span className='number-flipper' 
      onClick={ () => flipNumber('player-one-piece')}
    >
      <FiRotateCw className='svg-rotate' />
      <RiNumber2  className='svg-number' />
    </span>
  )
}

