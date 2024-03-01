import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { StorefrontOutlined, SupervisedUserCircle } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';

import { useAuth } from "../Context/Context";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import "./nav.css";
import { userMap } from "../Datastoar";



const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "2rem",
  marginRight: "8rem",
  width: "50%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "lightgray",
  "&:hover": {
    backgroundColor: ("lightgray", 0.25),
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

export default function Navbar({onNavClick}) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const menuId = "primary-search-account-menu";

  {
    /*For Mobile view*/
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem >
        <IconButton size="large" aria-label="show 8 new mails" color="#0866FF">
          <Badge badgeContent={8} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="#0866FF"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="#0866FF"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const {setApiSearchData}=useAuth();
  const habdleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    }
  };

  const handleSearch = async () => {
    const searchUrl2 = `https://academics.newtonschool.co/api/v1/facebook/post?search={"author.name":"${searchQuery}"}`;
    if (searchQuery.trim() === "") {
      // If searchTerm is empty or contains only whitespace, do not make the API call
      setApiSearchData([]);
      setSearchPerformed(false);
      return;
    }
    try {
      const response = await fetch(searchUrl2, {
        headers: {
          projectID: "7n1a3lrketcp",
        },
      });
      const searchData = await response.json();
      setApiSearchData(searchData["data"]);
      setSearchPerformed(true);
    } catch (error) {
      console.log("Error fetching search data", error);
    }
    navigate("/search");
  };
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const userIdForNav = localStorage.getItem("userId");
  // const [userName, setUserName] = useState("");
  // useEffect(() => {
  //   const storedUserName = localStorage.getItem("userName");
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //   }
  // }, []);
  return (
    <Box sx={{ flexGrow: 1 }} className="navBarParrentBox">
      <AppBar className="navAppBar" style={{ backgroundColor: 'white' }} >
        <Toolbar>
          <Box className="logoFacebook">
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "link")}
              to="/Main"
              onClick={()=>onNavClick()}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" },color: '#0866FF',fontSize:"30px",fontWeight:"bold"  }}
              >
                facebook
              </Typography>
            </NavLink>
          </Box>
          <section className="responsiveSection">
            <section className="searchComponent">
          <Search className="search-Bar">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              className="seachInput"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </Search>
          </section>
          <div className="header_center">
                <div className="header_option header_option--active">
                  <Link className="linkIcon" to={"/Main"} onClick={()=>onNavClick()}>
                    <HomeIcon fontSize="large" />
                    </Link>
                </div>
                
                <div className="header_option">
                <Link className="linkIcon" to={"/commingSoon"}>
                    <FlagIcon fontSize="large" />
                    </Link>
                </div>
                
                <div className="header_option">
                <Link className="linkIcon" to={"/commingSoon"}>
                    <SubscriptionsIcon fontSize="large"/>
                    </Link>
                </div>
                <div className="header_option">
                <Link className="linkIcon" to={"/commingSoon"}>
                    <StorefrontOutlined fontSize="large"/>
                    </Link>
                </div>
                <div className="header_option">
                <Link className="linkIcon" to={"/commingSoon"}>
                    <SupervisedUserCircle fontSize="large"/>
                    </Link>
                </div>
            </div>
            </section>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link to="/commingSoon">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="#0866FF"
            >
              <Badge>
                <MailIcon className="mailIconNav" />
              </Badge>
            </IconButton>
            </Link>
            <Link to="/commingSoon">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="#0866FF"
            >
              <Badge>
                <NotificationsIcon className="notificationIconNav"/>
              </Badge>
            </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleOpen}
              color="#0866FF"
            >
              {userMap.get(userIdForNav) && (
                            <Avatar sx={{ width: 35, height: 35 }} src={userMap.get(userIdForNav)?.photo}></Avatar>
                            )}
            </IconButton>

            <section className="modalSection">
              <Modal
                className="modalAcountIcon"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <section>
                  <Box className="modalBox">
                    <div>
                      <Box className="boxUser">
                        <div className="authorName">
                        <ListItemButton>
                          <Link to={"/profile"} className="black-link">
                          <div className="acountData">
                          {userMap.get(userIdForNav) && (
                            <Avatar sx={{ width: 40, height: 40 }} src={userMap.get(userIdForNav)?.photo}></Avatar>
                            )}
                            <h2>{userMap.get(userIdForNav)?.name}</h2>
                           
                          </div>
                          </Link>
                        </ListItemButton>
                        </div>
                        
                      </Box>
                    </div>
                    <hr className="horizantalLine"></hr>

                    <div className="modalList">
                      <div className="listItemProfile">
                        <ListItemButton className="listButons">
                          
                          <div className="displayIcon">
                            <div className="iconSetDisplay">
                            <Settings />
                              </div>
                              </div>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            role="button"
                          >
                            Settings & privacy
                          </Typography>
                        </ListItemButton>
                      </div>
                      <div className="listItemProfile">
                      <Link to={"/createPage"}className="black-link">
                        <ListItemButton className="listButons">
                        <div className="displayIcon">
                            <div className="iconSetDisplay">
                            <EmojiFlagsRoundedIcon />
                              </div>
                              </div>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            role="button"
                          >
                            Page
                          </Typography>
                        </ListItemButton>
                        </Link>
                      </div>
                      <div className="listItemProfile">
                       
                        <ListItemButton className="listButons">
                          <div className="displayIcon">
                            <div className="iconSetDisplay">
                            <img 
                            className="iconDisplay"
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/wZov-fr9UUc.png"
                            alt="display"
                            />

                            </div>
                          </div>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            role="button"
                          >
                            Display & accessibility
                          </Typography>
                        </ListItemButton>
                        
                        
                      </div>
                      <div className="listItemProfile">
                        <Link to={"/updatePassword"} className="black-link">
                        <ListItemButton className="listButons">
                          
                          <div className="displayIcon">
                            <div className="iconSetDisplay">
                            <FeedbackRoundedIcon />
                              </div>
                              </div>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            role="button"
                          >
                            Update Password
                          </Typography>
                        </ListItemButton>
                        </Link>
                      </div>
                      <div
                        className="listItemProfile"
                        onClick={habdleLoginLogout}
                      >
                        <Link to="/"className="black-link">
                        <ListItemButton className="listButons"> 
                          <div className="displayIcon">
                            <div className="iconSetDisplay">
                            <Logout />
                              </div>
                              </div>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            role="button"
                          >
                            {isLoggedIn ? "Logout" : "Login"}
                          </Typography>
                        </ListItemButton>
                        </Link>
                        

                      </div>
                    </div>
                  </Box>
                </section>
              </Modal>
            </section>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="#0866FF"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
     
    </Box>
  );
}
