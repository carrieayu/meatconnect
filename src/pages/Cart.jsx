import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const user_id = localStorage.getItem("id");
  const [state, setState] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [checkoutChart, setCheckoutChart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const getCart = () => {
    axios
      .get(`http://localhost:8080/cart/retrieveAll/${user_id}`)
      .then((response) => {
        setState(response.data.animals);
        setQuantity(response.data.animals.map((index) => 0));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8080/cart/delete/${id}`)
      .then(getCart())
      .catch((error) => {
        console.error(error);
      });
    getCart();
  };

  useEffect(() => {
    getCart();
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (idx, selectedItem) => {
    setQuantity(
      quantity.map((item, index) => {
        if (index === idx) {
          const count = item + 1;
          if (count === 1) {
            setCheckoutChart((prevArray) => [...prevArray, selectedItem]);
          }
          return count;
        }
        return item;
      })
    );
  };

  const removeItem = (idx, id) => {
    setQuantity(
      quantity.map((item, index) => {
        if (index === idx) {
          const count = item - 1;
          if (count === 0) {
            const updatedItems = checkoutChart.filter(
              (item) => item.cart_id !== id
            );
            setCheckoutChart(updatedItems);
          }
          return count;
        }
        return item;
      })
    );
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30;
    let totalItems = 0;

    const totalPrice = state.reduce((prevItem, item, index) => {
      return prevItem + item.livestock_animal_price * quantity[index];
    }, 0);

    let checkQtyInEveryCart = quantity.every((element) => element === 0);
    checkQtyInEveryCart ? setTotal(0) : setTotal(totalPrice + shipping);

    const checkout = (quantity) => {
      checkQtyInEveryCart
        ? alert("No item added to the cart")
        : navigate("/checkout", {
            state: { item: checkoutChart, qty: quantity },
          });
    };
    state.map((item) => {
      return (totalItems += item.quantity);
    });

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item, idx) => {
                      return (
                        <div key={item.livestock_animal_id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={`data:image/jpeg;base64,${item.livestock_animal_photo}`}
                                  alt={item.livestock_animal_name}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.livestock_animal_name}</strong>
                              </p>
                              <p>Type: {item.livestock_animal_type}</p>
                              {/* <p>Size: M</p> */}
                              <div>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    deleteItem(item.cart_id);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn px-3"
                                  disabled={quantity[idx] === 0}
                                  onClick={() => {
                                    removeItem(idx, item.cart_id);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5">{quantity[idx]}pc</p>

                                <button
                                  className="btn px-3"
                                  disabled={
                                    quantity[idx] ===
                                    item.livestock_animal_stock
                                  }
                                  onClick={() => {
                                    addItem(idx, item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">
                                    {quantity[idx]}
                                  </span>{" "}
                                  x ₱{item.livestock_animal_price}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({checkoutChart.length})
                        {state.map((item, index) => {
                          if (quantity[index] !== 0)
                            return (
                              <>
                                <span>
                                  {item.livestock_animal_name}:{" "}
                                  {item.livestock_animal_price}(
                                  {quantity[index]})
                                </span>
                                <br />
                              </>
                            );
                        })}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>
                            <p> ${total}</p>
                          </strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      onClick={() => checkout(quantity)}
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
