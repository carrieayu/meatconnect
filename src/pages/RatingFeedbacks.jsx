import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const RatingFeedbacks = () => {
  const [rating, setRating] = React.useState([]);
  const navigate = useNavigate();

  const fetchAllFeedbacks = () => {
    axios
      .get("http://localhost:8080/ratings/retrieveAll")
      .then((response) => {
        setRating(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  React.useEffect(() => {
    fetchAllFeedbacks();
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
                    <th>Animal Type</th>
                    <th class="d-none d-md-table-cell">Animal Details</th>
                    <th class="d-none d-md-table-cell">Ratings</th>
                    <th class="d-none d-md-table-cell">Price</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rating?.map((data, index) => (
                    <tr key={index}>
                      <td>{data.user_id}</td>
                      <td>{data.livestock_animal_type}</td>
                      <td>{data.livestock_animal_detail}</td>
                      <td>{data.rating_star}</td>
                      <td>{data.livestock_animal_price}</td>
                      <td>{data.first_name}</td>
                      <td>{data.last_name}</td>
                      <td>
                        <button type="button" className="btn btn-danger btn-sm">
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

export default RatingFeedbacks;
