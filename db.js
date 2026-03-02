const mysql = require("mysql2/promise");

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

const pool = mysql.createPool({
  host: need("DB_HOST"),
  port: Number(need("DB_PORT")),
  user: need("DB_USER"),
  password: need("DB_PASSWORD"),
  database: need("DB_NAME"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection error:", err.message);
  }
})();

module.exports = pool;
