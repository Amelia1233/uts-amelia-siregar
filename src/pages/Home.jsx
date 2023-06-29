import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sneakers”",
      image: "/2.jpg",
      price: 900000,
      kategori:"Sepatu"
    },
    {
      id: 2,
      name: "Wedges",
      image: "/3.jpg",
      price: 870000,
      kategori:"Sepatu"
    },
    {
      id: 3,
      name: "Peep Toe Heels",
      image: "/10.jpg",
      price: 160999,
      kategori:"Sepatu"
    },
    {
      id: 4,
      name: "Flat Shoes",
      image: "/4.jpg",
      price: 600099,
      kategori:"Sepatu"
    },
    {
      id: 5,
      name: "Ballerina Flats",
      image: "/5.jpg",
      price: 700990,
      kategori:"Sepatu"
    },
    {
      id: 6,
      name: "Loafers",
      image: "/9.jpg",
      price: 239999,
      kategori:"Sepatu"
    },
    {
      id: 7,
      name: "Boots",
      image: "/6.jpg",
      price: 299999,
      kategori:"Sepatu"
    },
    {
      id: 8,
      name: "Stiletto",
      image: "/7.jpg",
      price: 199999,
      kategori:"Sepatu"
    },
    {
      id: 9,
      name: "Mary Janes",
      image: "/8.jpg",
      price: 159999,
      kategori:"Sepatu"
    },
    {
        id: 10,
        name: "Peep Toe Heels",
        image: "/3.jpg",
        price: 160999,
        kategori:"Sepatu"
      },
      {
        id: 11,
        name: "Flat Shoes",
        image: "/4.jpg",
        price: 600099,
        kategori:"Sepatu"
      },
      {
        id: 12,
        name: "Ballerina Flats",
        image: "/5.jpg",
        price: 700990,
        kategori:"Sepatu"
      },

  ]);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);



  const filteredSortedProducts = products
  .sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    } else {
      return a[sortBy] > b[sortBy] ? -1 : 1;
    }
  })
  .filter(
    (product) =>
      product.name.toLowerCase().includes(keyword) &&
      product.price >= minPrice &&
      product.price <= maxPrice
  );

  return (
    <div className="products">
      <header>
        <label>
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Harga:
          <label>
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
        </section>
        <section>
          Urutkan:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Normal</option>
            <option value="name">Nama</option>
            <option value="price">Harga</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <button  onClick={() => setIsCartOpen(true)}>
          Keranjang: {cart.reduce((a, p) => a + p.count, 0)}
        </button>
      </header>
      <main>
        {filteredSortedProducts.length > 0
          ? filteredSortedProducts
              .filter((_product, i) => i >= 4 * page - 4 && i < 4 * page)
              .map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  setEditedProduct={setEditedProduct}
                />
              ))
          : "Tidak ada produk ditemukan."}
          
      </main>
      <footer>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % 4 === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(filteredSortedProducts.length / 4)}
        >
          Berikutnya
        </Button>
      </footer>
      {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Produk</h1>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Gambar
            <input
              type="url"
              value={editedProduct.image}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  image: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Kategori
            <input
              type="text"
              value={editedProduct.kategori}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  kategori: parseInt(e.target.value),
                })
              }
            />
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
        
      )}
    </div>
  );
}
