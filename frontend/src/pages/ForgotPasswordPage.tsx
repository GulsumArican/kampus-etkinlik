import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <section className="form-alani">
      <p>Kayıtlı e-posta adresini yaz, şifre sıfırlama bağlantısı gönderelim.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined} />
          {error && <span className="hata-metni">{error}</span>}
        </div>
        <button type="submit">Bağlantı gönder</button>
        {sent && <p className="mesaj mesaj-basari">Bağlantı {email} adresine gönderildi (demo).</p>}
      </form>
      <p className="form-linkleri">
        <Link to="/login">← Girişe dön</Link>
      </p>
    </section>
  );
}

export default ForgotPasswordPage;