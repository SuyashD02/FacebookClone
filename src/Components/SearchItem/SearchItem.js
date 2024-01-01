import React,{useState,useEffect} from "react";
import './search.css';
import { Box, IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Divider from "@mui/material/Divider";

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from "../Context/Context";
import Navbar from "../Nav/Navbar";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { userMap } from "../Datastoar";
import { Link } from "react-router-dom";
function SearchComponent(){
  const{setPostuserId} =useAuth();
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState("");
  const loggedInUserId = localStorage.getItem("userId");
  const bearerToken = localStorage.getItem("token");
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [likeCounts, setLikeCounts] = useState({});

  const {apiSearch}=useAuth();

  // For Display Comment

  const handleFetchComments = async (postId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post/${postId}/comments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "7n1a3lrketcp",
          },
        }
      );
      if (response.ok) {
        console.log("Comment is click");
        const data = await response.json();
        // console.log(data);
        const commentsWithUsernames = data.data.map((comment) => ({
          ...comment,
          authorName: userMap.get(comment.author)?.name,
        }));
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: commentsWithUsernames,
        }));
      } else {
        const errorData = await response.json();
        console.error("Error while fetching comments:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //for Create Comment

  const createCommentForPost = async (postId) => {
    console.log("create comment function is called ");
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "7n1a3lrketcp",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: commentInput }),
        }
      );

      if (response.ok) {
        console.log("Comment created successfully");
        const data = await response.json();
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: [...prevComments[postId], data.data.content],
        }));
        setCommentInput("");
        handleFetchComments(postId);
      } else {
        const errorData = await response.json();
        console.error("Error while creating a comment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleComment = (e) => {
    setCommentInput(e.target.value);
  };

  //for Update Comment

  const updateCommentForPost = async (postId, commentId, updatedComment) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "7n1a3lrketcp",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: updatedComment }),
        }
      );

      if (response.ok) {
        console.log("Comment updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Error while updating a comment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditComment = (postId, commentId, commentContent) => {
    setEditedComment(commentContent);
    setEditedCommentId(commentId);
  };
  const handleSaveEditedComment = async (postId) => {
    await updateCommentForPost(postId, editedCommentId, editedComment);
    setEditedComment("");
    setEditedCommentId("");

    handleFetchComments(postId);
  };
  const isEditingComment = (commentId) => commentId === editedCommentId;

  // For Delete comment

  const deleteCommentForPost = async (postId, commentId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "7n1a3lrketcp",
          },
        }
      );

      if (response.ok) {
        console.log("Comment deleted successfully");
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: prevComments[postId].filter(
            (comment) => comment._id !== commentId
          ),
        }));
      } else {
        const errorData = await response.json();
        console.error("Error while deleting a comment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const counts = {};
    const commentsData = {};
    // const fetchUserInformation = async (userId) => {
    //   const response = await fetch(
    //     `https://academics.newtonschool.co/api/v1/user/${userId}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${bearerToken}`,
    //         projectID: "7n1a3lrketcp",
    //       },
    //     }
    //   );
  
    //   if (response.ok) {
    //     const userData = await response.json();
    //     userMap.set(userId, userData.data);
    //   } else {
    //     console.error("Error while fetching user information");
    //   }
    // };
    if (apiSearch) {
      apiSearch.forEach((post) => {
        counts[post._id] = post.likeCount;
        commentsData[post._id] = [];
        handleFetchComments(post._id);
        // if (post.comments) {
        //   post.comments.forEach((comment) => {
        //     fetchUserInformation(comment.author);
        //   });
        // }
      });
      setComments(commentsData);
    }
  }, [apiSearch]);

    return(
        <div>
          <Navbar/>
            <section className="postSection">
    {apiSearch &&
          apiSearch.map((post) => (
            <Box className="postBox" key={post._id}>
             <Link className="userProfileName" to="/userprofile">
              <div onClick={()=>{setPostuserId(post.author._id)}} className="accountPostBox">
                {/*<Avatar>{post.author.profileImage}</Avatar>*/}
                
                <Avatar alt={post.author.name} src={post.author.profileImage} />
                
                <Typography>{post.author.name}</Typography>
              </div>
              </Link>
              <div className="captionForPost">
                <Typography id="captionPost">{post.content}</Typography>
              </div>
              <section className="imgPostBox">
                <img
                  src={post.channel.image}
                  //src={"https://img.freepik.com/free-photo/maldives-island_74190-478.jpg?w=996&t=st=1696610601~exp=1696611201~hmac=b604347e0b051b603ab3ebd409486633c249828ee4da57b9e2d786c4d16dcd2e"}
                  className="imgPost"
                  alt="Image of post"
                />
              </section>
              <section className="countLikeComment">
                <div className="countLike">
                  <ThumbUpOutlinedIcon />
                  <Typography>{post.likeCounts}</Typography>
                 
                </div>
                <div className="countComment">
                  <CommentOutlinedIcon />

                  <Typography>{post.commentCount}</Typography>
                </div>
              </section>
              <Divider id="likeDevider"/>

              <section className="postButtons">
                <Button
                  startIcon={<ThumbUpOutlinedIcon />}
                >
                  Like
                </Button>
                <Button
                  // onClick={() => handleFetchComments(post._id)}
                  startIcon={<CommentOutlinedIcon />}
                >
                  Comment
                </Button>
               
              </section>

              <Divider />

              <section className="PostComment">
                <div className="commentInputDiv">
                  <Avatar sx={{ width: 35, height: 35 }}></Avatar>
                  <input
                    type="text"
                    id="inputBoxComment"
                    placeholder="Write a comment..."
                    value={commentInput}
                    onChange={handleComment}
                  />
                  <button onClick={() => createCommentForPost(post._id)}>
                    <SendIcon />
                  </button>
                </div>
                <div className="commentsSection">
                  <div className="commentData">
                    <h3 id="headingComment">Comment</h3>
                    {comments[post._id] &&
                      comments[post._id].map((comment, index) => (
                        
                        <div key={index} className="comment">
                          
                          <div className="CommentAuthor">
                          <Avatar sx={{ width: 30, height: 30 }} src={userMap.get(comment.author)?.photo}></Avatar>
                          <h3>{comment.authorName}</h3>
                          {comment.author === loggedInUserId && (
                          <div className="editCommetSection">
                            <EditIcon
                              className="editIconComment"
                              onClick={() =>
                                handleEditComment(
                                  post._id,
                                  comment._id,
                                  comment.content
                                )
                              }
                            ></EditIcon>
                            <DeleteIcon
                              className="deleteIconComment"
                              onClick={() =>
                                deleteCommentForPost(post._id, comment._id)
                              }
                            ></DeleteIcon>
                          </div>)}
                          </div>
                         
                          {isEditingComment(comment._id) ? ( // Check if the comment is being edited
                            <div className="editCommentDiv">
                              <input
                                type="text"
                                id="inputBoxCommentEdit"
                                placeholder="Edit your comment..."
                                value={editedComment}
                                onChange={(e) =>
                                  setEditedComment(e.target.value)
                                }
                              />
                              <button
                                className="editCommentBtn"
                                onClick={() =>
                                  handleSaveEditedComment(post._id)
                                }
                              >
                                <SendIcon />
                              </button>
                            </div>
                          ) : (
                            <h3 className="commentH3">{comment.content}</h3>
                          )}
                          
                        </div>
                      ))}
                  </div>
                </div>
              </section>
            </Box>
          ))}
    </section>
   
        </div>
    )
}
export default SearchComponent;