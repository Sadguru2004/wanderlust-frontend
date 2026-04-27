import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateListing({ currentUser }) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    country: "",
    location: ""
  });

  
  useEffect(() => {
    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.currentTarget;

  if (!form.checkValidity()) {
    e.stopPropagation();
    setValidated(true);
    return;
  }

  setValidated(true);

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:8080/listings",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Listing created successfully!");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Failed to create listing.");
  }
};

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">

          <h2 className="text-center mb-4">Create New Listing</h2>

          <form 
  onSubmit={handleSubmit} 
  className={`d-flex flex-column gap-3 ${validated ? "was-validated" : ""}`}
  noValidate
>

  {/* Title */}
  <div>
    <label className="form-label">Title</label>
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="form-control"
      required
    />
    <div className="invalid-feedback">Title is required</div>
  </div>

  {/* Description */}
  <div>
    <label className="form-label">Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="form-control"
      required
    />
    <div className="invalid-feedback">Description is required</div>
  </div>

  {/* Image URL */}
  <div>
    <label className="form-label">Image URL</label>
    <input
      type="url"
      name="imageUrl"
      value={formData.imageUrl}
      onChange={handleChange}
      className="form-control"
      required
    />
    <div className="invalid-feedback">Valid image URL required</div>
  </div>

  {/* Price & Country */}
  <div className="d-flex gap-2">
    <div className="flex-grow-1">
      <label className="form-label">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="form-control"
        required
        min="1"
      />
      <div className="invalid-feedback">Price must be greater than 0</div>
    </div>

    <div className="flex-grow-1">
      <label className="form-label">Country</label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="form-control"
        required
      />
      <div className="invalid-feedback">Country is required</div>
    </div>
  </div>

  {/* Location */}
  <div>
    <label className="form-label">Location</label>
    <input
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      className="form-control"
      required
    />
    <div className="invalid-feedback">Location is required</div>
  </div>

  {/* Submit */}
  <div>
    <button className="btn btn-success" style={{ width: "120px" }}>
      Add
    </button>
  </div>

</form>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;