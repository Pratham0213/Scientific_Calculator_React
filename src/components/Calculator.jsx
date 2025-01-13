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