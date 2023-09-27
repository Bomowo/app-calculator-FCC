import {useState} from 'react'
function App() {

  const [calculator, setCalculator] = useState({
    display: '',
    formula: ''
  })

  function testClick (e) {
    if (e.target.value === 'AC') {
      setCalculator({
        display: '',
        formula: ''
      })
    }

    setCalculator(prevCalculator => {
      return {
        ...prevCalculator,
        display: e.target.value,
        formula: prevCalculator.formula + e.target.value
      }
    })
  }

  return (
    <div className="calculator-container">
      <div className="display-container">
        <div>formula: {calculator.formula}</div>
        <div>input and output Display: {calculator.display}</div>
      </div>
      <div className="buttons-container">
        <button value="AC" onClick={testClick}>AC</button>
        <button value="/" onClick={testClick}>/</button>
        <button value="X" onClick={testClick}>X</button>
        <button value="-" onClick={testClick}>-</button>
        <button value="7" onClick={testClick}>7</button>
        <button value="8" onClick={testClick}>8</button>
        <button value="9" onClick={testClick}>9</button>
        <button value="+" onClick={testClick}>+</button>
        <button value="4" onClick={testClick}>4</button>
        <button value="5" onClick={testClick}>5</button>
        <button value="6" onClick={testClick}>6</button>
        <button value="1" onClick={testClick}>1</button>
        <button value="2" onClick={testClick}>2</button>
        <button value="3" onClick={testClick}>3</button>
        <button value="=" onClick={testClick}>=</button>
        <button value="0" onClick={testClick}>0</button>
        <button value="." onClick={testClick}>.</button>
      </div>
    </div>
  )
}

export default App
