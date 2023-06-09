import React, { Suspense } from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";

const Order = (props) => {
  const [order, setOrder] = React.useState([]);
  const [sort, setSort] = React.useState(false);
  const [orderBuyer, setOrderBuyer] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  const showInvoice = () => {
    navigate("/Invoice");
  };
  const id = localStorage.getItem("id");

  const fetchOrder = () => {
    axios
      .get(`http://localhost:8080/order/getAllOrderBySeller/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const fetchOrderBuyer = () => {
  //   axios
  //     .get(
  //       `http://localhost:8080/order/getAllOrderBySellers/${id}`
  //     )
  //     .then((response) => {
  //       response.data.map(item=>{
  //          getOrderBuyer(item.user_id);
  //       })
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const getOrderBuyer = (buyer_id) => {
  //   axios
  //     .get(
  //       `http://localhost:8080/order/getBuyerName/${buyer_id}`
  //     )
  //     .then((response) => {
  //      setOrderBuyer((prevBuyer => [...prevBuyer, response.data]))
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const nextAction = (order_id, status) => {
    axios
      .put(`http://localhost:8080/order/toShipStatus/${order_id}`, {
        status: status,
      })
      .then((response) => {
        fetchOrder();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getStatus = (status, order_id) => {
    if (status === "Pending") {
      return (
        <button
          className="btn btn-danger"
          onClick={() => {
            nextAction(order_id, status);
          }}
        >
          Send Item
        </button>
      );
    }
    if (status === "To ship") {
      return (
        <button className="btn btn-danger" disabled="true">
          Item sent
        </button>
      );
    }
    if (status === "To ship") {
      return (
        <button
          className="btn btn-success"
          disabled={() => {
            if (status === "Completed") return;
          }}
          onClick={() => {
            nextAction(order_id, status);
          }}
        >
          Completed
        </button>
      );
    }
  };

  const handleProductFilter = () => {
    if (sort) {
      setOrder(
        [...order].sort((a, b) =>
          a.livestock_animal_name > b.livestock_animal_name ? 1 : -1
        )
      );
    } else {
      setOrder(
        [...order].sort((a, b) =>
          a.livestock_animal_name < b.livestock_animal_name ? 1 : -1
        )
      );
    }
    setSort(!sort);
  };

  const handleOrderNumFilter = () => {
    if (sort) {
      setOrder(
        [...order].sort((a, b) => (a.order_number > b.order_number ? 1 : -1))
      );
    } else {
      setOrder(
        [...order].sort((a, b) => (a.order_number < b.order_number ? 1 : -1))
      );
    }
    setSort(!sort);
  };

  React.useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div
          className="row header"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          <h3>List of orders</h3>
        </div>
        <div className="row">
          <div className="col-md-8 mx-auto">
            <table className="table bg-white rounded border">
              <thead>
                <tr>
                  <th
                    scope="col"
                    onClick={handleOrderNumFilter}
                    style={{ cursor: "pointer" }}
                  >
                    Number
                  </th>
                  <th
                    scope="col"
                    onClick={handleProductFilter}
                    style={{ cursor: "pointer" }}
                  >
                    Product
                  </th>
                  <th scope="col">Buyer Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Total</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                <Suspense fallback={<div>Loading...</div>}>
                  {order?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.order_number}</td>
                        <td>{data.livestock_animal_name}</td>
                        <td>
                          {data.last_name},{data.first_name}
                        </td>
                        <td>{data.user_address}</td>
                        <td>{data.price * data.quantity}</td>
                        <td>{data.quantity}</td>
                        <td>{data.status}</td>
                        <td>{getStatus(data.status, data.order_id)}</td>
                      </tr>
                    );
                  })}
                </Suspense>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Order;
