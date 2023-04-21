import React from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";

const Order = () => {
  const [order, setOrder] = React.useState([]);

  const fetchOrder = () => {
    axios
      .get(
        `http://localhost:8080/order/retrieveByUser/${localStorage.getItem(
          "id"
        )}`
      )
      .then((response) => {
        console.log(response);
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
          <h3>List of orders</h3>
        </div>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <table class="table bg-white rounded border">
              <thead>
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Total</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Arrival</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.order_number}</td>
                        <td>{data.livestock_animal_name}</td>
                        <td>{data.address}</td>
                        <td>{data.price * data.quantity}</td>
                        <td>{data.arrived_date}</td>
                        <td>{data.quantity}</td>
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

export default Order;