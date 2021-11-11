const Boton = (props)=>{
    return(
      <div> 
        <button onClick={()=>props.onclick()}>{props.title}</button> 
      </div>
    )
  }

export default Boton