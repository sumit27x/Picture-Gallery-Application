import React, { useState } from "react";
import "./App.css";

const API_KEY = "Br2ChaKiOEQ1rVXFe4cHecKOGUIbg6DqJWU9TGxwXvY";

function App() {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("");
  const fetchPhotos = async (category) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${category}&per_page=12&client_id=${API_KEY}`
      );
      const data = await response.json();
      setPhotos(data.results);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleSearch = () => {
    if (category.trim()) {
      fetchPhotos(category.trim());
    }
  };
  return (
    <div className="container">
      <h1>Picture Gallery</h1>
      <div className="search-bar">
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Search" className="search-input" />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="gallery-item">
            <img src={photo.urls.small}  alt={photo.alt_description || "Image"}  />
            <div className="gallery-item-info">
              <h3>Photo by {photo.user.name}</h3>
              <p>{photo.alt_description || "No description available"}</p>
              <a href={photo.links.html} target="_blank" rel="noopener noreferrer">View on Unsplash</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
