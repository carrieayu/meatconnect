import React from "react";
import { Footer, Navbar } from "../components";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import { FaPlusSquare, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/livestock.css";

const LiveStock = () => {
  const user_id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [animal, setAnimal] = React.useState(null);
  const [animalName, setAnimalName] = React.useState("");
  const [animalType, setAnimalType] = React.useState("");
  const [animalDetail, setAnimalDetail] = React.useState("");
  const [animaPhoto, setAnimalPhoto] = React.useState("");
  const [source, setSource] = React.useState();
  const [stock, setStock] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [id, setId] = React.useState();

  const onSelectFIle = (event) => {
    setAnimalPhoto(event.target.files?.[0]);
    setSource(URL.createObjectURL(event.target.files?.[0]));
  };

  const updateAnimal = (event) => {
    const formData = new FormData();
    // formData.append("user_id", user_id);
    // formData.append("animal_name", animalName);
    // formData.append("animal_type", animalType);
    // formData.append("animal_detail", animalDetail);
    // formData.append("stock", stock);
    formData.append("image", animaPhoto);
    console.log(formData);
    axios
      .post("http://localhost:3000/animal/insertAnimal", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          user_id: user_id,
          animal_name: animalName,
          animal_type: animalType,
          animal_detail: animalDetail,
          stock: stock,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  const onFetchAnimalById = (id) => {
    axios
      .get(`http://localhost:8080/animal/retrieveById/${id}`)
      .then((response) => {
        setAnimalName(response.data[0].livestock_animal_name);
        setAnimalType(response.data[0].livestock_animal_type);
        setAnimalDetail(response.data[0].livestock_animal_detail);
        setAnimalPhoto(response.data[0].livestock_animal_photo);
        setStock(response.data[0].livestock_animal_stock);
        setUpdate(true);
        setId(id);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteAnimal = (event, id) => {
    axios
      .delete(`http://localhost:8080/animal/deleteAnimal/${id}`)
      .then((response) => {
        console.log(response);
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
    formData.append("animal_name", animalName);
    formData.append("animal_type", animalType);
    formData.append("animal_detail", animalDetail);
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
        console.log(response);
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
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);

  return (
    <>
      <Navbar />
      <div class="container">
        <div
          class="row header"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          <h3>ANIMAL LISTS OF PRODUCTS</h3>
          <div
            style={{
              textAlign: "left",
              padding: "10px",
            }}
          >
            <button
              style={{ border: "none", borderRadius: "5px", padding: "15px" }}
            >
              Add New Animal <FaPlusSquare />
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Launch demo modal
            </button>
          </div>
        </div>
        <div>
          Adding Live Stocks
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-4 h-100">
            <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
              <form onSubmit={!update ? addAnimal : updateAnimal}>
                <div class="form my-3">
                  <label for="Email">Animal Name</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="animalName"
                    placeholder="Enter Animal Name"
                    defaultValue={animalName}
                    onChange={(event) => setAnimalName(event.target.value)}
                  />
                </div>
                <div class="form my-3">
                  <label for="Email">Animal Type</label>
                  <input
                    type="text"
                    class="form-control"
                    id="animalType"
                    placeholder="Enter Animal Type"
                    defaultValue={animalType}
                    onChange={(event) => setAnimalType(event.target.value)}
                  />
                </div>
                <div class="form my-3">
                  <label for="Email">Animal Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="animalDetails"
                    placeholder="Enter Animal Details"
                    defaultValue={animalDetail}
                    onChange={(event) => setAnimalDetail(event.target.value)}
                  />
                </div>
                <div class="form my-3">
                  <label for="Name">Photo</label>
                  <input
                    type="file"
                    class="form-control"
                    id="animalPhoto"
                    placeholder="Enter Animal Photo"
                    defaultValue={animaPhoto}
                    onChange={(event) => onSelectFIle(event)}
                  />
                </div>
                <div
                  class="form my-3"
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
                <div class="form my-3">
                  <label for="Name">Stocks</label>
                  <input
                    type="number"
                    class="form-control"
                    id="stocks"
                    placeholder="Enter Number of Stocks"
                    defaultValue={stock}
                    onChange={(event) => setStock(event.target.value)}
                  />
                </div>
                <div className="text-center">
                  {update ? (
                    <button class="my-2 mx-auto btn btn-dark" type="submit">
                      Update Livestock
                    </button>
                  ) : (
                    <button class="my-2 mx-auto btn btn-dark" type="submit">
                      Add new Livestock
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <table
          id="example"
          class="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Animal Name</th>
              <th>Animal Type</th>
              <th>Description</th>
              <th>Anime Photo</th>
              <th>Stocks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {animal?.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.livestock_animal_name}</td>
                <td>{animal.livestock_animal_type}</td>
                <td>{animal.livestock_animal_detail}</td>
                <td
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
                <td>{animal.livestock_animal_stock}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
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
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Animal Name</th>
              <th>Animal Type</th>
              <th>Description</th>
              <th>Anime Photo</th>
              <th>Stocks</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default LiveStock;
