import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSignOutAlt, FaRocketchat, FaUserCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedFileUrl, setSelectedFileUrl] = React.useState("");

  const isLoggedIn = !!localStorage.getItem("id");

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const getUser = () => {
    axios
      .get(`http://localhost:8080/user/retrieve/${localStorage.getItem("id")}`)
      .then((response) => {
        setSelectedFileUrl(response.data.user[0].user_photo);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchNofication = () => {
    axios
      .get(
        `http://localhost:8080/getNotification/${localStorage.getItem("id")}`
      )
      .then((response) => {
        setNotification(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateNotif = (id) => {
    axios
      .put(`http://localhost:8080/updateNotif/${id}`)
      .then((response) => {
        fetchNofication();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const count = notification.filter((item) => item.notification === 1).length;

  useEffect(() => {
    fetchNofication();
  }, []);

  useEffect(() => {
    return () => URL.revokeObjectURL(selectedFileUrl);
  }, [selectedFileUrl]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          Meat Connect
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          {isLoggedIn ? (
            <>
              {getUser()}
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto text-center  d-flex align-items-center pr-3">
                  <li className="nav-item dropdown pr-3">
                    <a
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div style={{ position: "relative" }}>
                        <FontAwesomeIcon icon={faBell} />
                        <span
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "-10px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            padding: "2px 5px",
                            color: "white",
                            fontSize: "12px",
                          }}
                        >
                          {count}
                        </span>
                      </div>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        {notification.map((item, index) => {
                          const id = localStorage.getItem("id");
                          if (item.user_id == id) {
                            return (
                              <>
                                <NavLink
                                  className={
                                    item.notification === 1
                                      ? "dropdown-item bg-info"
                                      : "dropdown-item"
                                  }
                                  key={index}
                                  to="/ToReceiveItem"
                                  onClick={() => {
                                    updateNotif(item.order_id);
                                  }}
                                >
                                  Your order {item.livestock_animal_name} has
                                  been update
                                  <br />
                                  Item Status: {item.status}
                                </NavLink>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <NavLink
                                  className={
                                    item.notification === 1
                                      ? "dropdown-item bg-info"
                                      : "dropdown-item"
                                  }
                                  key={index}
                                  to="/orders"
                                  onClick={() => {
                                    updateNotif(item.order_id);
                                  }}
                                >
                                  Item sold {item.livestock_animal_name}
                                  from {item.last_name},{item.first_name}.
                                  <br />
                                  Item Status: {item.status}
                                </NavLink>
                              </>
                            );
                          }
                        })}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <NavLink to="/profile">
                      <img
                        className="rounded-circle  d-flex align-items-center"
                        width="40px"
                        src={
                          selectedFileUrl
                            ? `data:image/jpeg;base64,${selectedFileUrl}`
                            : `https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg`
                        }
                      />
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Profile
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/profile">
                          My Account
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/orders">
                          My Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/ToReceiveItem">
                          My purchases
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/cart">
                          My Cart
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/livestocks">
                          Live stocks
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/salesreport">
                          Sales Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/message">
                          Chat
                        </NavLink>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={onLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="buttons text-center">
              <NavLink to="/login" className="btn btn-outline-dark m-2">
                <i className="fa fa-sign-in-alt mr-1"></i> Login
              </NavLink>
              <NavLink to="/register" className="btn btn-outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i> Register
              </NavLink>
              <NavLink to="/cart" className="btn btn-outline-dark m-2">
                <i className="fa fa-cart-shopping mr-1"></i> Cart (
                {state.length}){" "}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
