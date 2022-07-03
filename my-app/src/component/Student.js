import React, { Component, useRef, useState } from "react";
import { Button } from 'primereact/button';
import './login.css'
import User from "./Curs_form";
import Smiley from '../imagini/smiling-face.png'
import frown from '../imagini/frown.png'
import confusing from '../imagini/confusion.png'
import surprise from '../imagini/surprise.png'



function Student(props) {
  //luam profesorul dupa id prof si dupa preluam cursurile acelui prof pentru student
  // const [prof, setProf] = useState([])
  const [curs, setCurs] = useState([])
  const [cursCautat, setCursCautat] = useState([])
  const[tip, setTip]=useState([])//tip de emoji trimis
  //constanta pentru afisare div
  const [ok, setok] = useState([])
  const [feedback, setFeedback ] = useState([])
  //constante pentru inputurile date
  const codCurs = useRef();
  const codProf = useRef();
  //hardcodate
  const idT = 1;
  const id = 0;
  const gid = 2;
  const gstud = 5;

  
  const getCurs = async () => {
    //  getProf();
    fetch(`http://localhost:8080/api-teacher/courses/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Eroare!');
        }
      })
      .then((data) => {
        console.log(data)
        console.log('ok')
        setCurs(data);
      })
      .catch((e) => { })
  }
  function cauta() {
    console.log(codCurs.current.value)
    fetch(`http://localhost:8080/api-teacher/teachers/${codProf.current.value}/courses/${codCurs.current.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Eroare!');
        }
      })
      .then((data) => {
        console.log(data)
        console.log('ok')
        setCursCautat(data);
      })
      .catch((e) => { })
    setok(1);


  }
 
  const Feedback = (
    <div>
      <div>
        <button className="emoji"onClick={
        ()=>{
          addUser('happy')
          alert( '😃')
        }}>
        <img src={Smiley}></img>
        </button>
        <button className="emoji" onClick={
        ()=>{
          addUser('frown')
          alert('☹️')
        }}>
        <img src={frown}></img>
        </button>
        <button className="emoji" onClick={
        ()=>{
          addUser('surprise')
          alert('😮')
        }}>
        <img src={surprise}></img>
        </button>
        <button className="emoji" onClick={
        ()=>{
          addUser('confusing')
          alert('🤔')
        }}>
        <img src={confusing}></img>
        </button>
      </div>
    </div>
  )
  const addUser = async (type) => {
    await fetch(`http://localhost:8080/api-teacher/teachers/${codProf.current.value}/courses/${codCurs.current.value}/feedback`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       
        emoji: type
      })
    })
  
  }
  function setFeed() {
    setFeedback(1);
  }
  const Gasit = (
    <div className="login__submit2">
      <div className="space">
        <h2 className="active">Tip:  {cursCautat.name}  </h2>
        <h2 className="active"> Materie:  {cursCautat.description}  </h2>
      </div>

      <div >
        <button className="login__submit" onClick={setFeed}>Adauga feedback</button>
        {feedback == 1 ? Feedback : ""
        }
      </div>
    </div>
  )
  return (
    <div>
      <div className="login__field">
        Acceseaza un curs</div>
        <button className="btnLogOutTeacher" onClick={()=>{window.location.href ='http://localhost:3000/';}}>LogOut</button>
      <div>
        <div>
          <input className="login__input" type="text" ref={codCurs} placeholder="cod curs"></input>
          <input className="login__input" type="text" ref={codProf} placeholder="cod prof"></input>


        </div>
        {/* <button className="login__submit"onClick={getCurs}>Preia</button> */}
      </div>
      <div>
        <button className="login__submit1" onClick={cauta}>Cauta</button>
        {ok == 1 ? Gasit : ""
        }
      </div>
      


    </div>
  )
}
export default Student