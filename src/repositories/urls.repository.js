import { db } from "../database/database.connection.js";

export async function postUrlDB(url, shortUrl, userId) {
  const result = await db.query(
    `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
    [url, shortUrl, userId]
  );
  return result;
}

export async function getOpenUrlDB(shortUrl) {
  const result = await db.query(
    `UPDATE urls SET "visitsCount" = "visitsCount"+1 WHERE "shortUrl" = $1 RETURNING url`,
    [shortUrl]
  );
  return result;
}

export async function deleteUrlByIdDB(id, userId) {
  const result = await db.query(
    `DELETE FROM urls WHERE id = $1 AND "userId" = $2 RETURNING *`,
    [id, userId]
  );
  return result;
}

export async function urlByIdDB(id) {
  const result = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
  return result;
}

export async function urlByUrlDB(url) {
  const result = await db.query(`SELECT * FROM urls WHERE url = $1`, [url]);
  return result;
}
