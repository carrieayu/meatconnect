import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const AccountMgt = () => {
  const [user, setUser] = React.useState([]);
  const navigate = useNavigate();

  const onDeleteAccnt = (event, id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Delete/Deactivate your Account?"
    );
    if (confirmed) {
      axios
        .put(`http://localhost:8080/user/deactivate/${id}`)
        .then((response) => {
          localStorage.clear();
          alert("Account Deleted Successfully");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
    }
    event.preventDefault();
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchAllUser = () => {
    axios
      .get("http://localhost:8080/user/retrieve")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <>
      <div class="wrapper">
        <div class="sidebar">
          <h2>MEATCONNECT</h2>
          <ul>
            <li>
              <a href="/dashboard">
                <i class="fas fa-home"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="/AccountManagement">
                <i class="far fa-users"></i> Account Management{" "}
              </a>
            </li>
            <li>
              <a href="/PostManagement">
                <i class="fas fa-signs-post"></i> Post Management{" "}
              </a>
            </li>
            <li>
              <a href="/ChatManagement">
                <i class="fas fa-rocketchat"></i> Chat Management{" "}
              </a>
            </li>
            <li>
              <a href="/RatingsAndFeedbacks">
                <i class="fas fa-star"></i> Ratings and Feedbacks{" "}
              </a>
            </li>
            <li>
              <a href="NotificationManagement">
                <i class="fas fa-envelope"></i> Notification Management{" "}
              </a>
            </li>
            <li>
              <a href="/PurchaseHistory">
                <i class="fas fa-cart-shopping"></i> Purchase History{" "}
              </a>
            </li>
          </ul>
          <div class="social_media">
            <a href="#" onClick={onLogout}>
              Logout
            </a>
          </div>
        </div>
        <div class="main_content">
          <div class="header">MeatConnect welcomes you!</div>
          <div class="info">
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th class="d-none d-md-table-cell">User ID</th>
                    <th>Phone Number</th>
                    <th class="d-none d-md-table-cell">Address</th>
                    <th class="d-none d-md-table-cell">Username</th>
                    <th class="d-none d-md-table-cell">Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((data, index) => (
                    <tr key={index}>
                      <td>{data.user_id}</td>
                      <td>{data.user_contacts}</td>
                      <td>{data.user_address}</td>
                      <td>{data.user_name}</td>
                      <td>{data.user_email}</td>
                      <td>{data.first_name}</td>
                      <td>{data.last_name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={(event) =>
                            onDeleteAccnt(event, data.user_id)
                          }
                        >
                          Delete
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th class="d-none d-md-table-cell">Animal ID</th>
                    <th>Animal Name</th>
                    <th class="d-none d-md-table-cell">Animal Type</th>
                    <th class="d-none d-md-table-cell">Description</th>
                    <th class="d-none d-md-table-cell">Animal Photo</th>
                    <th>Price</th>
                    <th>Stocks</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountMgt;
