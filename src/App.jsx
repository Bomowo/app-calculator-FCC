import {useState} from 'react'
function App() {

  const [calculator, setCalculator] = useState({
    display: '',
    formula: ''
  })

  function resetCalculator () {
    setCalculator({
      display: '',
      formula: ''
    })
  }

  function handleNumbers (e) {
    setCalculator(prevCalculator => {
      return {
        ...prevCalculator,
        display: e.target.value,
        formula: prevCalculator.formula + e.target.value
      }
    })
  }

  function calculate() {
    const answer = eval(calculator.formula)
    setCalculator(prevCalculator => {
      return {
        ...prevCalculator,
        display: answer,
        formula: prevCalculator.formula + '=' + answer
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
        <button value="AC" onClick={resetCalculator}>AC</button>
        <button value="/" onClick={handleNumbers}>/</button>
        <button value="X" onClick={handleNumbers}>X</button>
        <button value="-" onClick={handleNumbers}>-</button>
        <button value="7" onClick={handleNumbers}>7</button>
        <button value="8" onClick={handleNumbers}>8</button>
        <button value="9" onClick={handleNumbers}>9</button>
        <button value="+" onClick={handleNumbers}>+</button>
        <button value="4" onClick={handleNumbers}>4</button>
        <button value="5" onClick={handleNumbers}>5</button>
        <button value="6" onClick={handleNumbers}>6</button>
        <button value="1" onClick={handleNumbers}>1</button>
        <button value="2" onClick={handleNumbers}>2</button>
        <button value="3" onClick={handleNumbers}>3</button>
        <button value="=" onClick={calculate}>=</button>
        <button value="0" onClick={handleNumbers}>0</button>
        <button value="." onClick={handleNumbers}>.</button>
      </div>
    </div>
  )
}

export default App
