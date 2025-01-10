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

