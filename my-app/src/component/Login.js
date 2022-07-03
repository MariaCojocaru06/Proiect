
import React, { Component, useRef, useState ,useEffect} from "react";
import { Button } from 'primereact/button';
// import './login.css'
import Student from "./Student";
import Teacher from "./Teacher";


function Login(props) {
  const passRef = useRef();
  const emailRef = useRef();
  const [prof, setProf] = useState();
  const [user, setUser]=useState();
const [eProf,setEProf] = useState(false);
const [eStud,setEStud] = useState(false);


useEffect(() => {
  const prof = localStorage.getItem('prof');
  if (prof) {
    try {
     setProf(prof)
    } catch (e) {
      localStorage.removeItem('prof');
    }
  }
}, []);


  const showStud=(
    <Student/>
  )

  const showTeacher=(
    <Teacher/>
  )

  const onLoginProf = () => {
    fetch(`http://localhost:8080/user/teacher/${emailRef.current.value}/${passRef.current.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //   body:{

      //   }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setEProf(true);
      localStorage.setItem('prof',data.id)
    })
      .catch((e) => { })
      //showTeacher();
  };
  

  // useEffect(onLoginProf,[] );
  const onLoginStud = () => {
    fetch(`http://localhost:8080/user/student/${emailRef.current.value}/${passRef.current.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //   body:{

      //   }
    })
    .then((res) => res.json())
    .then((data) => {
      setUser(data)
      setEStud(true)
     
      // setEStud(true);
    }).then( console.log(user))
      .catch((e) => { })
  };

  const studForm = (
    // <div className="login">
    //      <h1>LOGARE</h1>
    //     <h3>STRUDENT</h3>
    //     <div>
    //         <h5>Username</h5>
    //         <input type="text" ref={emailRef} placeholder="Enter username" name="username"></input>
    //     </div>
    //     <div>
    //         <h5>Password</h5>
    //         <input type="text" ref={passRef} placeholder="Enter password" name="username"></input>
    //     </div>
    //     <div>
    //         <button onClick={onLoginStud}>Login</button>
    //     </div>
    // </div>
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <div className="login1">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" ref={emailRef} className="login__input" placeholder="User name / Email"></input>

            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" ref={passRef} className="login__input" placeholder="Password"></input>


            </div>
            <div>
              <button className=" login__submit" onClick={onLoginStud }>Login</button>
              <button className="btnHomeTeacher" onClick={()=>{window.location.href ='http://localhost:3000/';}}>INAPOI</button>
            </div>
            {/* <button className="button login__submit" onClick={onLoginStud}>
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button> */}

          </div>
        </div>
      </div>

    </div>
  );
  const profPage = (
 <Teacher></Teacher> 
  )
  const studPage = (
    <Student stud={user}></Student> 
     )
  const profForm = (
    <div className="container">
    <div className="screen">
      <div className="screen__content">
        <div className="login1">
          <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input type="text" ref={emailRef} className="login__input" placeholder="User name / Email"></input>
          </div>
          <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input type="password" ref={passRef} className="login__input" placeholder="Password"></input>
          </div>
          <div>
            <button className=" login__submit" onClick={onLoginProf}>Login</button>
            <button className="btnHomeTeacher" onClick={()=>{window.location.href ='http://localhost:3000/';}}>INAPOI</button>
          </div>
          {/* <button className="button login__submit" onClick={onLoginStud}>
        <span className="button__text">Log In Now</span>
        <i className="button__icon fas fa-chevron-right"></i>
      </button> */}
        </div>
      </div>
    </div>

  </div>
    // <div className="login">
    //   <h1>LOGARE</h1>
    //   <h3>PROFESOR</h3>
    //   <div>
    //     <h5>Username</h5>
    //     <input type="text" ref={emailRef} placeholder="Enter username" name="username"></input>
    //   </div>
    //   <div>
    //     <h5>Password</h5>
    //     <input type="text" ref={passRef} placeholder="Enter password" name="username"></input>
    //   </div>
    //   <div>
    //     <button onClick={onLoginProf}>Login</button>
    //   </div>
    // </div>
  );
  return (
    <div>
      {
      props.isStud == 1 &&  eProf ==false &&  eStud ==false? studForm :
        props.isStud == 2  &&  eProf ==false&&  eStud ==false? profForm :
          props.isStud == 0 &&  eProf ==false &&  eStud ==false? 'none' : 
          eProf ==true  ? profPage : 
           eStud == true? studPage:'n'
      }
    </div>
  )

}
export default Login;
