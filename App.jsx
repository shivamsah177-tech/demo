
import React, { useState } from "react";
import "./App.css";

// Reusable Product Card Component
function ProductCard({ product, onDelete }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p><b>Product ID:</b> {product.id}</p>
      <p><b>Price:</b> ₹{product.price}</p>
      <button
        className="delete-btn"
        onClick={() => onDelete(product.id)}
      >
        Delete
      </button>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");

  // Add Product
  const addProduct = (e) => {
    e.preventDefault();

    if (!name.trim() || !id.trim() || !price) {
      alert("Please fill all fields!");
      return;
    }

    if (products.some(p => p.id === id.trim())) {
      alert("Product ID already exists!");
      return;
    }

    const newProduct = {
      name: name.trim(),
      id: id.trim(),
      price: Number(price)
    };

    setProducts([...products, newProduct]);

    setName("");
    setId("");
    setPrice("");
  };

  // Delete Product
  const deleteProduct = (productId) => {
    setProducts(products.filter(
      product => product.id !== productId
    ));
  };

  return (
    <div className="container">
      <h1>Product Management System</h1>
      <p className="subtitle">Manage Your Store Products</p>

      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />

        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>

      <h2>All Products ({products.length})</h2>

      <div className="product-list">
        {products.length === 0 ? (
          <p className="empty-message">
            No products available. Please add a product.
          </p>
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={deleteProduct}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
