import React from "react";
import { Footer, Navbar } from "../components";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { FaPlusSquare, FaEdit, FaTrash, FaCommentAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/livestock.css";

const LiveStock = () => {
  const user_id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [animal, setAnimal] = React.useState([]);
  const [comment, setComment] = React.useState([]);
  const [breedingType, setBreedingType] = React.useState("");
  const [animalName, setAnimalName] = React.useState("");
  const [animalType, setAnimalType] = React.useState("");
  const [animalDetail, setAnimalDetail] = React.useState("");
  const [animaPhoto, setAnimalPhoto] = React.useState("");
  const [price, setPrice] = React.useState();
  const [source, setSource] = React.useState();
  const [stock, setStock] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);
  const [id, setId] = React.useState();

  const onDeleteComment = (event, id) => {
    axios
      .delete(`http://localhost:8080/comment/deleteComment/${id}`)
      .then((response) => {
        alert("Comment Deleted Successfully");
        setShowComment(false);
        setComment(null);
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  const onSelectFIle = (event) => {
    setAnimalPhoto(event.target.files?.[0]);
    setSource(URL.createObjectURL(event.target.files?.[0]));
  };

  const exitComment = (event) => {
    setShowComment(false);
    setComment(null);
  };

  const fetchComments = (event, id) => {
    axios
      .get(`http://localhost:8080/comment/retrieveByAnimal/${id}`)
      .then((response) => {
        setComment(response.data);
        setShowComment(true);
      })
      .catch((error) => {
        console.error(error);
      });

    event.preventDefault();
  };

  const updateAnimal = (event) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("breeding_type", breedingType);
    formData.append("animal_name", animalName);
    formData.append("animal_type", animalType);
    formData.append("animal_detail", animalDetail);
    formData.append("animal_price", price);
    formData.append("stock", stock);
    formData.append("image", animaPhoto);
    axios
      .put(`http://localhost:8080/animal/updateAnimal/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUpdate(false);
        fetchAnimal();
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  const onFetchAnimalById = (id) => {
    setUpdate(true);
    axios
      .get(`http://localhost:8080/animal/retrieveById/${id}`)
      .then((response) => {
        setAnimalName(response.data[0].livestock_animal_name);
        setAnimalType(response.data[0].livestock_animal_type);
        setBreedingType(response.data[0].breeding_type);
        setAnimalDetail(response.data[0].livestock_animal_detail);
        setAnimalPhoto(response.data[0].livestock_animal_photo);
        setPrice(response.data[0].livestock_animal_price);
        setStock(response.data[0].livestock_animal_stock);
        setId(id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteAnimal = (event, id) => {
    axios
      .delete(`http://localhost:8080/animal/deleteAnimal/${id}`)
      .then((response) => {
        fetchAnimal();
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  const addAnimal = (event) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("breeding_type", breedingType);
    formData.append("animal_name", animalName);
    formData.append("animal_type", animalType);
    formData.append("animal_detail", animalDetail);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", animaPhoto);
    console.log(formData);
    axios
      .post("http://localhost:8080/animal/insertAnimal", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAdd(false);
        fetchAnimal();
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  const fetchAnimal = () => {
    axios
      .get(`http://localhost:8080/animal/retrieveByUser/${user_id}`)
      .then((response) => {
        console.log(response.data);
        setAnimal(response.data.animals);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetchAnimal();
  }, []);

  React.useEffect(() => {
    if (animal.length > 0) {
      $("#example").DataTable();
    }
  }, [animal]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div
          className="row header"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          <h3>ANIMAL LISTS OF PRODUCTS</h3>
          <div style={{ textAlign: "left", padding: "10px" }}>
            <button
              style={{ border: "none", borderRadius: "5px", padding: "15px" }}
              onClick={(event) => setAdd(true)}
            >
              Add New Animal <FaPlusSquare />
            </button>
          </div>
        </div>
        <div>
          {showComment ? (
            <div className="row d-flex justify-content-center mt-100 mb-100">
              <div className="col-lg-6">
                <div className="card">
                  <div>
                    <button
                      className="my-2 mx-auto btn btn-dark"
                      onClick={(event) => exitComment(event)}
                    >
                      Exit
                    </button>
                  </div>
                  <div className="card-body text-center">
                    {comment.length === 0 ? (
                      <h4 className="card-title">No Comments</h4>
                    ) : (
                      <h4 className="card-title">Latest Comments</h4>
                    )}
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
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={(event) =>
                                    onDeleteComment(event, data.comment_id)
                                  }
                                >
                                  Delete
                                </button>{" "}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          {add || update ? (
            <div>
              Adding Live Stocks
              <div className="row my-4 h-100">
                <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                  <form onSubmit={!update ? addAnimal : updateAnimal}>
                    <div className="form my-3">
                      <label htmlFor="Email">Animal Name</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        id="animalName"
                        placeholder="Enter Animal Name"
                        defaultValue={animalName}
                        onChange={(event) => setAnimalName(event.target.value)}
                      />
                    </div>
                    <div className="form my-3">
                      <label htmlFor="Email">Animal Type</label>
                      <select
                        style={{
                          width: "100%",
                          height: "40px",
                          borderRadius: "8px",
                        }}
                        id="type"
                        onChange={(event) => setAnimalType(event.target.value)}
                        value={animalType}
                      >
                        <option value="">Select a Type</option>
                        <option value="Poultry">Poultry</option>
                        <option value="Swine">Swine</option>
                        <option value="Cattle">Cattle</option>
                        <option value="Goats">Goats</option>
                        <option value="Sheep">Sheep</option>
                        <option value="Horses">Horses</option>
                        <option value="Carabao">Carabao</option>
                      </select>
                      {/* <input
                        type="text"
                        className="form-control"
                        id="animalType"
                        placeholder="Enter Animal Type"
                        defaultValue={animalType}
                        onChange={(event) => setAnimalType(event.target.value)}
                      /> */}
                    </div>
                    <div className="form my-3">
                      <label htmlFor="Email">Breeding Type</label>
                      <select
                        style={{
                          width: "100%",
                          height: "40px",
                          borderRadius: "8px",
                        }}
                        id="type"
                        onChange={(event) =>
                          setBreedingType(event.target.value)
                        }
                        value={breedingType}
                      >
                        {(function () {
                          let rowList = [];
                          rowList = [];
                          if (animalType === "Poultry") {
                            rowList.push(
                              <>
                                <option value="">Select a Type</option>
                                <option value="natural mating">
                                  natural mating
                                </option>
                                <option value="artificial insemination">
                                  artificial insemination
                                </option>
                                <option value="insemination">
                                  embryo transfer
                                </option>
                              </>
                            );
                          } else if (animalType === "Swine") {
                            rowList.push(
                              <>
                                <option value="">Select a Type</option>
                                <option value="natural mating">
                                  natural mating
                                </option>
                                <option value="artificial insemination">
                                  artificial insemination
                                </option>
                                <option value="hand mating">hand mating</option>
                              </>
                            );
                          } else if (animalType === "Cattle") {
                            rowList.push(
                              <>
                                <option value="">Select a Type</option>
                                <option value="natural mating">
                                  natural mating
                                </option>
                                <option value="artificial insemination">
                                  artificial insemination
                                </option>
                              </>
                            );
                          } else if (animalType === "Goats") {
                            rowList.push(
                              <>
                                <option value="">Select a Type</option>
                                <option value="artificial insemination">
                                  artificial insemination
                                </option>
                              </>
                            );
                          } else if (animalType === "Sheep") {
                            rowList.push(
                              <>
                                <option value="">Select a Type</option>
                                <option value="natural mating">
                                  natural mating
                                </option>
                                <option value="artificial insemination">
                                  artificial insemination
                                </option>
                              </>
                            );
                          } else if (animalType === "Horses") {
                            rowList.push(
                              <>
                                <option value="">Select a Type</option>
                                <option value="natural mating">
                                  natural mating
                                </option>
                                <option value="artificial insemination">
                                  artificial insemination
                                </option>
                              </>
                            );
                          } else if (animalType === "Carabao") {
                            rowList.push(
                              <>
                                <option value="">Select a Type</option>
                                <option value="natural mating">
                                  natural mating
                                </option>
                              </>
                            );
                          }

                          return rowList;
                        })()}
                      </select>
                      {/* <input
                        type="text"
                        className="form-control"
                        id="animalType"
                        placeholder="Enter Animal Type"
                        defaultValue={animalType}
                        onChange={(event) => setAnimalType(event.target.value)}
                      /> */}
                    </div>
                    <div className="form my-3">
                      <label htmlFor="Email">Animal Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="animalDetails"
                        placeholder="Enter Animal Details"
                        defaultValue={animalDetail}
                        onChange={(event) =>
                          setAnimalDetail(event.target.value)
                        }
                      />
                    </div>
                    <div className="form my-3">
                      <label htmlFor="Name">Photo</label>
                      <input
                        type="file"
                        className="form-control"
                        id="animalPhoto"
                        placeholder="Enter Animal Photo"
                        defaultValue={animaPhoto}
                        onChange={(event) => onSelectFIle(event)}
                      />
                    </div>
                    <div
                      className="form my-3"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {source ? (
                        <img src={source} width={"50%"} alt="Anima Photo" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form my-3">
                      <label htmlFor="Name">Animal Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="stocks"
                        placeholder="Enter Number of Stocks"
                        defaultValue={price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </div>
                    <div className="form my-3">
                      <label htmlFor="Name">Stocks</label>
                      <input
                        type="number"
                        className="form-control"
                        id="stocks"
                        placeholder="Enter Number of Stocks"
                        defaultValue={stock}
                        onChange={(event) => setStock(event.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      {update ? (
                        <>
                          <button
                            className="my-2 mx-auto btn btn-dark m-1"
                            onClick={() => setUpdate(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="my-2 mx-auto btn btn-dark m-1"
                            type="submit"
                          >
                            Update Livestock
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="my-2 mx-auto btn btn-dark m-1"
                            onClick={() => setAdd(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="my-2 mx-auto btn btn-dark m-1"
                            type="submit"
                          >
                            Add new Livestock
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="table-responsive">
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th class="d-none d-md-table-cell">Animal ID</th>
                <th>Animal Name</th>
                <th>Breeding Type</th>
                <th class="d-none d-md-table-cell">Animal Type</th>
                <th class="d-none d-md-table-cell">Description</th>
                <th class="d-none d-md-table-cell">Animal Photo</th>
                <th>Price</th>
                <th>Stocks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {animal?.map((animal) => (
                <tr key={animal.id}>
                  <td class="d-none d-md-table-cell">
                    {animal.livestock_animal_id}
                  </td>
                  <td>{animal.livestock_animal_name}</td>
                  <td>{animal.breeding_type}</td>
                  <td class="d-none d-md-table-cell">
                    {animal.livestock_animal_type}
                  </td>
                  <td class="d-none d-md-table-cell">
                    {animal.livestock_animal_detail}
                  </td>
                  <td
                    class="d-none d-md-table-cell"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`data:image/jpeg;base64,${animal.livestock_animal_photo}`}
                      alt={animal.livestock_animal_name}
                      width={"50%"}
                    />
                  </td>
                  <td>
                    ₱
                    {animal.livestock_animal_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>{animal.livestock_animal_stock}</td>
                  <td style={{ textAlign: "center" }}>
                    <FaEdit
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        onFetchAnimalById(animal.livestock_animal_id)
                      }
                    />
                    <FaTrash
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(event) =>
                        deleteAnimal(event, animal.livestock_animal_id)
                      }
                    />
                    <FaCommentAlt
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(event) => {
                        fetchComments(event, animal.livestock_animal_id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th class="d-none d-md-table-cell">Animal ID</th>
                <th>Animal Name</th>
                <th class="d-none d-md-table-cell">Animal Type</th>
                <th class="d-none d-md-table-cell">Description</th>
                <th class="d-none d-md-table-cell">Animal Photo</th>
                <th>Price</th>
                <th>Stocks</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LiveStock;
