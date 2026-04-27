import { useNavigate } from "react-router-dom";

function ListingCard({ listing }) {
  const navigate = useNavigate();

  return (
    <div className="col-md-4 mb-4" style={{ cursor: "pointer" }} onClick={() => navigate(`/listing/${listing.id}`)}>
      <img
        src={listing.imageUrl}
        alt={listing.title}
        style={{
          width: "100%",
          height: "320px",
          objectFit: "cover",
          borderRadius: "12px"
        }}
      />
      <div className="mt-2">
        <h6 className="mb-1 fw-semibold">{listing.title}</h6>
        <p className="text-muted mb-0">₹{listing.price} / night</p>
      </div>
    </div>
  );
}

export default ListingCard;