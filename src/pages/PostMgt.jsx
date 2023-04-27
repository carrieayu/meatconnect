import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const PostMgt = () => {
  const [post, setPost] = React.useState([]);
  const navigate = useNavigate();

  const onDeletePost = (event, id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Delete/Deactivate your Account?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8080/animal/deleteAnimal/${id}`)
        .then((response) => {
          alert("Post Deleted Successfully!!");
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

  const fetchPost = () => {
    axios
      .get("http://localhost:8080/animal/retrieveAll/")
      .then((response) => {
        console.log(response.data.animals);
        setPost(response.data.animals);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchPost();
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
                    <th>Animal Name</th>
                    <th class="d-none d-md-table-cell">Type</th>
                    <th class="d-none d-md-table-cell">Detail</th>
                    <th class="d-none d-md-table-cell">Photo</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {post?.map((data, index) => (
                    <tr key={index}>
                      <td>{data.user_id}</td>
                      <td>{data.livestock_animal_name}</td>
                      <td>{data.livestock_animal_type}</td>
                      <td>{data.livestock_animal_detail}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`data:image/jpeg;base64,${data.livestock_animal_photo}`}
                          alt={data.livestock_animal_name}
                          width={"50%"}
                        />
                      </td>
                      <td>{data.livestock_animal_price}</td>
                      <td>{data.livestock_animal_stock}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={(event) =>
                            onDeletePost(event, data.livestock_animal_id)
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

export default PostMgt;
