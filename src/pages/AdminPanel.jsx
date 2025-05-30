import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNews, addNews, updateNews, deleteNews, getContacts, deleteContact, getAbout, addAbout, updateAbout, deleteAbout, addNewsToApi, updateNewsInApi, deleteNewsFromApi } from "../data";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("news");
  const [news, setNews] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [aboutItems, setAboutItems] = useState([]);
  const [newNews, setNewNews] = useState({ title: "", content: "", category: "", date: "", image: "" });
  const [newAbout, setNewAbout] = useState({ name: "", description: "", image: "" });
  const [editNews, setEditNews] = useState(null);
  const [editAbout, setEditAbout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminLoggedIn")) {
      navigate("/admin");
    }
    const loadData = async () => {
      const newsData = await getNews();
      const contactsData = await getContacts();
      const aboutData = await getAbout();
      console.log("AdminPanel.jsx - Haberler:", newsData);
      console.log("AdminPanel.jsx - İletişim:", contactsData);
      console.log("AdminPanel.jsx - Hakkında:", aboutData);
      setNews(newsData);
      setContacts(contactsData);
      setAboutItems(aboutData);
    };
    loadData();
  }, [navigate]);

  const handleAddNews = async (e) => {
    e.preventDefault();
    if (newNews.title && newNews.content && newNews.category && newNews.date && newNews.image) {
      await addNews(newNews); 
      await addNewsToApi(newNews); 
      setNews(await getNews());
      setNewNews({ title: "", content: "", category: "", date: "", image: "" });
    }
  };

  const handleEditNews = async (e) => {
    e.preventDefault();
    if (editNews.title && editNews.content && editNews.category && editNews.date && editNews.image) {
      await updateNews(editNews.id, editNews); 
      await updateNewsInApi(editNews.id, editNews);
      setNews(await getNews());
      setEditNews(null);
    }
  };

  const handleDeleteNews = async (id) => {
    await deleteNews(id); 
    await deleteNewsFromApi(id); 
    setNews(await getNews());
  };

  const handleDeleteContact = async (id) => {
    await deleteContact(id);
    setContacts(await getContacts());
  };

  const handleAddAbout = async (e) => {
    e.preventDefault();
    if (newAbout.name && newAbout.description && newAbout.image) {
      await addAbout(newAbout);
      setAboutItems(await getAbout());
      setNewAbout({ name: "", description: "", image: "" });
    }
  };

  const handleEditAbout = async (e) => {
    e.preventDefault();
    if (editAbout.name && editAbout.description && editAbout.image) {
      await updateAbout(editAbout.id, editAbout);
      setAboutItems(await getAbout());
      setEditAbout(null);
    }
  };

  const handleDeleteAbout = async (id) => {
    await deleteAbout(id);
    setAboutItems(await getAbout());
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#dc2626" }}>Admin Panel</h1>
        <div>
          {/* <a
            href="http://localhost:5000/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="api-link"
          >
            API’ye Git
          </a> */}
          <button className="logout" onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      </div>
      <div className="admin-tabs">
        <button
          className={activeTab === "news" ? "active" : ""}
          onClick={() => setActiveTab("news")}
        >
          Haber Yönetimi
        </button>
        <button
          className={activeTab === "contacts" ? "active" : ""}
          onClick={() => setActiveTab("contacts")}
        >
          İletişim Mesajları
        </button>
        <button
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}
        >
          Hakkında Yönetimi
        </button>
      </div>
      {activeTab === "news" && (
        <div>
          <h2 style={{ color: "#dc2626" }}>Yeni Haber Ekle</h2>
          <p style={{ color: "#4b5563" }}>Not: Haberler LocalStoragee kaydedilir</p>
          <form className="admin-form" onSubmit={handleAddNews}>
            <input
              type="text"
              placeholder="Başlık"
              value={newNews.title}
              onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
            />
            <textarea
              placeholder="İçerik"
              value={newNews.content}
              onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
              rows="4"
            />
            <select
              value={newNews.category}
              onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
            >
              <option value="">Kategori Seç</option>
              <option value="Teknoloji">Teknoloji</option>
              <option value="Bilim">Bilim</option>
              <option value="Spor">Spor</option>
            </select>
            <input
              type="date"
              value={newNews.date}
              onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Görsel URL"
              value={newNews.image}
              onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
            />
            <button type="submit">Ekle</button>
          </form>
          <h2 style={{ color: "#dc2626" }}>Haberler</h2>
          {news.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Başlık</th>
                  <th>Kategori</th>
                  <th>Tarih</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.date}</td>
                    <td>
                      <button onClick={() => setEditNews(item)}>Düzenle</button>
                      <button onClick={() => handleDeleteNews(item.id)}>Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#4b5563", textAlign: "center" }}>
              Haber eklemek için üstü doldur
            </p>
          )}
        </div>
      )}
      {activeTab === "contacts" && (
        <div>
          <h2 style={{ color: "#dc2626" }}>İletişim Mesajları</h2>
          {contacts.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>İsim</th>
                  <th>E-posta</th>
                  <th>Mesaj</th>
                  <th>Tarih</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                    <td>{item.date}</td>
                    <td>
                      <button onClick={() => handleDeleteContact(item.id)}>Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#4b5563", textAlign: "center" }}>
              Henüz iletişim mesajı yok
            </p>
          )}
        </div>
      )}
      {activeTab === "about" && (
        <div>
          <h2 style={{ color: "#dc2626" }}>Yeni Ekip Üyesi Ekle</h2>
          <form className="admin-form" onSubmit={handleAddAbout}>
            <input
              type="text"
              placeholder="İsim"
              value={newAbout.name}
              onChange={(e) => setNewAbout({ ...newAbout, name: e.target.value })}
            />
            <textarea
              placeholder="Açıklama"
              value={newAbout.description}
              onChange={(e) => setNewAbout({ ...newAbout, description: e.target.value })}
              rows="4"
            />
            <input
              type="text"
              placeholder="Görsel URL"
              value={newAbout.image}
              onChange={(e) => setNewAbout({ ...newAbout, image: e.target.value })}
            />
            <button type="submit">Ekle</button>
          </form>
          <h2 style={{ color: "#dc2626" }}>Ekip Üyeleri</h2>
          {aboutItems.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>İsim</th>
                  <th>Açıklama</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {aboutItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <button onClick={() => setEditAbout(item)}>Düzenle</button>
                      <button onClick={() => handleDeleteAbout(item.id)}>Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#4b5563", textAlign: "center" }}>
              Ekip üyesi eklemek içşin formu doldur
            </p>
          )}
        </div>
      )}
      {editNews && (
        <div className="modal">
          <div className="modal-content">
            <h2>Haber Düzenle</h2>
            <form onSubmit={handleEditNews}>
              <input
                type="text"
                value={editNews.title}
                onChange={(e) => setEditNews({ ...editNews, title: e.target.value })}
              />
              <textarea
                value={editNews.content}
                onChange={(e) => setEditNews({ ...editNews, content: e.target.value })}
                rows="4"
              />
              <select
                value={editNews.category}
                onChange={(e) => setEditNews({ ...editNews, category: e.target.value })}
              >
                <option value="">Kategori Seç</option>
                <option value="Teknoloji">Teknoloji</option>
                <option value="Bilim">Bilim</option>
                <option value="Spor">Spor</option>
              </select>
              <input
                type="date"
                value={editNews.date}
                onChange={(e) => setEditNews({ ...editNews, date: e.target.value })}
              />
              <input
                type="text"
                value={editNews.image}
                onChange={(e) => setEditNews({ ...editNews, image: e.target.value })}
              />
              <button type="submit">Kaydet</button>
              <button type="button" onClick={() => setEditNews(null)}>İptal</button>
            </form>
          </div>
        </div>
      )}
      {editAbout && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ekip Üyesi Düzenle</h2>
            <form onSubmit={handleEditAbout}>
              <input
                type="text"
                value={editAbout.name}
                onChange={(e) => setEditAbout({ ...editAbout, name: e.target.value })}
              />
              <textarea
                value={editAbout.description}
                onChange={(e) => setEditAbout({ ...editAbout, description: e.target.value })}
                rows="4"
              />
              <input
                type="text"
                value={editAbout.image}
                onChange={(e) => setEditAbout({ ...editAbout, image: e.target.value })}
              />
              <button type="submit">Kaydet</button>
              <button type="button" onClick={() => setEditAbout(null)}>İptal</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
