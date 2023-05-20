import { db } from "../database/database.connection.js";

export async function checkingEmailDB(email) {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result;
}

export async function signUpDB(name, email, hash) {
  const result = await db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, hash]
  );
  return result;
}

export async function signInDB(token, user) {
  const result = await db.query(
    `INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
    [token, user.rows[0].id]
  );
  return result;
}

export async function logOutDB(token) {
  const result = await db.query(`DELETE FROM sessions WHERE token = $1`, [token]);
  return result;
}
