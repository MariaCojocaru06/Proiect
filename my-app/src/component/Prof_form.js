function RegularProf(props){
    const {item}=props
    return(
        <div className='regular-user'>
            <form className="login">
        <div className="screen__content">
          {item.id}
        </div>
        <div className="screen__content">
          {item.firstName}
        </div>
        <div className="screen__content">
          {item.lastName}
        </div>
        </form>

        
      </div>


    )}
    export default RegularProf;