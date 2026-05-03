import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ListingDetail({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);

  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: 1
  });

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`https://wanderlust-backend-1-7s0n.onrender.com/listings/${id}`);
      setListing(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://wanderlust-backend-1-7s0n.onrender.com/reviews/${id}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setReviewData({ comment: "", rating: 1 });
      fetchListing();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Review (only listing owner)
  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://wanderlust-backend-1-7s0n.onrender.com/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchListing();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Listing
  const handleDeleteListing = async () => {
    if (window.confirm("Delete this listing?")) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(
          `https://wanderlust-backend-1-7s0n.onrender.com/listings/${listing.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Deleted successfully!");
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!listing) return <p className="mt-4">Loading...</p>;

  // ✅ 🔥 FIXED OWNER CHECK
  const isOwner =
    currentUser &&
    currentUser.username === listing.owner?.username;

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="col-12 col-md-8">

        {/* Title */}
        <h3 className="mb-2">{listing.title}</h3>

        {/* Image */}
        <img
          src={listing.imageUrl}
          alt={listing.title}
          style={{
            width: "70%",
            height: "250px",
            objectFit: "cover",
            borderRadius: "12px",
            display: "block",
            marginBottom: "15px"
          }}
        />

        {/* Details */}
        <p className="mb-1">{listing.owner?.username}</p>
        <p className="mb-1">{listing.description}</p>
        <p className="mb-1">₹{listing.price} / night</p>
        <p className="mb-1">{listing.location}</p>
        <p className="mb-3">{listing.country}</p>

        {/* ✅ EDIT + DELETE BUTTONS */}
        {isOwner && (
          <div className="mt-3 d-flex gap-2">
            <button
              className="btn btn-danger"
              onClick={() => navigate(`/edit/${listing.id}`)}
            >
              Edit
            </button>

            <button
              className="btn btn-dark"
              onClick={handleDeleteListing}
            >
              Delete
            </button>
          </div>
        )}

        {/* ================== REVIEW FORM ================== */}
        {currentUser && (
          <form onSubmit={handleReviewSubmit} className="mb-4 mt-4">
            <h5>Add Review</h5>

            {/* ⭐ Stars */}
            <div className="mb-2 d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <label
                  key={star}
                  style={{
                    fontSize: "32px",
                    color: star <= reviewData.rating ? "gold" : "#ddd",
                    cursor: "pointer",
                    marginRight: "5px"
                  }}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={reviewData.rating === star}
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        rating: parseInt(e.target.value)
                      })
                    }
                    style={{ display: "none" }}
                  />
                  ★
                </label>
              ))}
            </div>

            {/* Comment */}
            <textarea
              className="form-control mb-2"
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
              required
            />

            <button className="btn btn-success" style={{ width: "120px" }}>
              Add
            </button>
          </form>
        )}

        {/* ================== REVIEWS ================== */}
        <div className="row">
          {listing.reviews?.map((rev) => (
            <div className="col-md-6 mb-3" key={rev.id}>
              <div className="p-3 shadow-sm rounded">

                <p className="fw-bold mb-1">@{rev.user?.username}</p>

                <p className="mb-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} style={{ color: "gold" }}>★</span>
                  ))}
                </p>

                <p className="mb-2">{rev.comment}</p>

                {/* Delete review only listing owner */}
                {isOwner && (
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => handleDeleteReview(rev.id)}
                  >
                    Delete
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ListingDetail;