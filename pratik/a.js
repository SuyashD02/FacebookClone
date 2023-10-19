--import React, { useState } from "react";
import "../Styles/Navbar.css";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { StorefrontOutlined, SupervisedUserCircle } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";

import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import { NotificationsActive } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchComponent from "./searchComponent";
const Search = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginLeft: "15%",
    width: "50%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [apiSearchData, setApiSearchData] = useState([]);

    const handleSearch = async () => {
        const searchUrl2 = `https://academics.newtonschool.co/api/v1/facebook/post?search={"author.name":"${searchQuery}"}`;
        if (searchQuery.trim() === "") {
          // If searchTerm is empty or contains only whitespace, do not make the API call
          setApiSearchData([]);
          return;
        }
        try {
          const response = await fetch(searchUrl2, {
            headers: {
              projectID: "f104bi07c490",
            },
          });
          const searchData = await response.json();
          setApiSearchData(searchData["data"]);
        } catch (error) {
          console.log("Error fetching search data", error);
        }
        //navigate("/SearchComponent");
      };

      const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
      };

    // Define a function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div className="header">
            {/* Header is split into 3 areas: center, left & right */}
            <div className="header_left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="" />
                <div className="header_input">
                <Search className="search-Bar">   
                <SearchIconWrapper>
                  <SearchIcon />
                  </SearchIconWrapper>
                    <StyledInputBase
                       className="search_input"
                       placeholder="Search Facebook"
                       inputProps={{"aria-label":"search"}}
                       value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                   />
                   </Search> 
                </div>
            </div>
            <div className="header_center">
                <div className="header_option header_option--active">
                    <HomeIcon fontSize="large" />
                </div>
                <div className="header_option">
                    <FlagIcon fontSize="large" />
                </div>
                <div className="header_option">
                    <SubscriptionsIcon fontSize="large"/>
                </div>
                <div className="header_option">
                    <StorefrontOutlined fontSize="large"/>
                </div>
                <div className="header_option">
                    <SupervisedUserCircle fontSize="large"/>
                </div>
            </div>
            <div className="header_right">
                <Avatar src="https://scontent.fbbi1-1.fna.fbcdn.net/v/t39.30808-6/329750281_876225640319997_3973598474329394205_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=r1PdmW_XIkwAX9987Xg&_nc_oc=AQlfif9dhoddyoXdvpPbbKUhpdixp2v5y7aafQAskQ6Ewf2rp5QzDMm3d-peV_FFrDcxy4AhaEnklX4b3XkyRcWm&_nc_ht=scontent.fbbi1-1.fna&oh=00_AfDKEnqNrX9BMTebv3AS56gm_RzgDMITwSP2JcdbIYustw&oe=651F8A81" alt="Avatar" />
                <IconButton>
                    <AddIcon />
                </IconButton>
                <IconButton>
                    <ForumIcon />
                </IconButton>
                <IconButton>
                    <NotificationsActive/>
                </IconButton>
                <IconButton onClick={toggleDropdown}>
                    <ExpandMoreIcon /> 
                </IconButton>
                
            </div>
            {/* apiSearchData &&  */}
            <SearchComponent apiSearchData={apiSearchData} />
        </div>
    );
}

export default Navbar;
