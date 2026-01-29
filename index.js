import express from "express";
import mysql from "mysql2/promise";


const pool = mysql.createPool({
  servername: "localhost",
  user: "root",
  password: "Samnke@2001",
  database: "shopleft-server",
});


const app = express();
const PORT = 3000;

// READ
const getAllUsers = async () => {
  let [data] = await pool.query("SELECT * FROM users");
 return data;
};

app.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.json({ users: await getAllUsers()});
});

const getAllProducts = async () => {
  let [data] = await pool.query("SELECT * FROM products");
  console.log("All Products:", data);
  return data;
}
app.get("/products", async (req, res) => {
  const products = await getAllProducts();
  res.json({ 'products': products });
});

// DELETE
const deleteProductBaro = async () =>{
  await pool.query("DELETE FROM products WHERE name='baro'", (err, results) => {
    if (err) throw err;
    console.log("Deleted 'baro':", results);
  });
}
app.get("/delete-baro", async (req, res) => {
  await deleteProductBaro();
  res.json("Deleted product 'baro'. Check console for details.");
});
// CREATE
const insertNewProduct = async () => {
  const sql = "INSERT INTO products (name, price, category) VALUES (?, ?, ?)";
  await pool.query(sql, ["Burger", 35.00, "food"], (err, results) => {
    if (err) throw err;
    console.log("Inserted product:", results);
  });
}
app.get("/insert", async (req, res) => {
  await insertNewProduct();
  res.json("Inserted product 'Burger'. Check console for details.");
});
// UPDATE
const updateProduct = async () => {
  const sql = "UPDATE products SET price=? WHERE name=?";
  await pool.query(sql, [18.00, "milk"], (err, results) => {
    if (err) throw err;
    console.log("Updated product:", results);
  });
}
app.get("/update", async (req, res) => {
  await updateProduct();
  res.json("Updated product 'milk'. Check console for details.");
});

app.listen(PORT);
console.log(`Server is running on http://localhost:${PORT}`);
