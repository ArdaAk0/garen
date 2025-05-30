import { useState, useEffect } from "react";
import { getAbout } from "../data";

function About() {
  const [aboutItems, setAboutItems] = useState([]);

  useEffect(() => {
    const loadAbout = async () => {
      const data = await getAbout();
      console.log("About.jsx - Hakkında Verileri:", data); 
      setAboutItems(data);
    };
    loadAbout();
  }, []);

  return (
    <div>
      <h1 style={{ color: "#dc2626" }}>Hakkında</h1>
      <p style={{ color: "#4b5563", marginBottom: "20px" }}>
        ekibimiz:
      </p>
      {aboutItems.length > 0 ? (
        <div className="grid">
          {aboutItems.map((item) => (
            <div className="profile-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#4b5563", textAlign: "center" }}>
          Admin panelden üye ekleyebilirsiniz
        </p>
      )}
    </div>
  );
}

export default About;
