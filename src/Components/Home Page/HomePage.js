import React, { useState,useEffect } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './home.css';
//import { BrowserRouter, Route, Routes } from "react-router-dom";





function HomePage(){
    const boxes =[1,2,3,4];
    const [searchQuery, setSearchQuery] = useState("");
    const handlepaperclick=()=>{
        alert("paper is clickd!!!!");
    }
    const handleSearch=()=>{
        alert(`Search for:${searchQuery}`);
        
    };
    const handleInputChange=(e)=>{
        setSearchQuery(e.target.value);
    };
    const [apiData,setApiData]=useState(null);
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      const response = await fetch('https://academics.newtonschool.co/api/v1/facebook/post', {
        headers: {
          projectID: "f104bi07c490",
        },
      });
      const r = await response.json();
      // console.log(r)
      setApiData(r["data"]);
    };
    

    return(
      
        <div>
    {/* For Status */}

        <section className="gridBox">
      <Grid container justifyContent="center" spacing={2}>
        {boxes.map((value) => (
          <Grid key={value} item className="gridItem">
            <Paper className="paper" onClick={handlepaperclick} />
          </Grid>
        ))}
      </Grid>
    </section>
   
   {/* For Filter */}
    
    <section className="searchSection">
        <Box className="searchBox">
            <div className="searchBar">
                <Avatar/>
                <InputBase className="searchInputpost"
                placeholder={(`What's on your mind,`)}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}/>
                
            </div>
            <Divider id="divider"/>
            <div className="filterButtons">
              <Button id="buttonFilter">Live</Button>
              <Button id="buttonFilter" startIcon={<AddAPhotoRoundedIcon />}> Photo/video</Button>
              <Button id="buttonFilter" startIcon={<MoodRoundedIcon />}> Feeling/activity</Button>
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
                  <Typography>{post.likeCount}</Typography>
                </div>
                <div className="countComment">
                  <CommentOutlinedIcon />
                  <Typography>{post.commentCount}</Typography>
                </div>
              </section>
              <footer>
              <section className="postButtons">
                <Button startIcon={<ThumbUpOutlinedIcon />}>Like</Button>
                <Button startIcon={<CommentOutlinedIcon />}>Comment</Button>
                <Button>Send</Button>
              </section>
              </footer>
            </Box>
          ))}
    </section>
    

    </div>
    )
}
export default HomePage;