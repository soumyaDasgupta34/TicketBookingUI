import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { fontSize } from "@mui/system";

const NavBar = (props: any) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMyBookingsClick = () => {
    navigate("/bookings");
  };

  const handleLogOutClick = () => {
    navigate("/logout");
  };

  const handleLogInClick = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginBottom: "15px" }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "rgb(78, 3, 163)", color: "black" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <DirectionsBusIcon
              sx={{
                display: { xs: "none", md: "flex" },
                color: "white",
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              BlueBus
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "end",
              }}
              className="navbar"
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleMyBookingsClick}>
                  {props.authentication && (
                    <Typography
                      textAlign="center"
                      textTransform="none"
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        color: "white",
                      }}
                    >
                      My Bookings
                    </Typography>
                  )}
                </MenuItem>
              </Menu>
            </Box>
            <DirectionsBusIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BlueBus
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
              }}
            >
              {token && (
                <Button
                  onClick={handleMyBookingsClick}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "none",
                    fontSize: "18px",
                  }}
                >
                  My Bookings
                </Button>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, fontSize: "100px", paddingLeft: "16px" }}
                >
                  <AccountCircleIcon sx={{ fontSize: 36, color: "white" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!token ? (
                  <MenuItem onClick={handleLogInClick}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLogOutClick}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default NavBar;
