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

  const totalValue = order.reduce((acc, curr) => {
    return acc + curr.quantity * curr.livestock_animal_price;
  }, 0);
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
                </tr>
              </thead>
              <tbody>
                {order &&
                  order?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.livestock_animal_name}</td>
                        <td>{data.livestock_animal_price}</td>
                        <td>{data.quantity}</td>
                        <td>{data.remaining}</td>

                        <td></td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2"></td>
                  <td>Total:</td>
                  <td>{totalValue}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SalesReport;
