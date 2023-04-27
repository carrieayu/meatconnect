import React from "react";

const PurchaseHistory = () => {
  return (
    <>
      <div class="wrapper d-flex">
        <div class="sidebar">
          <small class="text-muted pl-3">WIDR PAY</small>
          <ul className="sideNavigation">
            <li>
              <a href="/dashboard">
                <i class="fas fa-home"></i>Dashboard
              </a>
            </li>
            <li>
              <a href="/AccountManagement">
                <i class="far fa-users"></i>Account Management{" "}
              </a>
            </li>
            <li>
              <a href="/PostManagement">
                <i class="fas fa-signs-post"></i>Post Management{" "}
              </a>
            </li>
            <li>
              <a href="/ChatManagement">
                <i class="fas fa-rocketchat"></i>Chat Management{" "}
              </a>
            </li>
            <li>
              <a href="/RatingsAndFeedbacks">
                <i class="fas fa-star"></i>Ratings and Feedbacks{" "}
              </a>
            </li>
            <li>
              <a href="NotificationManagement">
                <i class="fas fa-envelope"></i>Notification Management{" "}
              </a>
            </li>
            <li>
              <a href="/PurchaseHistory">
                <i class="fas fa-cart-shopping"></i>Purchase History{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PurchaseHistory;
