<<<<<<< HEAD
import { useState, useEffect } from "react";
// import ConfettiExplosion from 'react-confetti-explosion';
import ConfettiExplosion from "react-confetti-explosion";

import { create, all } from "mathjs";

const math = create(all);

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isRad, setIsRad] = useState(true);
  const [secondFunction, setSecondFunction] = useState(false);
  const [history, setHistory] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [parenthesesCount, setParenthesesCount] = useState(0);
  const [waitingForExponent, setWaitingForExponent] = useState(false);
  const [waitingForBase, setWaitingForBase] = useState(false);

  const handleNumber = (num) => {
    setDisplay(prev => prev === '0' ? String(num) : prev + num);
  };

  const handleOperator = (op) => {
    setDisplay(prev => prev + ' ' + op + ' ');
  };

  const handleEquals = () => {
    try {
      // Close any remaining open parentheses
      let expression = display;
      for (let i = 0; i < parenthesesCount; i++) {
        expression += ')';
      }

      const result = math.evaluate(expression);
      setHistory(prev => [...prev, `${display} = ${result}`]);
      setDisplay(String(result));
      setShowConfetti(true);
      setParenthesesCount(0);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setParenthesesCount(0);
    setWaitingForExponent(false);
    setWaitingForBase(false);
  };

  const handleToggleSign = () => {
    setDisplay(prev => String(-Number(prev)));
  };

  const handlePercent = () => {
    setDisplay(prev => String(Number(prev) / 100));
  };

  const handleParentheses = (type) => {
    if (type === '(') {
      setParenthesesCount(prev => prev + 1);
      setDisplay(prev => prev === '0' ? '(' : prev + '(');
    } else {
      if (parenthesesCount > 0) {
        setParenthesesCount(prev => prev - 1);
        setDisplay(prev => prev + ')');
      }
    }
  };

  const handleMemory = (operation) => {
    switch (operation) {
      case 'MC':
        setMemory(0);
        break;
      case 'M+':
        setMemory(prev => prev + Number(display));
        break;
      case 'M-':
        setMemory(prev => prev - Number(display));
        break;
      case 'MR':
        setDisplay(String(memory));
        break;
    }
  };

  const handleConstant = (constant) => {
    switch (constant) {
      case 'π':
        setDisplay(prev => prev === '0' ? String(Math.PI) : prev + String(Math.PI));
        break;
      case 'e':
        setDisplay(prev => prev === '0' ? String(Math.E) : prev + String(Math.E));
        break;
    }
  };

  const handlePower = () => {
    if (!waitingForExponent) {
      setWaitingForExponent(true);
      setDisplay(prev => prev + '^');
    }
  };

  const handleRoot = () => {
    if (!waitingForBase) {
      setWaitingForBase(true);
      setDisplay(prev => 'nthroot(' + prev + ',');
    }
  };

  const handleFunction = (func) => {
    try {
      let result;
      const x = Number(display);

      switch (func) {
        case 'square':
          result = x * x;
          break;
        case 'cube':
          result = x * x * x;
          break;
        case 'sqrt':
          result = Math.sqrt(x);
          break;
        case 'cbrt':
          result = Math.cbrt(x);
          break;
        case 'reciprocal':
          result = 1 / x;
          break;
        case 'factorial':
          result = math.factorial(x);
          break;
        case 'sin':
          result = isRad ? Math.sin(x) : Math.sin((x * Math.PI) / 180);
          break;
        case 'cos':
          result = isRad ? Math.cos(x) : Math.cos((x * Math.PI) / 180);
          break;
        case 'tan':
          result = isRad ? Math.tan(x) : Math.tan((x * Math.PI) / 180);
          break;
        case 'sinh':
          result = Math.sinh(x);
          break;
        case 'cosh':
          result = Math.cosh(x);
          break;
        case 'tanh':
          result = Math.tanh(x);
          break;
        case 'ln':
          result = Math.log(x);
          break;
        case 'log':
          result = Math.log10(x);
          break;
        case 'exp':
          result = Math.exp(x); // e^x
          break;
        case 'pow10':
          result = Math.pow(10, x); // 10^x
          break;
        case 'random':
          result = Math.random();
          break;
        default:
          return;
      }

      setDisplay(String(result));
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleEE = () => {
    setDisplay(prev => prev + 'e');
  };

  return (
    <div className="calculator">
      {showConfetti && <ConfettiExplosion />}
      <div className="display">{display}</div>
      <div className="buttons">
        {/* Row 1 */}
        <button className="button function" onClick={() => handleParentheses('(')}>(</button>
        <button className="button function" onClick={() => handleParentheses(')')}>)</button>
        <button className="button function" onClick={() => handleMemory('MC')}>mc</button>
        <button className="button function" onClick={() => handleMemory('M+')}>m+</button>
        <button className="button function" onClick={() => handleMemory('M-')}>m−</button>
        <button className="button function" onClick={() => handleMemory('MR')}>mr</button>
        <button className="button function" onClick={handleClear}>C</button>
        <button className="button function" onClick={handleToggleSign}>±</button>
        <button className="button function" onClick={handlePercent}>%</button>
        <button className="button operator" onClick={() => handleOperator('/')}>÷</button>

        {/* Row 2 */}
        <button className="button function" onClick={() => setSecondFunction(!secondFunction)}>2ⁿᵈ</button>
        <button className="button function" onClick={() => handleFunction('square')}>x²</button>
        <button className="button function" onClick={() => handleFunction('cube')}>x³</button>
        <button className="button function" onClick={handlePower}>xʸ</button>
        <button className="button function" onClick={() => handleFunction('exp')}>eˣ</button>
        <button className="button function" onClick={() => handleFunction('pow10')}>10ˣ</button>
        <button className="button" onClick={() => handleNumber(7)}>7</button>
        <button className="button" onClick={() => handleNumber(8)}>8</button>
        <button className="button" onClick={() => handleNumber(9)}>9</button>
        <button className="button operator" onClick={() => handleOperator('*')}>×</button>

        {/* Row 3 */}
        <button className="button function" onClick={() => handleFunction('reciprocal')}>¹/x</button>
        <button className="button function" onClick={() => handleFunction('sqrt')}>²√x</button>
        <button className="button function" onClick={() => handleFunction('cbrt')}>³√x</button>
        <button className="button function" onClick={handleRoot}>ʸ√x</button>
        <button className="button function" onClick={() => handleFunction('ln')}>ln</button>
        <button className="button function" onClick={() => handleFunction('log')}>log₁₀</button>
        <button className="button" onClick={() => handleNumber(4)}>4</button>
        <button className="button" onClick={() => handleNumber(5)}>5</button>
        <button className="button" onClick={() => handleNumber(6)}>6</button>
        <button className="button operator" onClick={() => handleOperator('-')}>−</button>

        {/* Row 4 */}
        <button className="button function" onClick={() => handleFunction('factorial')}>x!</button>
        <button className="button function" onClick={() => handleFunction(secondFunction ? 'sinh' : 'sin')}>
          {secondFunction ? 'sinh' : 'sin'}
        </button>
        <button className="button function" onClick={() => handleFunction(secondFunction ? 'cosh' : 'cos')}>
          {secondFunction ? 'cosh' : 'cos'}
        </button>
        <button className="button function" onClick={() => handleFunction(secondFunction ? 'tanh' : 'tan')}>
          {secondFunction ? 'tanh' : 'tan'}
        </button>
        <button className="button function" onClick={() => handleConstant('e')}>e</button>
        <button className="button function" onClick={handleEE}>EE</button>
        <button className="button" onClick={() => handleNumber(1)}>1</button>
        <button className="button" onClick={() => handleNumber(2)}>2</button>
        <button className="button" onClick={() => handleNumber(3)}>3</button>
        <button className="button operator" onClick={() => handleOperator('+')}>+</button>

        {/* Row 5 */}
        <button className="button function" onClick={() => setIsRad(!isRad)}>
          {isRad ? 'Rad' : 'Deg'}
        </button>
        <button className="button function" onClick={() => handleFunction(secondFunction ? 'sinh' : 'sin')}>
          {secondFunction ? 'sinh' : 'sin'}
        </button>
        <button className="button function" onClick={() => handleFunction(secondFunction ? 'cosh' : 'cos')}>
          {secondFunction ? 'cosh' : 'cos'}
        </button>
        <button className="button function" onClick={() => handleFunction(secondFunction ? 'tanh' : 'tan')}>
          {secondFunction ? 'tanh' : 'tan'}
        </button>
        <button className="button function" onClick={() => handleConstant('π')}>π</button>
        <button className="button function" onClick={() => handleFunction('random')}>Rand</button>
        <button className="button" onClick={() => handleNumber(0)}>0</button>
        <button className="button" onClick={() => handleNumber('.')}>.</button>
        <button className="button operator" onClick={handleEquals}>=</button>
      </div>

      <div className="history">
        <h3>History</h3>
        {history.map((item, index) => (
          <div key={index} className="history-item">{item}</div>
        ))}
      </div>
    </div>
  );
}
=======
import { useState } from 'react';
import { create, all } from 'mathjs';
import ThemeToggle from './ThemeToggle';
const [isRad, setIsRad] = useState(true); // Toggle radians/degrees
const [showConfetti, setShowConfetti] = useState(false); // Confetti effect
const [theme, setTheme] = useState('light'); // Theme state

const toggleTheme = () => {
  setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
};
function App() {
  return (
    <div
      className="calculator"
      style={{
        width: '300px',
        backgroundColor: theme === 'light' ? '#333' : '#1a1a1a',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        margin: 'auto',
        color: theme === 'light' ? '#fff' : '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      {showConfetti && <ConfettiExplosion />}
      <div
        className="display"
        style={{
          backgroundColor: '#444',
          padding: '15px',
          borderRadius: '5px',
          textAlign: 'right',
          marginBottom: '20px',
          fontSize: '32px',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        {display || '0'}
      </div>
        <div
          className="buttons"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)', // Adjusted to accommodate 10 buttons in one row
            gap: '10px',
          }}
        >
          {/* First Row for "(" to "÷" */}
          <button style={buttonStyle} onClick={() => handleNumber('(')}>(</button>
          <button style={buttonStyle} onClick={() => handleNumber(')')}>)</button>
          <button style={buttonStyle} onClick={() => handleMemory('MC')}>MC</button>
          <button style={buttonStyle} onClick={() => handleMemory('M+')}>M+</button>
          <button style={buttonStyle} onClick={() => handleMemory('M-')}>M-</button>
          <button style={buttonStyle} onClick={() => handleMemory('MR')}>MR</button>
          <button style={buttonStyle} onClick={handleClear}>C</button>
          <button style={buttonStyle} onClick={handleToggleSign}>±</button>
          <button style={buttonStyle} onClick={handlePercent}>%</button>
          <button style={operatorStyle} onClick={() => handleOperator('/')}>÷</button>

        {/* Clear & Operators */}
        <button style={buttonStyle} onClick={handleClear}>C</button>
        <button style={buttonStyle} onClick={handleToggleSign}>±</button>
        <button style={buttonStyle} onClick={handlePercent}>%</button>
        <button style={operatorStyle} onClick={() => handleOperator('/')}>÷</button>

        {/* Second Row */}
        <button style={buttonStyle} onClick={() => setSecondFunction(!secondFunction)}>2ⁿᵈ</button>
        <button style={buttonStyle} onClick={() => handleFunction('square')}>x²</button>
        <button style={buttonStyle} onClick={() => handleFunction('cube')}>x³</button>
        <button style={operatorStyle} onClick={() => handleOperator('*')}>×</button>

        {/* Numbers & Operators */}
        {[7, 8, 9].map((num) => (
          <button key={num} style={buttonStyle} onClick={() => handleNumber(num)}>
            {num}
          </button>
        ))}
        <button style={operatorStyle} onClick={() => handleOperator('-')}>−</button>
        {[4, 5, 6].map((num) => (
          <button key={num} style={buttonStyle} onClick={() => handleNumber(num)}>
            {num}
          </button>
        ))}
        <button style={operatorStyle} onClick={() => handleOperator('+')}>+</button>
        {[1, 2, 3].map((num) => (
          <button key={num} style={buttonStyle} onClick={() => handleNumber(num)}>
            {num}
          </button>
        ))}

        {/* Bottom Row */}
        <button style={zeroStyle} onClick={() => handleNumber(0)}>0</button>
        <button style={buttonStyle} onClick={() => handleNumber('.')}>.</button>
        <button style={equalsStyle} onClick={handleEquals}>=</button>
      </div>
    </div>
  );
  import ConfettiExplosion from 'react-confetti-explosion';

  // Initialize the math.js library for advanced calculations
  const math = create(all);

  export default function Calculator() {
    const [display, setDisplay] = useState(''); // Current input or result
    const [memory, setMemory] = useState(0); // Memory for MC, MR, M+, M-
    const [secondFunction, setSecondFunction] = useState(false); // Toggle for 2nd functions
    const [isRad, setIsRad] = useState(true); // Toggle radians/degrees
    const [showConfetti, setShowConfetti] = useState(false); // Confetti effect

    // Function to handle memory operations
    const handleMemory = (action) => {
      switch (action) {
        case 'MC':
          setMemory(0);
          break;
        case 'M+':
          setMemory((prev) => prev + parseFloat(display || 0));
          break;
        case 'M-':
          setMemory((prev) => prev - parseFloat(display || 0));
          break;
        case 'MR':
          setDisplay(String(memory));
          break;
        default:
          break;
      }
    };

    const handleClear = () => setDisplay('');
    const handleToggleSign = () => setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
    const handlePercent = () => setDisplay((prev) => String(parseFloat(prev || 0) / 100));
    const handleOperator = (operator) => setDisplay((prev) => `${prev} ${operator} `);

    const handleFunction = (func) => {
      let result;
      const value = parseFloat(display || 0);
      switch (func) {
        case 'square': result = math.pow(value, 2); break;
        case 'cube': result = math.pow(value, 3); break;
        case 'sqrt': result = math.sqrt(value); break;
        case 'ln': result = math.log(value); break;
        case 'log10': result = math.log10(value); break;
        case 'sin': result = isRad ? math.sin(value) : math.sin(math.unit(value, 'deg')); break;
        case 'cos': result = isRad ? math.cos(value) : math.cos(math.unit(value, 'deg')); break;
        case 'tan': result = isRad ? math.tan(value) : math.tan(math.unit(value, 'deg')); break;
        case 'reciprocal': result = 1 / value; break;
        case 'pi': result = math.pi; break;
        default: result = value; break;
      }
      setDisplay(String(result));
    };

    const handleNumber = (number) => setDisplay((prev) => prev + number);
    const handleEquals = () => {
      try {
        const result = math.evaluate(display);
        setDisplay(String(result));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      } catch {
        setDisplay('Error');
      }
    };

    return (
      <div
        className="calculator"
        style={{
          width: '300px',
          backgroundColor: '#333',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          margin: 'auto',
          color: '#fff',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {showConfetti && <ConfettiExplosion />}
        <div
          className="display"
          style={{
            backgroundColor: '#444',
            padding: '15px',
            borderRadius: '5px',
            textAlign: 'right',
            marginBottom: '20px',
            fontSize: '32px',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          {display || '0'}
        </div>
        <div
          className="buttons"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
        >
          {/* Top Row */}
          <button style={buttonStyle} onClick={() => handleMemory('MC')}>MC</button>
          <button style={buttonStyle} onClick={() => handleMemory('M+')}>M+</button>
          <button style={buttonStyle} onClick={() => handleMemory('M-')}>M-</button>
          <button style={buttonStyle} onClick={() => handleMemory('MR')}>MR</button>

          {/* Clear & Operators */}
          <button style={buttonStyle} onClick={handleClear}>C</button>
          <button style={buttonStyle} onClick={handleToggleSign}>±</button>
          <button style={buttonStyle} onClick={handlePercent}>%</button>
          <button style={operatorStyle} onClick={() => handleOperator('/')}>÷</button>

          {/* Second Row */}
          <button style={buttonStyle} onClick={() => setSecondFunction(!secondFunction)}>2ⁿᵈ</button>
          <button style={buttonStyle} onClick={() => handleFunction('square')}>x²</button>
          <button style={buttonStyle} onClick={() => handleFunction('cube')}>x³</button>
          <button style={operatorStyle} onClick={() => handleOperator('*')}>×</button>

          {/* Numbers & Operators */}
          {[7, 8, 9].map((num) => (
            <button key={num} style={buttonStyle} onClick={() => handleNumber(num)}>
              {num}
            </button>
          ))}
          <button style={operatorStyle} onClick={() => handleOperator('-')}>−</button>
          {[4, 5, 6].map((num) => (
            <button key={num} style={buttonStyle} onClick={() => handleNumber(num)}>
              {num}
            </button>
          ))}
          <button style={operatorStyle} onClick={() => handleOperator('+')}>+</button>
          {[1, 2, 3].map((num) => (
            <button key={num} style={buttonStyle} onClick={() => handleNumber(num)}>
              {num}
            </button>
          ))}

          {/* Bottom Row */}
          <button style={zeroStyle} onClick={() => handleNumber(0)}>0</button>
          <button style={buttonStyle} onClick={() => handleNumber('.')}>.</button>
          <button style={equalsStyle} onClick={handleEquals}>=</button>
        </div>
      </div>
    );
  }

  // Button Styles
  const buttonStyle = {
    backgroundColor: '#555',
    border: 'none',
    borderRadius: '5px',
    padding: '15px',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
    textAlign: 'center',
  };

  const operatorStyle = {
    ...buttonStyle,
    backgroundColor: '#f90',
  };

  const zeroStyle = {
    ...buttonStyle,
    gridColumn: 'span 2',
  };

  const equalsStyle = {
    ...buttonStyle,
    backgroundColor: '#f90',
  };

>>>>>>> 87c8225e63568723ef655d93fcb209c059305772
