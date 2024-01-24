import React ,{ useState } from 'react'
import '../stylesheets/CreatePost.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigator = useNavigate();

  const [blog, setBlog] = useState({title:"",image:"",content:""});
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value; 
    setBlog({...blog, [name]: value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(blog);
    const res = await fetch("http://localhost:8000/api/blog/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        token:localStorage.getItem("token")
      },
      body:JSON.stringify(blog)
    })
    const data = await res.json();
    if(res.ok){
      console.log(data);
      alert("Confession Post Created");
      setBlog({title:"",content:"",image:""});
      navigator('/');
    }
    else{
      alert("Title and content are required.")
      console.log(data);
    }
  }
  return (
    <div className="align-center">
      <div className="main-container">
        <div className="top-text">Create Post</div>
        <form >
          <div className="data-elem">
            <label>Title</label>
            <input type="text" name='title' required  onChange={handleChange} value={blog.title}/>
          </div>
          <div className="data-elem">
            <label>Image Url</label>
            <input type="text" name='image' onChange={handleChange} value={blog.image}/>
          </div>
          <div className="data-elem">
            <label>Content</label>
            <textarea type="text" name='content' cols="4" required onChange={handleChange} value={blog.content}/>
          </div>
          <div className="outer-btn">
            <div className="inner-btn"></div>
            <button type="submit" onClick={handleSubmit}>Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost