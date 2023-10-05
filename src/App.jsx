import {useState} from 'react'
function App() {
  const systemTxt = ''

  const [calculator, setCalculator] = useState({
    display: '0',
    formula: systemTxt
  })

  const symbolRegEx = /[+\/*\-]/

  function handleKeyboard(e) {

    const keyPress = e.key
    console.log(keyPress)

    if(keyPress.match(/[0-9]/)) {
      handleNumbers(keyPress)
    }

    if(keyPress === '.') {
      fraction()
    }

    if(keyPress === 'Escape' || keyPress === 'Backspace') {
      resetCalculator()
    }

    if(keyPress === '+') {
      addition()
    }
    if(keyPress === '-') {
      subtraction()
    }
    if(keyPress === '*') {
      multiplication()
    }
    if(keyPress === '/') {
      division()
    }
    if(keyPress === '=' || keyPress === 'Enter') {
      calculate()
    }
  }

  function resetCalculator () {
    console.clear()
    setCalculator({
      display: '0',
      formula: systemTxt,
      finished: false
    })
  }

  function handleNumbers (e) {
    let number
    typeof e === 'string' ? number = e : number = e.target.value

    if (calculator.display === '0') {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: number,
          formula: number
        }
      })
    }else if(calculator.finished) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: number,
          formula: number,
          finished: false
        }
      })
    } else
     {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: prevCalculator.display + number,
          formula: prevCalculator.formula + number
        }
      })
    }
    
  }

  function addition () {

    let lastSymbol = calculator.formula[calculator.formula.length-1]
    let preLastSymbol = calculator.formula[calculator.formula.length-2]

    if(calculator.finished) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '+',
          formula: prevCalculator.formula.split('=')[1] + '+',
          finished: false
        }
      })
    } else

    if(!lastSymbol.match(symbolRegEx)) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '+',
          formula: prevCalculator.formula + '+'
        }
      })
    }
    if(lastSymbol.match(symbolRegEx) && !preLastSymbol.match(symbolRegEx)) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '+',
          formula: prevCalculator.formula.slice(0,-1) + '+'
        }
      })
    } else 
    if (lastSymbol === '-' && preLastSymbol.match(symbolRegEx)){
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '+',
          formula: prevCalculator.formula.slice(0,-2) + '+'
        }
      })
    }

  }

  function subtraction () {

    let lastSymbol = calculator.formula[calculator.formula.length-1]
    let preLastSymbol = calculator.formula[calculator.formula.length-2]

    if(calculator.finished) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '-',
          formula: prevCalculator.formula.split('=')[1] + '-',
          finished: false
        }
      })
    } else

    if((lastSymbol.match(symbolRegEx) && !preLastSymbol.match(symbolRegEx)) ||  (!lastSymbol.match(symbolRegEx)) || calculator.formula.length===1) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '-',
          formula: prevCalculator.formula + '-'
        }
      })
    }
    if (lastSymbol === '-' && preLastSymbol.match(symbolRegEx)){
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '-',
          formula: prevCalculator.formula.slice(0,-2) + '-'
        }
      })
    }
  }

  function multiplication () {

    let lastSymbol = calculator.formula[calculator.formula.length-1]
    let preLastSymbol = calculator.formula[calculator.formula.length-2]

    if(calculator.finished) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '*',
          formula: prevCalculator.formula.split('=')[1] + '*',
          finished: false
        }
      })
    } else

    if(!lastSymbol.match(symbolRegEx)) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '*',
          formula: prevCalculator.formula + '*'
        }
      })
    }
    if(lastSymbol.match(symbolRegEx) && !preLastSymbol.match(symbolRegEx)) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '*',
          formula: prevCalculator.formula.slice(0,-1) + '*'
        }
      })
    } else 
    if (lastSymbol === '-' && preLastSymbol.match(symbolRegEx)){
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '*',
          formula: prevCalculator.formula.slice(0,-2) + '*'
        }
      })
    }
}

  function division () {

    let lastSymbol = calculator.formula[calculator.formula.length-1]
    let preLastSymbol = calculator.formula[calculator.formula.length-2]

    if(calculator.finished) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '/',
          formula: prevCalculator.formula.split('=')[1] + '/',
          finished: false
        }
      })
    } else

    if(!lastSymbol.match(symbolRegEx)) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '/',
          formula: prevCalculator.formula + '/'
        }
      })
    }

    if(lastSymbol.match(symbolRegEx) && !preLastSymbol.match(symbolRegEx)) {
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '/',
          formula: prevCalculator.formula.slice(0,-1) + '/'
        }
      })
    } else 
    if (lastSymbol === '-' && preLastSymbol.match(symbolRegEx)){
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: '/',
          formula: prevCalculator.formula.slice(0,-2) + '/'
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
          display: prevCalculator.display + '.',
          formula: prevCalculator.formula + '.'
        }
      })
    }
  }

  function calculate() {
    const formulaWithoutDoubleNegative = calculator.formula.replaceAll('--', '+')
    if(formulaWithoutDoubleNegative.length !== 0) {
      const answer = eval(formulaWithoutDoubleNegative)
      setCalculator(prevCalculator => {
        return {
          ...prevCalculator,
          display: answer,
          formula: prevCalculator.formula + '=' + answer,
          finished: true
        }
      })
    }
  }

  return (
    <div className="calculator-container" onKeyDown={handleKeyboard} tabIndex='-1'>
      <div className="display-container">
        <div>{calculator.formula}</div>
        <div id="display">{calculator.display}</div>
      </div>
      <div className="buttons-container">
        <button id="clear" className='ac-button' value="AC" onClick={resetCalculator}>AC</button>
        <button id="divide" className='signs-button' value="/" onClick={division}>/</button>
        <button id="multiply" className='signs-button' value="X" onClick={multiplication}>X</button>
        <button id="subtract" className='signs-button' value="-" onClick={subtraction}>-</button>
        <button id="seven" value="7" onClick={handleNumbers}>7</button>
        <button id="eight" value="8" onClick={handleNumbers}>8</button>
        <button id="nine" value="9" onClick={handleNumbers}>9</button>
        <button id="add" className="plus-button" value="+" onClick={addition}>+</button>
        <button id="four" value="4" onClick={handleNumbers}>4</button>
        <button id="five" value="5" onClick={handleNumbers}>5</button>
        <button id="six" value="6" onClick={handleNumbers}>6</button>
        <button id="one" value="1" onClick={handleNumbers}>1</button>
        <button id="two" value="2" onClick={handleNumbers}>2</button>
        <button id="three" value="3" onClick={handleNumbers}>3</button>
        <button id="equals" className="eql-button" value="=" onClick={calculate}>=</button>
        <button id="zero" className="zero-button" value="0" onClick={handleNumbers}>0</button>
        <button id="decimal"  value="." onClick={fraction}>.</button>

      </div>
    </div>
  )
}

export default App
