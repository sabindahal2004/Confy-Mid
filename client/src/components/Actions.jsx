import React, { useState } from 'react';
import '../stylesheets/Actions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

const Actions = ({ id }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigator = useNavigate();
  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleUpdate = () => {
    console.log(id);
    setMenuVisible(false);
    navigator("/update/"+id)
  };

  const handleDelete = async() => {
    console.log(id); 
    setMenuVisible(false);
    const res = await fetch("http://localhost:8000/api/blog/delete/"+id,{
      method:"DELETE",
      headers:{
        token:localStorage.getItem("token")
      }
    })
    const data = await res.json();
    if(res.ok){
      alert("Post is deleted",);
    }else{
      console.log(data);
    }
  };

  return (
    <div className="actions-container">
      <div className="menu-icon" onClick={handleToggleMenu}>
      <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      {menuVisible && (
        <div className="menu">
          <div className="menu-item" onClick={handleUpdate}>
            Update
          </div>
          <div className="menu-item" onClick={handleDelete}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default Actions;
