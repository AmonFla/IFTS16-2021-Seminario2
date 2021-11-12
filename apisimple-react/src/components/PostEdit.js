import { useState } from "react"
import postServ from '../services/post'


const PostEdit = ({blogs, setBlogs, editPost, edit}) => { 
    const [titulo, setTitulo] = useState(editPost.name)
    const [contenido, setContenido] = useState(editPost.content)

    const enviarDatos = async (event) => {
        event.preventDefault()
        const editedBlog = await postServ.updatePost(titulo, contenido, editPost)
        setBlogs(blogs.map(b => b.id === editedBlog.id ? editedBlog: b))
        edit()
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
            <button type="submit">Editar</button>
            <button onClick={()=>edit()}>cancelar</button>
        </form>
    )
}

export default PostEdit