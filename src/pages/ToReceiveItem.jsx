import React from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";

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

  const getStatus=(status)=>{
    if(status === 'Pending'){
      return 'To ship'
    }
    if(status === 'To ship'){
      return 'Item receive'
    }
   
  }

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
                        <td>{getStatus(data.status)}</td>
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
