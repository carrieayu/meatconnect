import React from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ToReceiveItem = () => {
  const [order, setOrder] = React.useState([]);

  const fetchOrder = () => {
    axios
      .get(
        `http://localhost:8080/order/retrieveByUser/${localStorage.getItem(
          "id"
        )}`
      )
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getStatus = (status) => {
    if (status === "Pending") {
      return "To ship";
    }
    if (status === "To ship") {
      return "Item receive";
    }
  };

  const nextAction = (order_id, status) => {
    axios
      .put(`http://localhost:8080/order/toShipStatus/${order_id}`, {
        status: status,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actionButton = (status, order_id) => {
    if (status === "Pending") {
      return <p className="">Waiting for seller response</p>;
    }
    if (status === "To ship") {
      return (
        <button
          onClick={() => {
            nextAction(order_id, status);
          }}
          className="btn btn-danger"
        >
          Item Recieved
        </button>
      );
    }
  };

  React.useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div class="container mt-5">
        <div
          class="row header"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          <h3>My purchases</h3>
        </div>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <table class="table bg-white rounded border">
              <thead>
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">Seller Name</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Total</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                  <th scope="col">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.order_number}</td>
                        <td>{data.user_contacts}</td>
                        <td>{data.livestock_animal_name}</td>
                        <td>{data.address}</td>
                        <td>{data.price * data.quantity + 30}</td>
                        <td>{data.quantity}</td>
                        <td>{data.status}</td>
                        <td>{actionButton(data.status, data.order_id)}</td>
                        <td>
                          <button>
                            <Link to={"/Invoice/" + data.order_id}>
                              View Invoice
                            </Link>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ToReceiveItem;
