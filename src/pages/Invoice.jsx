import React, { useEffect } from "react";
import { Navbar } from "../components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Invoice = () => {
  const [invoice, setInvoice] = React.useState([]);
  const { id } = useParams();

  const fetchData = (order_id) => {
    axios
      .get(`http://localhost:8080/getInvoice/${id}`)
      .then((response) => {
        setInvoice(response.data[0]);
        console.log(invoice);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const date = new Date(invoice.created_at);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center">
        <div className="border border-1 p-3">
          <h2>Item Invoice</h2>
          <div className="d-flex flex-column">
            <h6>
              Order SN: <span>{invoice.order_number}</span>
            </h6>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex">
              Grand Total:<span>{invoice.price * invoice.quantity}</span>
            </div>
            <div className="d-flex ">
              Order paid date: <span>{date.toLocaleDateString()}</span>
            </div>
            <div className="d-flex ">
              Shipping Details: <span>{invoice.address}</span>
            </div>
            <div className="d-flex ">
              Payment Method: <span>{invoice.payment_type}</span>
            </div>
            <div className="d-flex ">
              <h6> Order Details</h6>
            </div>
            <div className="d-flex ">{invoice.livestock_animal_name}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Invoice;
