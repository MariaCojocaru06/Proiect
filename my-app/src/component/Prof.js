import RegularProf from "./Prof_form"


function Prof (props) {
    const { item } = props
  
    return (
      <div className='user'>
        {
          
              <RegularProf item={item} />
              
            
        }
      </div>
    )
  }
  
  export default Prof