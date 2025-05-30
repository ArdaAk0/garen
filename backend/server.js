// node server.js

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let news = [];
try {
  const data = fs.readFileSync("./data.json", "utf8");
  news = JSON.parse(data);
  if (!Array.isArray(news)) {
    console.error("data.json bir dizi değil, boş diziyle başlatılıyor");
    news = [];
  }
} catch (error) {
  console.error("data.json okuma/JSON parse hatası:", error.message);
  news = [];
}

app.get("/api/news", (req, res) => {
  res.json(news);
});

app.get("/api/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = news.find((news) => news.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Haber bulunamadı" });
  }
});

app.post("/api/news", (req, res) => {
  const newNews = { id: Date.now(), ...req.body };
  news.push(newNews);
  try {
    fs.writeFileSync("./data.json", JSON.stringify(news, null, 2));
    res.json(newNews);
  } catch (error) {
    console.error("data.json yazma hatası:", error.message);
    res.status(500).json({ message: "Haber eklenemedi" });
  }
});

app.put("/api/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = news.findIndex((item) => item.id === id);
  if (index !== -1) {
    news[index] = { id, ...req.body };
    try {
      fs.writeFileSync("./data.json", JSON.stringify(news, null, 2));
      res.json(news[index]);
    } catch (error) {
      console.error("data.json yazma hatası:", error.message);
      res.status(500).json({ message: "Haber güncellenemedi" });
    }
  } else {
    res.status(404).json({ message: "Haber bulunamadı" });
  }
});

app.delete("/api/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = news.findIndex((item) => item.id === id);
  if (index !== -1) {
    const deleted = news.splice(index, 1);
    try {
      fs.writeFileSync("./data.json", JSON.stringify(news, null, 2));
      res.json(deleted);
    } catch (error) {
      console.error("data.json yazma hatası:", error.message);
      res.status(500).json({ message: "Haber silinemedi" });
    }
  } else {
    res.status(404).json({ message: "Haber bulunamadı" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT} adresinde çalışiyor`);
});