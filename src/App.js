//import { makeStyles, styled } from '@mui/material/styles'
import { Button, TextField, Grid } from '@mui/material'
import React, { useState } from "react"
import './App.css'

function ButtonComponent({ value, onClick, className })
{
  return (
    <Button className={className} variant="outlined" onClick={() => onClick(value)}>
      {value}
    </Button>
  );
}

function App() 
{
  const [currentOutput, setCurrentOutput] = useState('0')
  const [firstNum, setFirstNum] = useState('')
  const [secondNum, setSecondNum] = useState('')
  const [operator, setOperator] = useState('')
  const [lastKey, setLastKey] = useState('')
  const [lastOperator, setLastOperator] = useState('')
  const [lastValue, setLastValue] = useState('')
  const [keypressed, setKeyPressed] = useState('')

  const handleButtonClick = (value) => 
  {
    if (value === '0' || value === '1' || value === '2' || value === '3' || value === '4' || value === '5' || value === '6' || value === '7' || value === '8' || value === '9') 
    {
      // if we've already entered our firstNum and an operator
      if (operator) 
      {
        // we update our secondNum
        setSecondNum((secondNum + value).replace(/^0+/, '')) // Remove leading zeros
        setCurrentOutput((secondNum + value).replace(/^0+/, ''))
      } 
      else 
      {
        // we only update our firstNum
        setFirstNum((firstNum + value).replace(/^0+/, '')) // Remove leading zeros
        setCurrentOutput((firstNum + value).replace(/^0+/, ''))
      }
      // remove keypressed
      setLastKey('')
      setKeyPressed('')
    } 

    if (value === '-' || value === '+' || value === '*' || value === '/') 
    {
      // only set operators if we entered our firstNum
      if (firstNum)
      {
        setOperator(value)
        setKeyPressed(value)
      }
      // consecutive calculation with operator keys
      if (firstNum && operator && lastKey !== 'operator' && lastKey !== 'calculate') 
      {
        const result = calculate(firstNum, secondNum, operator)
        setCurrentOutput(result)
        setFirstNum(result)
        setSecondNum('')
        setOperator(value)
        setLastKey('operator')
      }
      setSecondNum('')
      setLastKey('operator')
    } 

    if (value === ".") 
    {
      // if number displayed doesn't already have a decimal
      if (!currentOutput.includes(".")) 
      {
        setCurrentOutput(currentOutput + ".");
        if (!operator) 
        {
          // If we have not updated operator we know to update firstNum
          setFirstNum(firstNum + ".");
        } 
        else 
        {
          // If we have updated operator we know to update secondNum
          if (secondNum === "") 
          {
            setSecondNum("0.");
          } 
          else 
          {
            setSecondNum(secondNum + ".");
          }
        }
      } 
      else if (lastKey === "operator" || lastKey === "calculate") 
      {
        setCurrentOutput("0.");
        if (!operator) 
        {
          setFirstNum("0.");
        } 
        else 
        {
          setSecondNum("0.");
        }
      }
    
      // We will record the prior key as a decimal key
      setLastKey("decimal");
    }

    if (value === 'CE') 
    {
      // Clear variables
      setCurrentOutput('0')
      setFirstNum('')
      setOperator('')
      setSecondNum('')
      setLastKey('')
      setKeyPressed('')
    } 

    if (value === '=') 
    {
      setKeyPressed('')
      if (firstNum && operator && secondNum) 
      {
        if (lastKey === 'calculate') 
        {
          const newResult = calculate(firstNum, lastValue, lastOperator)
          setFirstNum(newResult)
          setCurrentOutput(newResult)
        }
        else if (firstNum && operator && secondNum) 
        {
          const result = calculate(firstNum, secondNum, operator)
          setCurrentOutput(result)
          setFirstNum(result)
          setLastOperator(operator)
          setLastValue(secondNum)
        }
        setLastKey('calculate')
      }
    } 
    
  }
  
  // function to handle calculations
  const calculate = (n1, n2, operator) => 
  {
    
    // Convert the strings to numbers
    n1 = parseFloat(firstNum)
    n2 = parseFloat(secondNum)

    // Perform the calculation with operator given
    switch (operator) 
    {
      case '+':
        return (n1 + n2).toString()
      case '-':
        return (n1 - n2).toString()
      case '*':
        return (n1 * n2).toString()
      case '/':
        return (n1 / n2).toString()
      default:
        return '0'
    }
  }

  return (
    <Grid container className = "calculator">
      <Grid  xs={12}>
        <TextField className = "display" value={currentOutput} />
      </Grid>

      <Grid xs={12}>
        <ButtonComponent className = "clear" value="CE" onClick={(handleButtonClick)} />
      </Grid>

      <Grid xs={2.5}>
        <ButtonComponent className={`arithmetic ${keypressed === '-' ? 'keypressed' : ''}`} value="-" variant="outlined" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="7" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="8" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="9" onClick={(handleButtonClick)} /> 
      </Grid>

      <Grid xs={2.5}>
        <ButtonComponent className={`arithmetic ${keypressed === '+' ? 'keypressed' : ''}`} value="+" variant="outlined" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="4" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="5" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="6" onClick={(handleButtonClick)} />
      </Grid>

      <Grid xs={2.5}>
        <Button className={`arithmetic ${keypressed === '/' ? 'keypressed' : ''}`} variant="outlined" onClick={() => handleButtonClick('/')}>÷</Button>
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="1" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="2" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="3" onClick={(handleButtonClick)} />
      </Grid>

      <Grid xs={2.5}>
        <Button className={`arithmetic ${keypressed === '*' ? 'keypressed' : ''}`} variant="outlined" onClick={() => handleButtonClick('*')}>&times;</Button>
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="0" onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "number" variant="outlined" value="." onClick={(handleButtonClick)} />
      </Grid>
      <Grid xs={2.5}>
        <ButtonComponent className = "equal" variant="outlined" value="=" onClick={(handleButtonClick)} />
      </Grid>
    </Grid>
  )
}

export default App