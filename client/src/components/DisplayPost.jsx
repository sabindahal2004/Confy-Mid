import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const DisplayPost = () => {
  const [posts , setPosts] = useState([]);
  useEffect(()=>{
    const fetchBlogs = async ()=>{
      const res = await fetch("http://localhost:8000/api/blog/",{
        method:"GET",
        headers:{
          token:localStorage.getItem("token")
        }
      })
      const data = await res.json();
      if(res.ok){
        setPosts(data)
      }else{
        console.log(data);
      }
    }
  fetchBlogs()
  },[posts])
  return (
    <div className="display-post-container"> 
      {posts && posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default DisplayPost;
