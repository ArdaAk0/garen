import axios from "axios";

export const getNews = async () => {
  const news = JSON.parse(localStorage.getItem("news") || "[]");
  console.log("getNews - LocalStorage:", news);
  return news;
};

export const addNews = async (news) => {
  const currentNews = await getNews();
  const newNews = { id: Date.now(), ...news };
  localStorage.setItem("news", JSON.stringify([...currentNews, newNews]));
};

export const updateNews = async (id, updatedNews) => {
  const currentNews = await getNews();
  const updated = currentNews.map((item) =>
    item.id === id ? { ...item, ...updatedNews } : item
  );
  localStorage.setItem("news", JSON.stringify(updated));
};

export const deleteNews = async (id) => {
  const currentNews = await getNews();
  const updated = currentNews.filter((item) => item.id !== id);
  localStorage.setItem("news", JSON.stringify(updated));
};

export const getContacts = async () => {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  return contacts;
};

export const addContact = async (contact) => {
  const currentContacts = await getContacts();
  const newContact = { id: Date.now(), ...contact };
  localStorage.setItem("contacts", JSON.stringify([...currentContacts, newContact]));
};

export const deleteContact = async (id) => {
  const currentContacts = await getContacts();
  const updated = currentContacts.filter((item) => item.id !== id);
  localStorage.setItem("contacts", JSON.stringify(updated));
};

export const getAbout = async () => {
  const about = JSON.parse(localStorage.getItem("about") || "[]");
  return about;
};

export const addAbout = async (about) => {
  const currentAbout = await getAbout();
  const newAbout = { id: Date.now(), ...about };
  localStorage.setItem("about", JSON.stringify([...currentAbout, newAbout]));
};

export const updateAbout = async (id, updatedAbout) => {
  const currentAbout = await getAbout();
  const updated = currentAbout.map((item) =>
    item.id === id ? { ...item, ...updatedAbout } : item
  );
  localStorage.setItem("about", JSON.stringify(updated));
};

export const deleteAbout = async (id) => {
  const currentAbout = await getAbout();
  const updated = currentAbout.filter((item) => item.id !== id);
  localStorage.setItem("about", JSON.stringify(updated));
};

export const fetchNewsFromApi = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/news");
    return response.data;
  } catch (error) {
    console.error("API haber çekme hatası:", {
      message: error.message,
      code: error.code,
      response: error.response ? error.response.data : null,
      request: error.request ? error.request : null,
    });
    return [];
  }
};

export const fetchNewsByIdFromApi = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("API tek haber çekme hatası:", {
      message: error.message,
      code: error.code,
      response: error.response ? error.response.data : null,
    });
    return null;
  }
};

export const addNewsToApi = async (news) => {
  try {
    const response = await axios.post("http://localhost:5000/api/news", news);
    return response.data;
  } catch (error) {
    console.error("API haber ekleme hatası:", error);
  }
};

export const updateNewsInApi = async (id, news) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/news/${id}`, news);
    return response.data;
  } catch (error) {
    console.error("API haber güncelleme hatası:", error);
  }
};

export const deleteNewsFromApi = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("API haber silme hatası:", error);
  }
};