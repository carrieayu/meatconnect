import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("id");
  const [state, setState] = React.useState([]);

  const getCart = () => {
    axios
      .get(`http://localhost:8080/cart/retrieveAll/${user_id}`)
      .then((response) => {
        console.log(response);
        setState(response.data.animals);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    getCart();
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    const [cod, setCod] = React.useState(true);
    const [formValues, setFormValues] = React.useState({
      firstName: "",
      lastName: "",
      email: "",
      addrOne: "",
      addrTwo: "",
      phone: "",
      country: "",
      countryState: "",
      zip: "",
      cardNumber: "",
      cardName: "",
      expDate: "",
      cvv: "",
    });

    const handleOnChange = (event) => {
      const { name, value } = event.target;
      setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    function generateRandomString() {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    const onSubmit = (event) => {
      //Insert into billing table

      if (cod) {
        axios
          .post(`http://localhost:8080/payment/insertPayment`, {
            payment_type: "Cash On Delivery",
            card_number: "",
            card_expiry_date: "",
            card_full_name: "",
            card_cvv: "",
          })
          .then((response) => {
            axios
              .post(`http://localhost:8080/billing/saveBilling/${user_id}`, {
                payment_id: response.data[0].payment_id,
                first_name: formValues.firstName,
                last_name: formValues.lastName,
                email: formValues.email,
                address: formValues.addrOne,
                addressTwo: formValues.addrTwo,
                country: formValues.country,
                state: formValues.countryState,
                zip: formValues.zip,
                phone: formValues.phone,
              })
              .then((response) => {
                state?.map((data) => {
                  let billing_id = response.data[0].billing_id;
                  axios
                    .post(
                      `http://localhost:8080/order/insertOrder/${data.cart_id}`,
                      {
                        order_number: generateRandomString(),
                        user_id: user_id,
                        livestock_animal_id: data.livestock_animal_id,
                        billing_id: billing_id,
                        quantity: data.quantity,
                        price: data.livestock_animal_price,
                      }
                    )
                    .then((response) => {
                      console.log(response.data);
                      alert("Item Ordered Successfully!!");
                      navigate("/");
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .post(`http://localhost:8080/payment/insertPayment`, {
            payment_type: "Credit Card",
            card_number: formValues.cardNumber,
            card_expiry_date: formValues.expDate,
            card_full_name: formValues.cardName,
            card_cvv: formValues.cvv,
          })
          .then((response) => {
            axios
              .post(`http://localhost:8080/billing/saveBilling/${user_id}`, {
                payment_id: response.data[0].payment_id,
                first_name: formValues.firstName,
                last_name: formValues.lastName,
                email: formValues.email,
                address: formValues.addrOne,
                addressTwo: formValues.addrTwo,
                country: formValues.country,
                state: formValues.countryState,
                zip: formValues.zip,
                phone: formValues.phone,
              })
              .then((response) => {
                state?.map((data) => {
                  let billing_id = response.data[0].billing_id;
                  axios
                    .post(
                      `http://localhost:8080/order/insertOrder/${data.cart_id}`,
                      {
                        order_number: generateRandomString(),
                        user_id: user_id,
                        livestock_animal_id: data.livestock_animal_id,
                        billing_id: billing_id,
                        quantity: data.quantity,
                        price: data.livestock_animal_price,
                      }
                    )
                    .then((response) => {
                      console.log(response.data);
                      navigate("/");
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }

      event.preventDefault();
    };
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.livestock_animal_price * item.quantity);
    });

    state.map((item) => {
      return (totalItems += item.quantity);
    });
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({state.length})
                      <span>
                        $
                        {Math.round(subtotal)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
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
                          $
                          {Math.round(subtotal + shipping)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" onSubmit={onSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label for="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          required
                          value={formValues.firstName}
                          onChange={handleOnChange}
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>

                      <div className="col-sm-6 my-1">
                        <label for="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          required
                          value={formValues.lastName}
                          onChange={handleOnChange}
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          required
                          name="email"
                          value={formValues.email}
                          onChange={handleOnChange}
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="1234 Main St"
                          required
                          name="addrOne"
                          value={formValues.addrOne}
                          onChange={handleOnChange}
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label for="address2" className="form-label">
                          Address 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          placeholder="Apartment or suite"
                          name="addrTwo"
                          value={formValues.addrTwo}
                          onChange={handleOnChange}
                        />
                      </div>

                      <div className="col-12">
                        <label for="address2" className="form-label">
                          Phone Number{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          placeholder="Enter a Valid Phone Number"
                          name="phone"
                          value={formValues.phone}
                          onChange={handleOnChange}
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label for="country" className="form-label">
                          Country
                        </label>
                        <br />
                        <select
                          className="form-select"
                          id="country"
                          required
                          name="country"
                          value={formValues.country}
                          onChange={handleOnChange}
                        >
                          <option value="">Choose...</option>
                          <option value="philippines">Philippines</option>
                          <option value="japan">Japan</option>
                          <option value="korea">Korea</option>
                          <option value="china">China</option>
                          <option value="singapore">Singapore</option>
                          <option value="russia">Russia</option>
                          <option value="usa">USA</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>

                      {/* <div className="col-md-4 my-1">
                        <label for="state" className="form-label">
                          State
                        </label>
                        <br />
                        <select
                          className="form-select"
                          id="state"
                          required
                          name="countryState"
                          value={formValues.countryState}
                          onChange={handleOnChange}
                        >
                          <option value="">Choose...</option>
                          <option>Punjab</option>
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div> */}

                      <div className="col-md-3 my-1">
                        <label for="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder=""
                          required
                          name="zip"
                          value={formValues.zip}
                          onChange={handleOnChange}
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck"
                        checked={cod}
                        onChange={(event) => setCod(event.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck"
                      >
                        Cash On Delivery
                      </label>
                    </div>

                    <div className="row gy-3">
                      {cod ? (
                        ""
                      ) : (
                        <>
                          <div className="col-md-6">
                            <label for="cc-name" className="form-label">
                              Name on card
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-name"
                              placeholder=""
                              required
                              name="cardName"
                              value={formValues.cardName}
                              onChange={handleOnChange}
                            />
                            <small className="text-muted">
                              Full name as displayed on card
                            </small>
                            <div className="invalid-feedback">
                              Name on card is required
                            </div>
                          </div>

                          <div className="col-md-6">
                            <label for="cc-number" className="form-label">
                              Credit card number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-number"
                              placeholder=""
                              required
                              name="cardNumber"
                              value={formValues.cardNumber}
                              onChange={handleOnChange}
                            />
                            <div className="invalid-feedback">
                              Credit card number is required
                            </div>
                          </div>

                          <div className="col-md-3">
                            <label for="cc-expiration" className="form-label">
                              Expiration
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-expiration"
                              placeholder=""
                              required
                              name="expDate"
                              value={formValues.expDate}
                              onChange={handleOnChange}
                            />
                            <div className="invalid-feedback">
                              Expiration date required
                            </div>
                          </div>

                          <div className="col-md-3">
                            <label for="cc-cvv" className="form-label">
                              CVV
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-cvv"
                              placeholder=""
                              required
                              name="cvv"
                              value={formValues.cvv}
                              onChange={handleOnChange}
                            />
                            <div className="invalid-feedback">
                              Security code required
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <hr className="my-4" />

                    <button className="w-100 btn btn-primary " type="submit">
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
