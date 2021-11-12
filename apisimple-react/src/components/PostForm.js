import { useState } from "react"
import postServ from '../services/post'


const PostAdd = (props) => {
//const PostAdd = ({blogs, setBlogs}) => {
    const [titulo, setTitulo] = useState('')
    const [contenido, setContenido] = useState('')

    const enviarDatos = async (event) => {
        event.preventDefault()
        const newBlog = await postServ.savePost(titulo, contenido)
        props.setBlogs(props.blogs.concat(newBlog))
        setTitulo('')
        setContenido('')
    }
    
    return (        
        <form onSubmit={enviarDatos} >
            titulo <input type="text" 
                        value={titulo} 
                        onChange={e => setTitulo(e.target.value)}
                    /><br />
            contenido<input type="text" 
                        value={contenido} 
                        onChange={e => setContenido(e.target.value)}
                    /><br />
            <button type="submit">Guardar</button>
        </form>
    )
}

export default PostAdd