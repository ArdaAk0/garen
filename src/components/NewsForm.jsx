import { useState } from "react";

function NewsForm({ addNews }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addNews({ id: Date.now(), title, content, date: new Date().toISOString().split("T")[0] });
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Başlık</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>İçerik</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
        />
      </div>
      <button type="submit">Haber Ekle</button>
    </form>
  );
}

export default NewsForm;