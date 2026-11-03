import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section className="form-alani">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined} />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>
        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? true : undefined} />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>
        <button type="submit">Giriş yap</button>
        {sent && <p className="mesaj mesaj-basari">Bilgiler geçerli. Gerçek giriş Sprint 10'da eklenecek.</p>}
      </form>
      <p className="form-linkleri">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </section>
  );
}

export default LoginPage;