
import { useRef, useEffect, Dispatch, SetStateAction, MouseEvent } from 'react'
import { CgCloseR } from 'react-icons/cg'

import '../sass/Rules.scss'
import { RULES } from '../data/rules'

interface RuleProps {
  openRules: boolean;
  setOpenRules: Dispatch<SetStateAction<boolean>>
}

function Rules({ setOpenRules, openRules }: RuleProps) {

  const popupRef = useRef<HTMLDivElement>(null)

  function closeRuleSheet() {
    setOpenRules(false)
  }

  useEffect(() => {
    let x = 0
    let y = 0

    const el = popupRef.current as HTMLDivElement
    // @ts-ignore
    const mouseDownHandler = function (e) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    };
    // @ts-ignore
    const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    
    // Set the position of element
    el.style.top = `${el.offsetTop + dy}px`;
    el.style.left = `${el.offsetLeft + dx}px`;

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;
    };

    const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

    el.addEventListener('mousedown', mouseDownHandler);

  }, [openRules])

  return (
    <div className="rule-popup" 
      ref={popupRef}
    >
      <div className="rule-header">
        <h2>
        DAMATH
        </h2>
        <h3>
        Rules of Play
        </h3>
      </div>
      <span className='close-rule'
        onClick={closeRuleSheet}
      >
        <CgCloseR />
      </span>
      <ol className="rule-lists" type="1">
        {RULES.map((rule,index) => {
          return (
            <>
            <li key={index}>{rule}</li>
            <br/>
            </>
          )
        })}
      </ol>
      <br/>
      <br/>
      <p className='source'>Rules was sourced <span>
        <a href='https://depedbohol.org/v2/wp-content/uploads/2014/09/Rules-of-Damath.pdf' target='_blank'>here.
        </a>
        </span>
      </p>
      
    </div>
  )
}

export default Rules