import RegularUser from "./RegularStudent";

function User (props) {
    const { item } = props
  
    return (
      <div className='user'>
        {
          
              <RegularUser item={item} />
              
            
        }
      </div>
    )
  }
  
  export default User