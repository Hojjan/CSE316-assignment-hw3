import React from "react";
import '../cssPages/navbar.css'
import { Link } from "react-router-dom";

function Navbar(){
  return(
    <nav>
        <ul>
          <li className="home-button">
            <Link to="/homepage">
              <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" width="35" fill="#5f6368">
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
            </Link>
          </li>

        <div className="center-menu">
          <li>
            <Link to="/facilityList">Facility List</Link>
          </li>
          <li className="hideOnMobile">
              <Link to="/reservation">Reservation</Link>
          </li>
          <li className="hideOnMobile">
              <a href="#">
                User
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                  <path d="M480-360 280-560h400L480-360Z" />
                </svg>
              </a>
              <ul className="dropdown-content">
                <Link to="/userInfo">My Information</Link>
                <Link to="/myReservation">My Reservation</Link>
              </ul>
          </li>
          </div>

          <li className="menu-button" onClick={showSideBar}>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26" fill="#5f6368">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </a>
          </li>

          <li className="profile-button hideOnMobile">
            <a href="#">
              <img src="/user.png" alt="profile" width="50" />
            </a>
          </li> 
        </ul>

        <ul className="sidebar">
          <li>
            <Link to="/facilityList">Facility List</Link>
          </li>
          <li>
          <Link to="/reservation">Facility Reservation</Link>
          </li>
          <li>
            <a href="#">
              My Page
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            </a>
            <ul className="dropdown-content">
              <Link to="/userInfo">My Information</Link>
              <Link to="/myReservation">My Reservation</Link>
            </ul>
          </li>
        </ul>
      </nav>
  );
}

function showSideBar(){
  const sidebar = document.querySelector('.sidebar')

  if (sidebar.style.display === "flex") {
      sidebar.style.display = "none";
    } else {
      sidebar.style.display = "flex";
    }
}

export default Navbar;