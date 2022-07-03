import { useState } from 'react'
import './login.css'


function CourseForm (props) {
  const { onAdd } = props
  const [id, setid] = useState('')
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')

  

  const addUser = (evt) => {
    console.warn('called')
    onAdd({
      id,
      name,
      description
    })
  }

  return (
    <div className='user-form'>
      <div className="login__field">
        <input type='text' placeholder='id'className="login__input" onChange={(evt) => setid(evt.target.value)} />
      </div>
      <div className="screen__content">
        <input type='text' placeholder='name'className="login__input" onChange={(evt) => setname(evt.target.value)} />
      </div>
      <div className="screen__content">
      <input type='text' placeholder='description' className="login__input"onChange={(evt) => setdescription(evt.target.value)} />
    
      </div>
      <div className='add'>
        <input type='button'className="login__submit1" value='add' onClick={addUser} />
      </div>
    </div>
  )
}

export default CourseForm
