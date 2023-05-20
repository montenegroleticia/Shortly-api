import { db } from "../database/database.connection.js";

export function checkingEmailDB(email) {
  const result = db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result;
}

export function signUpDB(name, email, hash) {
  const result = db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, hash]
  );
  return result;
}

export function signInDB(token, user) {
  const result = db.query(
    `INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
    [token, user.rows[0].id]
  );
  return result;
}

export function logOutDB(token) {
  const result = db.query(`DELETE FROM sessions WHERE token = $1`, [token]);
  return result;
}
