import postServ from '../services/post'

const PostLista = ({blogs,setBlogs,setEditPost})=>{
   
    const deletePost = (id) => {
        postServ.deletePost(id).then(()=>{
          setBlogs(blogs.filter(b=> b.id !== id))
        }).catch((error) => console.log('algo paso',error.message))
    }

    return(
        <>
            <ul>
                {blogs.map( b => <li key={b.id} >{b.name}  -   {b.createdAt}
                                    <button  onClick={()=>deletePost(b.id)} >Borrar</button> 
                                    <button  onClick={()=>setEditPost(b)}> Editar</button></li>)}
            </ul>
        </>

    )
}

export default PostLista