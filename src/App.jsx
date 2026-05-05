import { useState } from "react";
import "./App.css";
import hp1 from "./assets/ipong 17.jpg"; 
import hp2 from "./assets/samsung a56.jpg"; 
import hp3 from "./assets/rog 9.jpg"; 
import hp4 from "./assets/red magic.jpg"; 

const PHONE_DATA = [
  { id: 1, name: "iPhone 17 Pro", price: 18999000, brand: "Apple", specs: "A17 Pro Chip", image: hp1 },
  { id: 2, name: "Samsung A56", price: 5999000, brand: "Samsung", specs: "Exynos Powerhouse", image: hp2 },
  { id: 3, name: "ROG 9 Pro", price: 19999000, brand: "ASUS", specs: "Snapdragon 8 Elite", image: hp3 },
  { id: 4, name: "Red Magic 11", price: 19999000, brand: "Nubia", specs: "Snapdragon 8 Elite", image: hp4 },
];

function App() {
  // Semua State harus di sini
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState(0);

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsPaid(false);
  };

  const processPayment = (method) => {
    if (!address) {
      alert("Harap isi alamat pengiriman terlebih dahulu!");
      return;
    }
    if (shipping === 0) {
      alert("Harap pilih metode pengiriman!");
      return;
    }
    
    setIsPaid(true);
    setTimeout(() => {
      setSelectedProduct(null);
      setAddress(""); 
      setShipping(0);  
    }, 3000); // Pesan sukses muncul selama 3 detik
  };

  return (
    <div className="app-wrapper">
      <header className="main-header">
        <h1>Gadget<span>Pro</span></h1>
        <p>Smartphone Impian dalam Satu Klik</p>
      </header>

      <main className="grid-container">
        {PHONE_DATA.map((phone) => (
          <div key={phone.id} className="phone-card">
            <div className="badge">{phone.brand}</div>
            <div className="image-wrapper">
              <img src={phone.image} alt={phone.name} />
            </div>
            <div className="info">
              <h3>{phone.name}</h3>
              <p className="specs">{phone.specs}</p>
              <p className="price">Rp {phone.price.toLocaleString('id-ID')}</p>
              <button className="buy-btn" onClick={() => handleBuy(phone)}>
                Beli Sekarang
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* MODAL PEMBAYARAN */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!isPaid ? (
              <>
                <h2>Selesaikan Pembayaran</h2>
                
                <div className="checkout-section">
                  <label>Alamat Lengkap:</label>
                  <textarea 
                    placeholder="Contoh: Jl. Merdeka No. 123, Jakarta"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="checkout-section">
                  <label>Opsi Pengiriman:</label>
                  <select value={shipping} onChange={(e) => setShipping(Number(e.target.value))}>
                    <option value="0">-- Pilih Kurir --</option>
                    <option value="15000">JNE Reguler (Rp 15.000)</option>
                    <option value="25000">J&T Express (Rp 25.000)</option>
                    <option value="50000">GoSend Instant (Rp 50.000)</option>
                  </select>
                </div>

                <div className="order-summary">
                  <p>Produk: <strong>{selectedProduct.name}</strong></p>
                  <p>Ongkir: <strong>Rp {shipping.toLocaleString('id-ID')}</strong></p>
                  <hr />
                  <p className="total-pay">Total Bayar: <strong>Rp {(selectedProduct.price + shipping).toLocaleString('id-ID')}</strong></p>
                </div>

                <h3>Metode Pembayaran:</h3>
                <div className="payment-options">
                  <button className="pay-btn" onClick={() => processPayment("QRIS")}>Bayar via QRIS</button>
                  <button className="pay-btn" onClick={() => processPayment("Bank Transfer")}>Transfer Bank</button>
                </div>
                
                <button className="close-btn" onClick={() => setSelectedProduct(null)}>Batal</button>
              </>
            ) : (
              <div className="success-message">
                <div className="check-icon">✅</div>
                <h2>Pembayaran Berhasil!</h2>
                <p>Pesanan {selectedProduct.name} sedang diproses.</p>
                <p><small>Dikirim ke: {address}</small></p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;