import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import "../assets/css/product.css";

import { Footer, Navbar } from "../components";
import axios from "axios";

const Product = () => {
  const user_id = localStorage.getItem("id");
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [prodRate, setProdRate] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const fetchComment = (id) => {
    axios
      .get(`http://localhost:8080/comment/retrieveByAnimal/${id}`)
      .then((response) => {
        setComment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUserAnimal = (id) => {
    axios
      .get(`http://localhost:8080/user/retrieve/${id}`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSimilarAnimal = (type) => {
    axios
      .get(`http://localhost:8080/animal/retrieveByTyp/${type}`)
      .then((response) => {
        setSimilarProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchRatings = (animal_id) => {
    axios
      .get(`http://localhost:8080/get/ratings/${animal_id}`)
      .then((response) => {
        setProdRate(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchAnimal = () => {
    axios
      .get(`http://localhost:8080/animal/retrieveById/${id}`)
      .then((response) => {
        setProduct(response.data[0]);
        fetchSimilarAnimal(response.data[0].livestock_animal_type);
        fetchUserAnimal(response.data[0].user_id);
        fetchComment(response.data[0].livestock_animal_id);
        fetchRatings(response.data[0].livestock_animal_id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAnimal();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    const [message, setMessage] = useState("");

    const [rating, setRating] = useState();

    const onCancel = (event) => {
      setMessage("");
      setRating(null);
      event.preventDefault();
    };

    const onChangeRatings = (event) => {
      setRating(parseInt(event.target.value));
    };

    const submitComment = (event) => {
      if (message === "") {
        if (rating) {
          axios
            .post(`http://localhost:8080/insert/userRating/${user_id}`, {
              livestock_animal_id: id,
              rating: rating,
            })
            .then((response) => {
              alert("Rating Submitted");
              event.preventDefault();
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          alert("Please enter a comment message");
          event.preventDefault();
        }
      } else {
        if (rating) {
          axios
            .post(`http://localhost:8080/insert/userRating/${user_id}`, {
              livestock_animal_id: id,
              rating: rating,
            })
            .then((response) => {
              alert("Rating Submitted");
              event.preventDefault();
            })
            .catch((error) => {
              console.error(error);
            });
        }
        axios
          .post(`http://localhost:8080/comment/addComment/${user_id}`, {
            message: message,
            livestock_animal_id: id,
          })
          .then((response) => {})
          .catch((error) => {
            console.error(error);
          });
      }

      fetchAnimal();
    };

    const imageSrc = `data:image/jpeg;base64,${btoa(
      new Uint8Array(product.livestock_animal_photo?.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`;
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={imageSrc}
                alt={product.livestock_animal_name}
                width="100%"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">
                {product.livestock_animal_type}
              </h4>
              <h1 className="display-5">{product.livestock_animal_name}</h1>
              <p className="lead">
                {/* {product.rating && product.rating.rate}{" "} */}
                {(function () {
                  let rowsList = [];
                  let total = 0;

                  prodRate?.map((data) => {
                    total += data.rating_star;
                  });

                  let TotalRate = total / prodRate.length;

                  for (let i = 0; i < Math.floor(TotalRate); i++) {
                    rowsList.push(<i className="fa fa-star"></i>);
                  }

                  return rowsList;
                })()}
              </p>
              <h3 className="display-6  my-4">
                ${product.livestock_animal_price}
              </h3>
              <p className="lead">{product.livestock_animal_detail}</p>
              <p className="lead">
                Owner:
                <Link to={"/UserProfile/" + user.user_id}>
                  {" "}
                  {user.user_email}
                </Link>
              </p>
              <button className="btn btn-outline-dark">Add to Cart</button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-100 mb-100">
          <div className="card">
            <div class="row">
              <div class="col-2">
                <img
                  src="https://i.imgur.com/xELPaag.jpg"
                  width="70"
                  class="rounded-circle mt-2"
                />
              </div>

              <div class="col-10">
                <div class="comment-box ml-2">
                  <h4>Add a comment</h4>

                  <div class="rating">
                    <input
                      type="radio"
                      name="rating"
                      value="5"
                      id="5"
                      onChange={onChangeRatings}
                    />
                    <label for="5">☆</label>
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      id="4"
                      onChange={onChangeRatings}
                    />
                    <label for="4">☆</label>
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      id="3"
                      onChange={onChangeRatings}
                    />
                    <label for="3">☆</label>
                    <input
                      type="radio"
                      name="rating"
                      value="2"
                      id="2"
                      onChange={onChangeRatings}
                    />
                    <label for="2">☆</label>
                    <input
                      type="radio"
                      name="rating"
                      value="1"
                      id="1"
                      onChange={onChangeRatings}
                    />
                    <label for="1">☆</label>
                  </div>

                  <div class="comment-area">
                    <textarea
                      class="form-control"
                      placeholder="what is your view?"
                      rows="4"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    ></textarea>
                  </div>

                  <div class="comment-btns mt-2">
                    <div class="row">
                      <div class="col-6">
                        <div class="pull-left">
                          <button
                            class="btn btn-success btn-sm"
                            onClick={onCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="pull-right">
                          <button
                            class="btn btn-success send btn-sm"
                            onClick={submitComment}
                          >
                            Send <i class="fa fa-long-arrow-right ml-1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body text-center">
              <h4 className="card-title">Latest Comments</h4>
            </div>
            <div className="comment-widgets">
              {comment &&
                comment?.map((data) => {
                  return (
                    <div className="d-flex flex-row comment-row m-t-0">
                      <div className="p-2">
                        <img
                          src="https://i.imgur.com/Ur43esv.jpg"
                          alt="user"
                          width="50"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="comment-text w-100">
                        <h6 className="font-medium">
                          {data.first_name} {data.last_name}
                        </h6>{" "}
                        <span className="m-b-15 d-block">
                          {data.comment_message}{" "}
                        </span>
                        <div className="comment-footer">
                          {" "}
                          <span className="text-muted float-right">
                            {new Date(data.created_at).toLocaleString()}
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts?.map((item) => {
              const imageSrc = `data:image/jpeg;base64,${btoa(
                new Uint8Array(item.livestock_animal_photo?.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`;
              return (
                <div
                  key={item.livestock_animal_id}
                  className="card mx-4 text-center"
                >
                  <img
                    className="card-img-top p-3"
                    src={imageSrc}
                    alt={item.livestock_animal_name}
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.livestock_animal_name.substring(0, 15)}...
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">
                      ₱
                      {item.livestock_animal_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={`/product/${item.id}`}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button className="btn btn-dark m-1">Add to Cart</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
