import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import { getNews, fetchNewsFromApi } from "../data";
import axios from "axios";

function Home() {
  const [news, setNews] = useState([]);
  const [apiNews, setApiNews] = useState([]); 
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      const localNews = await getNews(); 
      const apiNewsData = await fetchNewsFromApi(); 
      console.log("Home.jsx - LocalStorage Haberler:", localNews);
      console.log("Home.jsx - API Haberleri:", apiNewsData);
      setNews(localNews); 
      setApiNews(apiNewsData); 
    };
    loadNews();
  }, []);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => setCurrency(response.data.rates.TRY))
      .catch((error) => console.error("Döviz API hatası:", error));
  }, []);

  return (
    <div>
      <h1 style={{ color: "#dc2626" }}>Haberler</h1>
      {currency && (
        <div className="currency-card">
          <p>USD/TRY: {currency.toFixed(2)} TL</p>
        </div>
      )}
      <h2 style={{ color: "#dc2626" }}>Öne Çıkan Haberler</h2>
      {news.length > 0 ? (
        <div className="grid">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <p style={{ color: "#4b5563", textAlign: "center" }}>
          Admin panelinden haber ekleyin. Panele girmek için önce admine giriş yapın haberler LOcalStoragadir
        </p>
      )}
      {/* <h2 style={{ color: "#dc2626" }}>Güncel Haberler</h2>
      {apiNews.length > 0 ? (
        <div className="grid">
          {apiNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <p style={{ color: "#4b5563", textAlign: "center" }}>
          API’den haber bulunamadı. Swagger UI’yi kontrol edin!
        </p>
      )} */}
    </div>
  );
}

export default Home;
