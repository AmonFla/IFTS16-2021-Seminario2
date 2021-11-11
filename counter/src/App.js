import { useState } from "react"
import Header from "./components/Header"
import Boton from "./components/Botones"


const App = () => {
  const [counter, setCounter] = useState(0)
 
  return (
    <div>
      <Header counter={counter}/>
      <Boton
         title="UP"
        onclick={() => setCounter(counter+1)} 
        />
      {counter > 0?
        <Boton 
          title="DOWN"
          onclick={() => setCounter(counter-1)} 
          />
        : <Boton 
            title="DOWN"  
          />}  
    </div>
  );
}

export default App;
