import React from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";

const SalesReport = () => {
  const [order, setOrder] = React.useState([]);

  const fetchOrder = () => {
    axios
      .get(`http://localhost:8080/salesHistory/${localStorage.getItem("id")}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchOrder();
    console.log(order);
  }, []);

  return (
    <>
      <Navbar />
      <div class="container mt-5">
        <div
          class="row header"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          <h3>My Sales History</h3>
        </div>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <table class="table bg-white rounded border">
              <thead>
                <tr>
                  <th scope="col">Live Stock</th>
                  <th scope="col">Price</th>
                  <th scope="col">Sold</th>
                  <th scope="col">Remaining</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.livestock_animal_name}</td>
                        <td>{data.price}</td>
                        <td>{data.quantity}</td>
                        <td>{data.quantity - data.livestock_animal_stock}</td>
                        <td>{data.price * data.quantity}</td>

                        <td></td>
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

export default SalesReport;
