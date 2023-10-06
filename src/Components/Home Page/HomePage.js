import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import './home.css'


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
                <AccountCircle />
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
            <Divider />
            <div>
              <button>Live video</button>
              <button><AddAPhotoRoundedIcon /> Photo/video</button>
              <button><MoodRoundedIcon /> Feeling/activity</button>
            </div>

            

        </Box>

    </section>

    {/* For Post */}
  
    <section className="postSection">
        <Box className="postBox">
            <div>
                <AccountCircle/>
            </div>
            <section className="imgPostBox">
               <img src={'https://img.freepik.com/free-photo/maldives-island_74190-478.jpg?w=996&t=st=1696610601~exp=1696611201~hmac=b604347e0b051b603ab3ebd409486633c249828ee4da57b9e2d786c4d16dcd2e'} className="imgPost" alt="Image of post"/>

            </section>
            <section>
              <button><ThumbUpOutlinedIcon /> Like</button>
              <button><CommentOutlinedIcon /> Comment</button>
              <button>Send</button>
            </section>

        </Box>
    </section>

    </div>
    )
}
export default HomePage;