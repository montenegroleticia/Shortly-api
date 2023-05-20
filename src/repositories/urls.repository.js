import { db } from "../database/database.connection.js";

export function postUrlDB(url, shortUrl, userId) {
  const result = db.query(
    `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
    [url, shortUrl, userId]
  );
  return result;
}

export function getOpenUrlDB(shortUrl) {
  const result = db.query(
    `UPDATE urls SET "visitsCount" = "visitsCount"+1 WHERE "shortUrl" = $1 RETURNING url`,
    [shortUrl]
  );
  return result;
}

export function deleteUrlByIdDB(id, userId) {
  const result = db.query(
    `DELETE FROM urls WHERE id = $1 AND "userId" = $2 RETURNING *`,
    [id, userId]
  );
  return result;
}

export function urlByIdDB(id) {
  const result = db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
  return result;
}

export function urlByUrlDB(url) {
  const result = db.query(`SELECT * FROM urls WHERE url = $1`, [url]);
  return result;
}
