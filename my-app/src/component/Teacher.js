
import React, { Component, useRef, useState } from "react";
import { Button } from 'primereact/button';
import './login.css'
import { useEffect } from 'react'
import User from "./Curs_form";
import CourseForm from "./Course_add";


function Teacher() {

  const [users, setUsers] = useState([])
  const [prof, setProf] = useState([])
  const [feedback, setfeedback] = useState([])

  //  let unprof =  localStorage.getItem('prof');
  // setProf(unprof)
  // // const id=3;
  // let name="";

  const getProf = async () => {
    let id = localStorage.getItem('prof');
    const response = await fetch(`http://localhost:8080/api-teacher/teachers/${id}`)
    const data = await response.json()
    setProf(data)
    // console.log(data);

    // name=data.firstName+" "+ data.lastName;
    // console.log(name)
  }

  const getUsers = async () => {
    let id = localStorage.getItem('prof');
    const response = await fetch(`http://localhost:8080/api-teacher/teachers/${id}/courses`)
    const data = await response.json()
    setUsers(data)
  }

  const addUser = async (user) => {
    let id = localStorage.getItem('prof');
    await fetch(`http://localhost:8080/api-teacher/teachers/${id}/courses`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    getUsers()
  }

  useEffect(() => {
    getProf()
    getUsers()
  }, [])
  // const addCr=()=>{
  //   <CourseForm onAdd={addUser} />
  // }

  return (
    <div className='user-list'>
      <div>
        <h1 id="bun">Bine ai venit!</h1>
        <h2 id="prof">Profesor {prof.lastName} {prof.firstName}</h2>
        <button className="btnLogOutTeacher" onClick={() => { window.location.href = 'http://localhost:3000/'; }}>LogOut</button>
      </div>

      {/* <button className="btnLogOutTeacher" onClick={addCr}>ADD</button> */}

      <CourseForm onAdd={addUser} />
      <div>
        {
          users.map(e => <User key={e.id} item={e} />)



        }

      </div>


    </div>
  )


}
export default Teacher;