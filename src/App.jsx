// npm run dev

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="garen/" element={<Home />} />
            <Route path="garen/news/:id" element={<NewsDetail />} />
            <Route path="garen/about" element={<About />} />
            <Route path="garen/login" element={<Login />} />
            <Route path="garen/contact" element={<Contact />} />
            <Route path="garen/admin" element={<AdminLogin />} />
            <Route path="garen/admin/panel" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
