import { nanoid } from "nanoid";
import {
  deleteUrlByIdDB,
  getOpenUrlDB,
  postUrlDB,
  urlByIdDB,
  urlByUrlDB,
} from "../repositories/urls.repository.js";

export async function postUrl(req, res) {
  const { url } = req.body;

  try {
    const shortUrl = nanoid(8);
    const { userId } = res.locals.session;

    await postUrlDB(url, shortUrl, userId);

    const urlBody = await urlByUrlDB(url);

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
    const urlById = await urlByIdDB(id);
    if (urlById.rows.length === 0) return res.sendStatus(404);

    res.status(200).send(urlById.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getOpenUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await getOpenUrlDB(shortUrl);

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

    const urlById = await urlByIdDB(id);

    if (urlById.rowCount === 0) return res.sendStatus(404);

    const urlByUser = await deleteUrlByIdDB(id, userId);
    if (urlByUser.rowCount === 0) return res.sendStatus(401);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
