import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from "../images/redbuswhite.webp";
import { Link, useNavigate } from "react-router-dom";

const AppBar = (props: any) => {
  const navigate = useNavigate();
  const onClickHandler = (event: any) => {
    console.log("Inside on click");
    event.preventDefault();
    navigate("/bookings");
  };
  return (
    <Navbar expand="lg" className="navbar">
      <div className="navbar__main">
        <div className="navbar__left">
          <div className="navbar__logo">
            <Link to="/">
              <img src={logo} className="navbar__img" alt="RedBus" />
            </Link>
          </div>
          <Nav className="me-auto">
            <Nav.Link className=" navbar__tickets">BUS TICKETS</Nav.Link>
          </Nav>
        </div>
        <div className="navbar__right">
          {props.authentication && (
            <Nav.Link
              href="bookings"
              className="navbar__item"
              onClick={onClickHandler}
            >
              Manage Booking
            </Nav.Link>
          )}
          {props.authentication ? (
            <NavDropdown
              className="navbar__dropdown"
              title={
                <span className="material-icons navbar__account-circle">
                  account_circle
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="logout">Log Out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown
              className="navbar__dropdown"
              title={
                <span className="material-icons navbar__account-circle">
                  lock
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="login">Login/Signup</NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default AppBar;
