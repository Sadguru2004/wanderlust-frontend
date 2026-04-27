import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ListingCard from "../components/ListingCard";

function Home() {
  const [listings, setListings] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchListings();
  }, [location.search]); // 🔥 important

  const fetchListings = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const search = params.get("search");

      let url = "http://localhost:8080/listings";

      if (search) {
        url = `http://localhost:8080/listings/search?keyword=${search}`;
      }

      const res = await axios.get(url);
      setListings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">

  {/* ❌ No data */}
  {listings.length === 0 && (
    <p className="text-center mt-4">No listings found 😢</p>
  )}

  {/* ✅ Data */}
  {listings.map((listing) => (
    <ListingCard key={listing.id} listing={listing} />
  ))}

</div>
    </div>
  );
}

export default Home;