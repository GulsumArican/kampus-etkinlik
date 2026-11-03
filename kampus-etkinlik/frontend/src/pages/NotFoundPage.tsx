import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p>Aradığınız adres mevcut değil.</p>
      <Link to="/" className="buton">Ana sayfaya dön</Link>
    </section>
  );
}

export default NotFoundPage;