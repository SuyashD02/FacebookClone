import React, { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import Avatar from "@mui/material/Avatar";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from '@mui/icons-material/Email';

import { Link } from "react-router-dom";
import { userMap } from "../Datastoar";
import { useAuth } from "../Context/Context";
import { Box } from "@mui/material";
import "../MyProfile/myProfile.css";

function UserProfile() {
  const { setPostuserId } = useAuth();
  const [userProfile, setUserProfile] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const bearerToken = localStorage.getItem("token");
  const { postUserId } = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/user/${postUserId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "f104bi07c490",
          },
        }
      );
      const data = await response.json();
      setUserProfile(data.data);
      console.log(data);
      setUserName(data.data.name);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post?search={"author.name":"${userName}"}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            projectID: "f104bi07c490",
          },
        }
      );
      const postData = await response.json();
      setUserPosts(postData.data);
      console.log("User posts data", postData);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [userName]);

  const handleNavClick = () => {
    setUserProfile("");
    setUserName("");
  };

  return (
    <div>
      <Navbar onNavClick={handleNavClick} />
      <div className="userSection">
        <Box>
          <section className="myProfileContent">
            <section className="profileHeader">
              <section className="profileImage">
                <img
                  id="profileimg"
                  src={userProfile?.profileImage}
                  alt="user Image"
                />
              </section>
              <section className="profileAvtar">
                <div className="profileAvtarDiv">
                  <section className="avtarProfile">
                    <Avatar
                      sx={{ width: 135, height: 135 }}
                      src={userProfile?.profileImage}
                    ></Avatar>
                  </section>

                  <section>
                    <h3 className="userProfileName">{userProfile?.name}</h3>
                  </section>
                  <section>
                    <button className="followUser">Follow</button>
                  </section>
                </div>
              </section>
            </section>
            <section className="userDataSection">
              <section className="boxIntroUser">
                <div className="wrapAllIntro">
                <div className="intorDiv">
                <div className="headerIntro">
                <h3 className="h3Headers">Intro</h3>
                <hr></hr>
                </div>
                </div>
                <div className="contactUser">
                  <h3 className="h3Headers">Contact</h3>
                  <p className="pTagIntro"><EmailIcon/>Email: {userProfile?.email}</p>
                </div>
                <div className="educationSection">
                  <h3 className="h3Headers">Education</h3>
                  {userProfile?.education &&
                    userProfile.education.map((edu, index) => (
                      <div className="introEducation" key={index}>
                        <h3 className="headingEducation">
                          <img
                            className="imgEducation"
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/H804hWf2rBh.png"
                          />
                          School:{edu.schoolName}
                        </h3>
                        <p className="degreeEduction">Degree: {edu.degree}</p>
                        <p className="endEducation">End Date:{edu.endDate}</p>
                      </div>
                    ))}
                </div>
                <div>
                  <h3>Address</h3>
                  <div className="addreesUser">
                    {userProfile?.address && userProfile.address.length > 0 && (
                      <>
                        <p>{userProfile.address[0].street}, </p>
                        <p>{userProfile.address[0].city}, </p>
                        <p>{userProfile.address[0].state}, </p>
                        <p>{userProfile.address[0].country}. </p>
                        <p>{userProfile.address[0].zipCode}</p>
                      </>
                    )}
                  </div>
                </div>

                <div>{/* <h3>{userProfile?.workExperience}</h3> */}</div>
                <div></div>
                </div>
              </section>
              <section className="postSectionUser">
          {userPosts &&
            userPosts.map((post) => (
              <Box className="userPostBox" key={post._id}>
                <Link className="userProfileName" to="/userprofile">
                  <div
                    onClick={() => {
                      setPostuserId(post.author._id);
                    }}
                    className="accountPostBox"
                  >
                    <Avatar
                      alt={post.author.name}
                      src={post.author.profileImage}
                    />

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
                <Divider id="likeDevider" />

                <section className="postButtons">
                  <Button startIcon={<ThumbUpOutlinedIcon />}>Like</Button>
                  <Button
                    // onClick={() => handleFetchComments(post._id)}
                    startIcon={<CommentOutlinedIcon />}
                  >
                    Comment
                  </Button>
                </section>

                {/* <Divider />

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
                         
                          {isEditingComment(comment._id) ? (
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
              </section> */}
              </Box>
            ))}
        </section>
            </section>
          </section>
        </Box>
        
      </div>
    </div>
  );
}

export default UserProfile;
