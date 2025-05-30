import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      const contact = { id: Date.now(), name, email, message, date: new Date().toISOString().split("T")[0] };
      const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
      savedContacts.push(contact);
      localStorage.setItem("contacts", JSON.stringify(savedContacts));
      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <i className="fas fa-user"></i>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="İsim"
        />
      </div>
      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta"
        />
      </div>
      <div className="input-group">
        <i className="fas fa-comment"></i>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesaj"
          rows="4"
        />
      </div>
      <button type="submit">Gönder</button>
      {success && <div className="success-message">Mesaj gönderildi!</div>}
    </form>
  );
}

export default ContactForm;