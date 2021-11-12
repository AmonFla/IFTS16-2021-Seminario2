import axios from "axios"

const baseUrl = 'http://127.0.0.1:5000/posts'

const getAllPost = async () => await axios.get(baseUrl);

const deletePost = async (id) => await axios.delete(`${baseUrl}/${id}`);

const savePost = async (name, content) =>{
    const blog = {
        name,
        content,
        categoryCatId: 1,
        tag: [1,2]
    }
    
    const resp = await axios.post(baseUrl,blog)
    return resp.data
} 

const updatePost = async (name, content, blog) => {
    const editedBlog = {...blog, name, content}
    await axios.put(`${baseUrl}/${blog.id}`, editedBlog)
    return editedBlog
}


export default  {getAllPost, deletePost, savePost, updatePost}