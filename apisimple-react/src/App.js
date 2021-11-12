import PostLista from "./components/PostLista"
import PostAdd from "./components/PostForm";
import PostEdit from "./components/PostEdit";

import { useEffect, useState } from 'react';
import postServ from './services/post'

function App() {
  const [blogs, setBlogs] = useState([])
  const [editPost, setEditPost] = useState(null)

  useEffect( () => {
    postServ.getAllPost().then(blogs => setBlogs(blogs.data))
  },[])

   return (
    <div className="App">
      <h2>Blog de prueba</h2>
      {editPost
        ?<PostEdit 
          editPost={editPost} 
          blogs={blogs} 
          setBlogs={setBlogs} 
          edit={()=>setEditPost(null)} />
        :<PostAdd blogs={blogs} setBlogs={setBlogs}/>
      }
      <PostLista blogs={blogs} setBlogs={setBlogs} setEditPost={setEditPost}/>
    </div>
  );
}

export default App;
