import React, { useState } from "react";
import Login from "./Login";
import { Button } from 'primereact/button';
import Student from "./Student";
import Teacher from "./Teacher";

function App() {
  const[isStud, setIsStud]=useState(0);

const showLogin = (
  <Login isStud={isStud}></Login>
)
//onClick={setIsStud(2)}
//onClick={setIsStud(1)}

function setareStud(){
  setIsStud(1)
}

function setareProf(){
  setIsStud(2)
}
const showAskPage =(
  <div className="App">
      
      <div className=" button-demo">
                   
                    <div className="login">
                    <div id="logare">Alege tipul logarii</div>
                    <Button onClick={setareProf} label="Profesor" className="log__submit" />
                    <Button  onClick={setareStud} label="Student" className="log__submit"/>
                    </div>
                </div>
                </div>      
)
return (
     
   <div>
     { isStud==0   ? showAskPage : 
         showLogin
          }
   </div>
    
  )

}
// function App () {
//   return (
//     <div>
     
//       <Student />
//     </div>
//   )
// }

export default App;
