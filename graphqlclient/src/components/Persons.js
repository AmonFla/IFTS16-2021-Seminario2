import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { FIND_PERSON } from "../graphql"

const Persons = ({ persons }) => {
    const [getPerson, persona] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson= (name) => {
        getPerson({variables:{nameToSearch: name}})
    }

    useEffect(()=>{
        if(persona.data){
            setPerson(persona.data.findPerson)
        }
    },[persona.data])

    if(person){
        return(
            <div>
              <h2>{person.name}</h2>
              <div>{person.address.street} {person.address.city}</div>
              <div>{person.phone}</div>
              <button onClick={() => setPerson(null)}>close</button>
            </div>
          ) 
    }

    return (
      <div>
        <h2>Persons</h2>
        {persons.map(p =>
          <div key={p.name}>
            {p.name} {p.phone}
            <button onClick={()=>showPerson(p.name)}>Ver más</button>
          </div>  
        )}
      </div>
    )
  }

  export default Persons