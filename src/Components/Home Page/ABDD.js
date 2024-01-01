import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
function ABDD() {
  const [Data, setData] = useState([]);
  let api1 =
    'https://academics.newtonschool.co/api/v1/facebook/post?search={"author.name":"Carmen Shanahan"}';
  let api = "https://academics.newtonschool.co/api/v1/facebook/post";
  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    const response = await fetch(api, {
      headers: {
        projectID: "7n1a3lrketcp",
      },
    });
    const r = await response.json();
    // console.log(r)
    setData(r["data"]);
  };
  console.log(Data);
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", rowGap: "17px", paddingTop: "18px" }}> 
      {Data &&
        Data.map((post) => (
          <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <img src={post.author.profileImage} alt="..."/>
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.author.name}
            subheader="September 14, 2016"
          />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="194"
            image={post.channel.image}
            alt="Paella dish"
          />
          <div>
            <p>{post.likeCount}</p>
          </div>
          <div className="footer">
            <span><ThumbUpOffAltOutlinedIcon/><span>Like</span></span>
            <ChatBubbleOutlineOutlinedIcon/>
            <ShareOutlinedIcon/>
          </div>
      </Card>
        ))}
    </div>
  );
}

export default ABDD;
