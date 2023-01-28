import React, { useReducer } from 'react'
import "./style.css"
import DigiButton from './DigiButton'
import OperationButton from './OperationButton'

export const ACTION={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'chose-operation',
  CLEAR:'CLEAR',
  DELETE_DIGIT: 'delete',
  EVALUETE:'evaluete'


}

function reducer (state,{type,payload}){
  switch(type){
    case ACTION.ADD_DIGIT:
      if (state.overwrite) {
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
        
      }
      if(payload.digit === '0'&& state.currentOperand === '0'){return state}
      if(payload.digit === '.'&& state.currentOperand.includes('.')){return state}
    return{
      ...state,
      currentOperand:`${state.currentOperand || ""}${payload.digit}`
    }
    case ACTION.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }
      if(state.previousOperand == null){
        return{
          ...state,
          operation:payload.operation,
          previousOperand:state.currentOperand,
          currentOperand:null,
        }
      }
     if(state.currentOperand == null){
        return{
          ...state,
          operation:payload.operation
        }
      }
      return{
        ...state,
        previousOperand:evaluete(state),
        operation:payload.operation,
        currentOperand:null,
      }
    case ACTION.CLEAR:
      return{}
    case ACTION.DELETE_DIGIT:
      if (state.overwrite) {
      return{
        ...state,
        overwrite:false,
        currentOperand:null,
      }
        
      }
      if(state.currentOperand == null) return state
      if (state.currentOperand.lenght === 1) {
        return{...state,  currentOperand: null }
        
      }
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
    case ACTION.EVALUETE:
      if (state.operation == null ||
         state.currentOperand == null ||
         state.previousOperand == null) {
        
        return state
        
      }
      return{
        ...state,
        overwrite:true,
        previousOperand: null,
        operation:null,
        currentOperand:evaluete(state),
      }
  
  } 

}
function evaluete({currentOperand,previousOperand,operation}){
  const curent = parseFloat(currentOperand )
  const prev = parseFloat(previousOperand)
  if (isNaN(prev) || isNaN(curent)) {
    return ""
    
  } 
  let computaion = ""
  switch(operation){
    case "+":
      computaion = prev + curent
      break
      case "-":
      computaion = prev - curent
      break
      
      case "*":
        computaion = prev * curent
        break

        case "/":
          computaion = prev / curent
          break

  }
  return computaion.toString()
}
const INTITIGER_FORMAT = new Intl.NumberFormat("en-us",{
  maximumFractionDigits : 0,
})  
function formatOparend(opernad){
  if(opernad == null)return
  const[intiger,decimal]= opernad.split('.')
  if(decimal == null) return INTITIGER_FORMAT.format(intiger)
  return`${INTITIGER_FORMAT.format(intiger)}${decimal}`
}

function App() {
  const[{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer,{})
  return (
    <div className='calculator-grid'>
    <div className='output' >
        <div className='previous-operand'>{formatOparend(previousOperand)}{operation}</div>
        <div className='current-operand'> {formatOparend(currentOperand)}</div>
    </div>
    <button className='span-two' onClick={() =>dispatch({type:ACTION.CLEAR})}>AC</button>
    <button onClick={() =>dispatch({type:ACTION.DELETE_DIGIT})}>DEL</button>
    <OperationButton operation="+" dispatch={dispatch}/>
    <DigiButton digit="1" dispatch={dispatch}/>    
    <DigiButton digit="2" dispatch={dispatch}/>
    <DigiButton digit="3" dispatch={dispatch}/>
    <OperationButton operation="*" dispatch={dispatch}/>
     <DigiButton digit="4" dispatch={dispatch}/>
    <DigiButton digit="5" dispatch={dispatch}/>
    <DigiButton digit="6" dispatch={dispatch}/>
    <OperationButton operation="-" dispatch={dispatch}/>
    <DigiButton digit="7" dispatch={dispatch}/>
    <DigiButton digit="8" dispatch={dispatch}/>
    <DigiButton digit="9" dispatch={dispatch}/>
    <OperationButton operation="/" dispatch={dispatch}/>
    <DigiButton digit="." dispatch={dispatch}/>
    <DigiButton digit="0" dispatch={dispatch}/>
    <button className='span-two'onClick={()=>dispatch({type:ACTION.EVALUETE})}>=</button>







    


    </div>
  )
}

export default App