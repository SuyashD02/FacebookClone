import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';


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

        <section className="gridBox">
      <Grid container justifyContent="center" spacing={2}>
        {boxes.map((value) => (
          <Grid key={value} item className="gridItem">
            <Paper className="paper" onClick={handlepaperclick} />
          </Grid>
        ))}
      </Grid>
    </section>
   
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
            

        </Box>

    </section>
    <section className="postSection">
        <Box className="postBox">
            <div>
                <AccountCircle/>
            </div>
            <section>
               <img alt="Image of post"/>
            </section>
            <section>
                
            </section>

        </Box>
    </section>

    </div>
    )
}
export default HomePage;