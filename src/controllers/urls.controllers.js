import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const { url } = req.body;

  try {
    const shortUrl = nanoid(8);
    const { userId } = res.locals.session;

    await db.query(
      `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
      [url, shortUrl, userId]
    );

    const urlBody = await db.query(`SELECT * FROM urls WHERE url = $1`, [url]);

    res
      .status(201)
      .send({ id: urlBody.rows[0].id, shortUrl: urlBody.rows[0].shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const urlById = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
    if (urlById.rows.length === 0) return res.sendStatus(404);

    res.status(200).send(urlById.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getOpenUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await db.query(
      `UPDATE urls SET "visitsCount" = "visitsCount"+1 WHERE "shortUrl" = $1 RETURNING url`,
      [shortUrl]
    );

    if (url.rowCount === 0) return res.sendStatus(404);

    res.redirect(url.rows[0].url);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteUrlById(req, res) {
  const { id } = req.params;

  try {
    const { userId } = res.locals.session;

    const urlById = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);

    if (urlById.rowCount === 0) return res.sendStatus(404);

    const urlByUser = await db.query(
      `DELETE FROM urls WHERE id = $1 AND "userId" = $2 RETURNING *`,
      [id, userId]
    );

    if (urlByUser.rowCount === 0) return res.sendStatus(401);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
