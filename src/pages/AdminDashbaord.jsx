import React from "react";
import "../assets/css/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };
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
            <a href="#">
              Logout
            </a>
          </div>
        </div>
        <div class="main_content">
          <div class="header">MeatConnect welcomes you!</div>
          <div class="info">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>

            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor
              pretium viverra suspendisse potenti nullam ac tortor vitae purus.
              Nibh praesent tristique magna sit amet purus gravida quis. Lacus
              luctus accumsan tortor posuere. Vitae sapien pellentesque habitant
              morbi tristique senectus et. Odio ut sem nulla pharetra diam sit
              amet nisl. Consectetur purus ut faucibus pulvinar elementum
              integer. Pretium fusce id velit ut tortor. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim. Lectus proin nibh
              nisl condimentum. Sed vulputate odio ut enim blandit volutpat
              maecenas volutpat. Sollicitudin ac orci phasellus egestas tellus.
              Elit pellentesque habitant morbi tristique senectus et netus.
              Massa tincidunt dui ut ornare lectus sit amet est placerat. Nibh
              nisl condimentum id venenatis a condimentum vitae sapien
              pellentesque. Quis hendrerit dolor magna eget. Amet consectetur
              adipiscing elit pellentesque habitant morbi tristique senectus et.
            </div>

            <div>
              Mattis rhoncus urna neque viverra justo nec ultrices dui sapien.
              Nec sagittis aliquam malesuada bibendum arcu vitae. Montes
              nascetur ridiculus mus mauris vitae ultricies leo. Magnis dis
              parturient montes nascetur ridiculus mus mauris vitae. Aliquam
              ultrices sagittis orci a scelerisque purus semper eget duis. In
              arcu cursus euismod quis viverra. Et ultrices neque ornare aenean.
              Massa sapien faucibus et molestie ac feugiat sed lectus.
              Adipiscing elit ut aliquam purus sit amet luctus venenatis. Neque
              convallis a cras semper auctor neque vitae tempus quam. Id nibh
              tortor id aliquet lectus proin. Tempus egestas sed sed risus
              pretium quam vulputate dignissim. Metus aliquam eleifend mi in
              nulla posuere sollicitudin. Quam pellentesque nec nam aliquam sem.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
