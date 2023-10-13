import React, { useState } from 'react';

function PostComponent({ postContent, timestamp, author, likes, comments }) {
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState(comments);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...postComments, newComment];
      setPostComments(updatedComments);
      setNewComment('');
    }
  };

  return (
    <div className="post">
      <div className="post-content">
        <p>{postContent}</p>
      </div>
      <div className="post-details">
        <span className="timestamp">{timestamp}</span>
        <span className="author">{author}</span>
      </div>
      <div className="interaction-options">
        <button onClick={handleLikeClick} className={liked ? 'liked' : ''}>
          Like {liked && '✔'}
        </button>
        <button>Comment</button>
        <button>Share</button>
      </div>
      <div className="comments">
        {postComments.map((comment, index) => (
          <div key={index} className="comment">
            {comment}
          </div>
        ))}
      </div>
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
    </div>
  );
}

export default PostComponent;
