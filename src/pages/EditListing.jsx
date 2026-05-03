import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    country: "",
    location: ""
  });

  const [validated, setValidated] = useState(false);

  // ✅ Fetch existing data (prefill)
  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`https://wanderlust-backend-1-7s0n.onrender.com/listings/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Update listing
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

      await axios.put(
        `https://wanderlust-backend-1-7s0n.onrender.com/listings/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Listing updated successfully!");
      navigate(`/listing/${id}`);

    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">

          <h2 className="text-center mb-4">Edit Listing</h2>

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

            {/* Image */}
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

            {/* Price + Country */}
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

            {/* Button */}
            <div>
              <button className="btn btn-success" style={{ width: "120px" }}>
                Update
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditListing;