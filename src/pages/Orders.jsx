import React, {Suspense} from "react";
import { Footer, Navbar } from "../components";
import axios from "axios";

const Order = () => {
  const [order, setOrder] = React.useState([]);
  const [orderBuyer, setOrderBuyer] = React.useState([]);
  const [buyer, setBuyer] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const id = localStorage.getItem('id');

  const fetchOrder = () => {
    axios
      .get(
        `http://localhost:8080/order/getAllOrderBySeller/${id}`
      )
      .then((response) => {
      
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrderBuyer = () => {
    axios
      .get(
        `http://localhost:8080/order/getAllOrderBySellers/${id}`
      )
      .then((response) => {
        response.data.map(item=>{
           getOrderBuyer(item.user_id);
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getOrderBuyer = (buyer_id) => {
    axios
      .get(
        `http://localhost:8080/order/getBuyerName/${buyer_id}`
      )
      .then((response) => {
       setOrderBuyer((prevBuyer => [...prevBuyer, response.data]))
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const nextAction = (order_id,status)=>{
    axios
    .put(
      `http://localhost:8080/order/updataOrderStatus/${order_id}`,{
        status: status
      }
    )
    .then((response) => {
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const getStatus=(status)=>{
    if(status === 'Pending'){
      return 'To ship'
    }
    if(status === 'To ship'){
      return 'Completed'
    }
   
  }

  React.useEffect(() => {
    fetchOrder();
    fetchOrderBuyer();
    setOrderBuyer(orderBuyer.flat())
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
                  <th scope="col">Number</th>
                  <th scope="col">Product</th>
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
                { order?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.order_number}</td>
                        <td>{data.livestock_animal_name}</td>
                        <td>{orderBuyer[index]?.last_name},{orderBuyer[index]?.first_name}</td>
                        <td>{orderBuyer[index]?.user_address}</td>
                        <td>{data.price * data.quantity}</td>
                        <td>{data.quantity}</td>
                        <td>{data.status}</td>                
                        <td><button
                        disabled={()=>{if(getStatus(data.status) === 'Completed')return}}
                        onClick={()=>{
                          nextAction(data.order_id,data.status);
                        }}
                        >{getStatus(data.status)}</button></td>                
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
