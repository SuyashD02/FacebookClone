import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";

import "./home.css";
//import { BrowserRouter, Route, Routes } from "react-router-dom";

function HomePage() {
  const boxes = [1, 2, 3, 4];
  const [searchQuery, setSearchQuery] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const bearerToken = localStorage.getItem("token");
  const [errorPost, setErrorPost] = useState("");
  const [comments, setComments] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [commentCount, setCommentCount] = useState({});
  const [Click, SetClick] = useState(false);

  const handlepaperclick = () => {
    alert("paper is clickd!!!!");
  };
  const handleSearch = () => {
    alert(`Search for:${searchQuery}`);
  };
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/facebook/post",
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          projectID: "f104bi07c490",
        },
      }
    );
    const r = await response.json();
    console.log(r);
    setApiData(r["data"]);
  };

  const style = {
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 320,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  async function fetchCreatedPost() {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/facebook/post/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          projectID: "f104bi07c490",
        },
      }
    );
  }

  const handleCreatePost = async () => {
    console.log("Function is called");
    try {
      const formData = new FormData();
      formData.append("content", postContent);
      if (postImage) {
        formData.append("images", postImage);
      }

      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/facebook/post/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "f104bi07c490",
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Succecfully Posted");
        const data = await response.json();

        console.log("Post Data:", data);
        fetchData();
      } else {
        const errorData = await response.json();
        setErrorPost(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorPost("An error occurred. Please try again.");
    }
  };
  const handleOpenImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
  };

  const handleLikePost = async (postId) => {
    console.log("Like Function Called");
    const isLiked = Click;
    SetClick(!isLiked);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/like/${postId}`,
        {
          method: isLiked ? "POST" : "DELETE",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "f104bi07c490",
          },
        }
      );
      if (response.ok) {
        console.log(isLiked ? "Like is clicked" : "Unlike is clicked");
        setLikeCounts((prevCounts) => ({
          ...prevCounts,
          [postId]: isLiked ? prevCounts[postId] + 1 : prevCounts[postId] - 1,
        }));
      } else {
        const errorData = await response.json();
        console.error("Error while liking the post:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const counts = {};
    if (apiData) {
      apiData.forEach((post) => {
        counts[post._id] = post.likeCount;
      });
      setLikeCounts(counts);
    }
  }, [apiData]);

  const handleFetchComments = async (postId) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post/${postId}/comments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "f104bi07c490",
          },
        }
      );
      if (response.ok) {
        console.log("Comment is click");
        const data = await response.json();
        setComments(data.comments);
        console.log(data);
        
        
      } else {
        const errorData = await response.json();
        console.error("Error while fetching comments:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //for Update Comment

  const createCommentForPost = async (postId, content) => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/comment/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "f104bi07c490",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (response.ok) {
        console.log("Comment created successfully");
        // You may want to update the UI to show the new comment immediately
        // For example, you can add the new comment to the `comments` state.
        const data = await response.json();
        setComments([...comments, data.comment]);
      } else {
        const errorData = await response.json();
        console.error("Error while creating a comment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleComment = (e) => {
    setComments(e.target.value);
  };

  const imageUrls = [
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1147.jpg",
  ];

  return (
    <div>
      {/* For Status */}

      <section className="gridBox">
        <Grid container justifyContent="center" spacing={2}>
          {boxes.map((value) => (
            <Grid key={value} item className="gridItem">
              <Paper className="paper" onClick={handlepaperclick}>
                <img src={imageUrls[0]} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* For Create Post */}

      <section className="searchSection">
        <Box className="searchBox">
          <div className="searchBar">
            <Avatar />
            <InputBase
              className="searchInputpost"
              placeholder={`What's on your mind,`}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <Divider id="divider" />
          <div className="filterButtons">
            <Button id="buttonFilter">Live</Button>
            <Button
              id="buttonFilter"
              onClick={handleOpen}
              startIcon={<AddAPhotoRoundedIcon />}
            >
              {" "}
              Photo/video
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <section className="createPostHeader">
                  <Typography variant="h6" component="h2">
                    Create a Post
                  </Typography>
                  <Divider id="createPostDivider" />
                </section>
                <section className="createPostAccount">
                  <Avatar />
                  <h3>name</h3>
                </section>
                <section>
                  <textarea
                    id="createPostBio"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  >
                    What's on your mind, name?
                  </textarea>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="imageInput"
                    onChange={handleImageChange}
                  />
                </section>
                <section className="createPostBar">
                  <h3>Add to your post</h3>
                  <CollectionsIcon onClick={handleOpenImage} />
                  <PlaceIcon />
                </section>
                <section>
                  <button className="createPostBtn" onClick={handleCreatePost}>
                    Post
                  </button>
                </section>
              </Box>
            </Modal>
            <Button id="buttonFilter" startIcon={<MoodRoundedIcon />}>
              {" "}
              Feeling/activity
            </Button>
          </div>
        </Box>
      </section>

      {/* For Post */}

      <section className="postSection">
        {apiData &&
          apiData.map((post) => (
            <Box className="postBox" key={post._id}>
              <div className="accountPostBox">
                {/*<Avatar>{post.author.profileImage}</Avatar>*/}
                <Avatar alt={post.author.name} src={post.author.profileImage} />
                <Typography>{post.author.name}</Typography>
              </div>
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
                  <Typography>{likeCounts[post._id]}</Typography>
                </div>
                <div className="countComment">
                  <CommentOutlinedIcon />

                  <Typography>{post.commentCount}</Typography>
                </div>
              </section>
              <Divider />

              <section className="postButtons">
                <Button
                  onClick={() => handleLikePost(post._id)}
                  startIcon={<ThumbUpOutlinedIcon />}
                >
                  Like
                </Button>
                <Button
                  onClick={() => handleFetchComments(post._id)}
                  startIcon={<CommentOutlinedIcon />}
                >
                  Comment
                </Button>
                <Button>Send</Button>
              </section>

              <Divider />

              <section className="PostComment">
                <div>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comments}
                    onChange={handleComment}
                  />
                  <button
                    onClick={() => createCommentForPost(post._id, comments)}
                  >
                    <SendIcon />
                  </button>
                </div>
                <div className="commentsSection">
                  <h3>its Comment</h3>
                  
                 
                </div>
              </section>
            </Box>
          ))}
      </section>
    </div>
  );
}
export default HomePage;
