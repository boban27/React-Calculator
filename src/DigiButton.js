import { ACTION } from "./App"
export default function DigiButton ({dispatch,digit}){
    return <button onClick={()=> dispatch({type:ACTION.ADD_DIGIT,payload:{digit}})}>{digit}</button>


}