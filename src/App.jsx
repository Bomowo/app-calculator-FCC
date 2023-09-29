import {useState} from 'react'
function App() {

  const [calculator, setCalculator] = useState({
    display: '0',
    formula: ''
  })

  let symbolRegEx = /[+\/*\-]/

  function resetCalculator () {
    console.clear()
    setCalculator({
      display: '0',
      formula: ''
    })
  }

  function handleNumbers (e) {
    if (calculator.display === '0') {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: e.target.value,
          formula: prevCalculator.formula + e.target.value
        }
      })
    } else {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: prevCalculator.display + e.target.value,
          formula: prevCalculator.formula + e.target.value
        }
      })
    }
    
  }

  function addition () {

    let lastSymbol = calculator.formula[calculator.formula.length-1]

    if(lastSymbol !== '+' && lastSymbol !== '-' && lastSymbol !== '*' && lastSymbol !== '/') {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '+',
          formula: prevCalculator.formula + '+'
        }
      })
    }

  }

  function subtraction () {

    let lastSymbol = calculator.formula[calculator.formula.length-1]
    let preLastSymbol = calculator.formula[calculator.formula.length-2]

    if((lastSymbol.match(symbolRegEx) && !preLastSymbol.match(symbolRegEx)) ||  (!lastSymbol.match(symbolRegEx)) || calculator.formula.length===1) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '-',
          formula: prevCalculator.formula + '-'
        }
      })
    }
  }

  function multiplication () {

    let lastSymbol = calculator.formula[calculator.formula.length-1]

    if(!lastSymbol.match(symbolRegEx)) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '*',
          formula: prevCalculator.formula + '*'
        }
      })
    }

  }

  function division () {

    let lastSymbol = calculator.formula[calculator.formula.length-1]

    if(!lastSymbol.match(symbolRegEx)) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '/',
          formula: prevCalculator.formula + '/'
        }
      })
    }

  }

  function fraction () {
    let lastSymbol = calculator.formula[calculator.formula.length-1]
    let arrayOfNum = (calculator.formula.split(symbolRegEx))

    if((!lastSymbol.match(symbolRegEx)) && !arrayOfNum[arrayOfNum.length-1].includes('.')) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '.',
          formula: prevCalculator.formula + '.'
        }
      })
    }
  }

  function calculate() {
    const formulaWithoutDoubleNegative = calculator.formula.replaceAll('--', '+')
    const answer = eval(formulaWithoutDoubleNegative)
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
        <div id="display">{calculator.display}</div>
      </div>
      <div className="buttons-container">
        <button id="clear" value="AC" onClick={resetCalculator}>AC</button>
        <button id="divide" value="/" onClick={division}>/</button>
        <button id="multiply" value="X" onClick={multiplication}>X</button>
        <button id="subtract" value="-" onClick={subtraction}>-</button>
        <button id="seven" value="7" onClick={handleNumbers}>7</button>
        <button id="eight" value="8" onClick={handleNumbers}>8</button>
        <button id="nine" value="9" onClick={handleNumbers}>9</button>
        <button id="add" value="+" onClick={addition}>+</button>
        <button id="four" value="4" onClick={handleNumbers}>4</button>
        <button id="five" value="5" onClick={handleNumbers}>5</button>
        <button id="six" value="6" onClick={handleNumbers}>6</button>
        <button id="one" value="1" onClick={handleNumbers}>1</button>
        <button id="two" value="2" onClick={handleNumbers}>2</button>
        <button id="three" value="3" onClick={handleNumbers}>3</button>
        <button id="equals" value="=" onClick={calculate}>=</button>
        <button id="zero" value="0" onClick={handleNumbers}>0</button>
        <button id="decimal" value="." onClick={fraction}>.</button>
      </div>
    </div>
  )
}

export default App
