import { Link } from "react-router-dom";

function NewsCard({ news }) {
  return (
    <div className="card">
      <span className="category">{news.category}</span>
      <img src={news.image} alt={news.title} />
      <Link to={`/news/${news.id}`}>
        <h2>{news.title}</h2>
      </Link>
      <p>{news.date}</p>
    </div>
  );
}

export default NewsCard;