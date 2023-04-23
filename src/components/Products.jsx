import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const user_id = localStorage.getItem("id");
  const [animal, setAnimal] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const insertCart = (event, id) => {
    axios
      .get(`http://localhost:8080/cart/checkCart/${user_id}/${id}`)
      .then((response) => {
        if (response.data.length === 0) {
          axios
            .post(`http://localhost:8080/insert/cart`, {
              user_id: user_id,
              livestock_animal_id: id,
              quantity: 1,
            })
            .then((response) => {
          
              alert("Added to Card");
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          axios
            .put(`http://localhost:8080/update/cart/${user_id}`, {
              livestock_animal_id: id,
              quantity: response.data[0].quantity + 1,
            })
            .then((response) => {
          
              alert("Added to Card");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    event.preventDefault();
  };

  const fetchAllAnimal = () => {
    axios
      .get(`http://localhost:8080/animal/retrieveAll/`)
      .then((response) => {
        setAnimal(response.data.animals);
        setFilter(response.data.animals);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllAnimal();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (type) => {
    const updatedList = animal.filter(
      (data) => data.livestock_animal_type === type
    );
    setFilter(updatedList);
  };
  const ShowProducts = () => {
    let productList = filter !== null ? filter : animal;
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(animal)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Domestic")}
          >
            Domestic
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Mammals")}
          >
            Mammals
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Birds")}
          >
            Birds
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Reptiles")}
          >
            Reptiles
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Amphibians")}
          >
            Amphibians
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Fish")}
          >
            Fish
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Insects")}
          >
            Insects
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Arachnids")}
          >
            Arachnids
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Crustaceans")}
          >
            Crustaceans
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Echinoderms")}
          >
            Echinoderms
          </button>
        </div>

        {productList &&
          productList?.map((animals) => {
            return (
              <div
                id={animals.livestock_animal_id}
                key={animals.livestock_animal_id}
                className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
              >
                <div
                  className="card text-center h-100"
                  key={animals.livestock_animal_id}
                >
                  <img
                    className="card-img-top p-3"
                    src={`data:image/jpeg;base64,${animals.livestock_animal_photo}`}
                    alt={animal.livestock_animal_name}
                    height={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {animals.livestock_animal_name}...
                    </h5>
                    <p className="card-text">
                      {animals.livestock_animal_detail.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">
                      ₱{" "}
                      {animals.livestock_animal_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={`/product/${animals.livestock_animal_id}`}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={(event) =>
                        insertCart(event, animals.livestock_animal_id)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
