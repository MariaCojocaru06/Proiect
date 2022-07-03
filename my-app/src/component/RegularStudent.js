
import { useState } from 'react';
import './login.css'
import User from './Curs_form';
import Smiley from '../imagini/smiling-face.png'
import frown from '../imagini/frown.png'
import confusing from '../imagini/confusion.png'
import surprise from '../imagini/surprise.png'

function RegularUser(props) {
  const { item } = props
  const idC = item.id;
  const idT = item.teacherId;
  const [feedback, setfeedback] = useState([])
  const [ok, setok] = useState([])



  const getFeedback = () => {
    console.log(idC + " " + idT)
    fetch(`http://localhost:8080/api-teacher/teachers/${idT}/courses/${idC}/feedback`, {
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
        setfeedback(data);

      })
      .catch((e) => { })

    setok(1);


  }

  const ej = (
    <div>
      <div></div>
      <div>{feedback.map(e => e.emoji == "happy" ? <img src={Smiley}></img> :
        e.emoji == "frown" ? <img src={frown}></img> :
          e.emoji == "surprise" ? <img src={surprise}></img> :
            e.emoji == "confusing" ? <img src={confusing}></img> : +"  ")
            }

      </div>
    </div>
  )
  return (
    <div className='regular-user'>
      <div className="login">
        <div className="screen__content">
          {item.id}
        </div>
        <div className="screen__content">
          {item.name}
        </div>
        <div className="screen__content">
          {item.description}
        </div>
        <div>
          <button className='login__submit' onClick={getFeedback}>Feedback</button>
          {ok == 1 ? ej : ""
          
          }
        </div>

      </div>



    </div>


  )

}
export default RegularUser