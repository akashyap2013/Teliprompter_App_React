import React, { useState, useEffect, useRef, useContext } from 'react';
import { ValueContext } from './api';
import { HiPlay , HiPause    } from "react-icons/hi2";
import { BiSolidTimer, BiFontFamily, BiCaretRight, BiSolidRectangle } from "react-icons/bi";

function Teliprompter() {
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const { value } = useContext(ValueContext);

  const [isScrolling, setIsScrolling] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [rangeValue, setRangeValue] = useState(0.3); // Initial value is 0.5
  const [fontSize, setFontSize] = useState(36);
  const [text, setText] = useState(''); // Initial value is 0.5
  
  
  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      setIsScrolling(true); // Start scrolling on spacebar press
      setIsPaused(!isPaused); // Toggle pause state on spacebar press
      // console.log(isPaused);
    } else if (event.key === 'ArrowUp') {
      scrollUp(); // Scroll up function call
    } else if (event.key === 'ArrowDown') {
      scrollDown(); // Scroll down function call
    }
  };

  const scrollUp = () => {
    if (textRef.current) {
      textRef.current.scrollTop -= 10; // Adjust the scroll step as needed
    }
  };

  const scrollDown = () => {
    if (textRef.current) {
      textRef.current.scrollTop += 10; // Adjust the scroll step as needed
    }
  };

  useEffect(() => {
    if (isScrolling && textRef.current) {
    //   let scrollTop = 0; previous approach
       let scrollTop = textRef.current.scrollTop;

      const intervalId = setInterval(() => {
        // start the scrolling where the user left off
        if (scrollTop >= textRef.current.scrollHeight || isPaused) {
          clearInterval(intervalId);
          setIsScrolling(isPaused); // Stop scrolling if paused
          return;
        }
      
        const scrollIncrement = 1 + parseFloat(rangeValue);
        scrollTop += scrollIncrement; // Adjust scrolling speed (higher value for faster scrolling)
        textRef.current.scrollTop = scrollTop;
      }, 50); // Adjust interval for scrolling smoothness (lower value for smoother scrolling)
          // Cleanup function to prevent memory leaks
        return () => clearInterval(intervalId);
    }

  }, [isScrolling, textRef, isPaused]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPaused]); // Add event listener on mount, remove on unmount

  return (
    <div>
        {/* create a navigation */}
        <header className='fixed top-0 left-0 w-full  py-5 flex flex-row gap-10 justify-center'>
            <button className={`block border-1 ${isPaused ? 'bg-blue-400' : 'bg-orange-400'} px-3 py-1 text-gray-50`}
              onClick={() => {
                setIsScrolling(true); // Start scrolling on spacebar press
                setIsPaused(!isPaused); // Toggle pause state on spacebar press
              }}  
            >
              {isPaused ? <HiPlay  size={25} /> : <HiPause  size={25} /> }
            </button>
            <div className='flex gap-3'>
              <p className='flex gap-3 text-xl items-center'><BiSolidTimer size={40} /> {rangeValue}</p>
              <input type="range" min="0.1" step={0.1} max="20" value={rangeValue} 
              onChange={(e) => setRangeValue(e.target.value)} // Ensure onChange handler is provided
              className="slider" id="myRange" />
            </div>
            <div className='flex gap-3'>
              <p className='flex gap-3 text-xl items-center'><BiFontFamily size={30} /> {fontSize}px</p>
              <input type="range" min="1" step={1} max="120" value={fontSize} 
              onChange={(e) => setFontSize(e.target.value)} // Ensure onChange handler is provided
              className="slider" id="myRange" />
            </div>
            {/* add a quick reset button to scroll the text to the top again */}
            <button className='bg-red-600 px-3 text-gray-50' onClick={(e) => {
              // don't run this code on keydown event 
              if (e.type === 'click') {
                // console.log('reset')
                textRef.current.scrollTop = 0;
              }
            }}><BiSolidRectangle size={20} /></button>

        </header>

        {/* add black box to show text */}
        <div className='w-full h-72 bg-black fixed inset-0 m-auto -z-10 flex items-center'>
          <BiCaretRight  size={80} />
        </div>

        <div className='w-full h-screen flex justify-center' style={{ overflowY: 'hidden', fontSize : `${fontSize}` }}>
          {/* add textarea to show text and put it at center of the document */}
          <textarea ref={textRef} 
          onChange={(e) => setText(e.target.value)}
          value={value || 'Text Not Found'} className='text-center w-10/12 bg-transparent focus:outline-none border-none text-white h-full' 
          readOnly
          style={{  overflow: 'hidden', fontSize : `${fontSize}px`, paddingTop : "30%", paddingBottom : "30%"}}>
            
          </textarea>
        </div>
    </div>

    
  );
}

export default Teliprompter;

