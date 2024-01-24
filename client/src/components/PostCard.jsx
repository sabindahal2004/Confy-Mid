import React, { useContext, useState, useEffect } from 'react';
import '../stylesheets/PostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Actions from './Actions';
import moment from 'moment';
import { AuthContext } from '../App';

const PostCard = (props) => {
  const { auth } = useContext(AuthContext);

  // Initialize state with default values
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (props.post && props.post.user && props.post._id) {
    }
  }, [props.post]);

  if (!props.post || !props.post.user || !props.post._id) {
    return null;
  }

  const { user, _id, title, content, image, createdTime } = props.post;

  const isUserPost = auth._id === user._id;

  const handleHeartClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div className="post-card" id={_id}>
      <div className="post-card-header">
        <div className="user-info">
          <div className="user-avatar">{user.name.slice(0, 1)}</div>
          <div className="title">{title}</div>
        </div>
        <div className='action-dot-align'>
          <div className='actionDot'>
            {isUserPost && <Actions id={_id} />}
          </div>
        </div>
      </div>
      <img src={image} className="post-image" />
      <div className="post-content">
        <div className="timestamp">
          {moment(createdTime).fromNow()}
        </div>
        <p className="post-text">
          {content}
        </p>
        <button className={`heart-button ${isLiked ? 'liked' : ''}`} onClick={handleHeartClick}>
          <span role="img" aria-label="Heart"><FontAwesomeIcon icon={faHeart} /></span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
