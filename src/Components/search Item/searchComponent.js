import React from "react";
import './search.css';
import { Box, IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function SearchComponent({apiSearchData}){
    return(
        <div>
            <section className="postSection">
    {apiSearchData &&
          apiSearchData.map((post) => (
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
export default SearchComponent;