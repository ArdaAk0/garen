import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNews } from "../data";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [suggestedNews, setSuggestedNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await getNews();
      const selectedNews = data.find((item) => item.id == id);
      setNews(selectedNews);
      setSuggestedNews(data.filter((item) => item.id != id).slice(0, 3));
    };
    loadNews();
  }, [id]);

  if (!news) return <p>Yükleniyor</p>;

  return (
    <div className="detail-container">
      <div className="detail">
        <h1>{news.title}</h1>
        <p className="date">{news.date} • {news.category}</p>
        <img src={news.image} alt={news.title} />
        <p>{news.content}</p>
        <div className="share-buttons">
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="sidebar">
        <h3>Diğer Haberler</h3>
        {suggestedNews.map((item) => (
          <div className="suggested-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <Link to={`/news/${item.id}`}>
              <h4>{item.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsDetail;  