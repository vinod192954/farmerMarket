import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("authToken"))
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("authToken")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("authToken")));
  }, [location]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2E7D32" }}>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://res.cloudinary.com/dzmhdzvfb/image/upload/v1741355866/f2c_background_removed_jbtsfj.jpg"
              alt="Logo"
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                F2C
              </Typography>
              <Typography variant="body2" sx={{ color: "white" }}>
                Nature's Bucket
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
            <Button color="inherit" component={Link} to="/watchlist">
              Watchlist
            </Button>

            {isLoggedIn ? (
              <Box>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar alt="Profile" src="/profile-placeholder.jpg" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem component={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/orders">
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Become a Seller
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
