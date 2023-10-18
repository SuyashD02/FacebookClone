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
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ListItemButton from "@mui/material/ListItemButton";
import { useAuth } from "../Context/Context";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Divider from "@mui/material/Divider";

import "./nav.css";



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

export default function Navbar() {
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
      <MenuItem>
        <IconButton size="large" aria-label="show 8 new mails" color="inherit">
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
          color="inherit"
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
          color="inherit"
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
          projectID: "f104bi07c490",
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box className="logoFacebook">
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "link")}
              to="/Main"
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                facebook
              </Typography>
            </NavLink>
          </Box>
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
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleOpen}
              color="inherit"
            >
              <AccountCircle />
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
                        <ListItemButton>
                          <Link to={"/profile"}>
                          <div className="acountData">
                            <AccountCircle />
                            <Typography>Name</Typography>
                          </div>
                          </Link>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton className="seeAllListButton">
                          <div className="SeeAll">
                            <Typography>See all profile</Typography>
                          </div>
                        </ListItemButton>
                      </Box>
                    </div>

                    <div className="modalList">
                      <div className="listItemProfile">
                        <ListItemButton>
                          <Settings />
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
                      <Link to={"/createPage"}>
                        <ListItemButton>
                          <HelpIcon />
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
                       
                        <ListItemButton>
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
                        <ListItemButton>
                          <FeedbackRoundedIcon />
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            role="button"
                          >
                            Give feedback
                          </Typography>
                        </ListItemButton>
                      </div>
                      <div
                        className="listItemProfile"
                        onClick={habdleLoginLogout}
                      >
                        <Link to="/">
                        <ListItemButton>
                          <Logout />
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
              color="inherit"
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
