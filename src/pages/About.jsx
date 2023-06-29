import { Link } from "react-router-dom";

export default function About() {
  return (
    <main>
      <h1>Tentang E-Shoes</h1>
      <p>Toko E-Shoes, pilihan lengkap sepatu untuk gaya dan kenyamanan Anda.</p>
      <Link to="/">Kembali ke Beranda</Link>
    </main>
  );
}
