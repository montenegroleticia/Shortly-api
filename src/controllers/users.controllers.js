import { db } from "../database/database.connection.js";

export async function getUser(req, res) {
  try {
    const { userId } = res.locals.session;
    const user = await db.query(
      ` SELECT
      users.id,
      users.name,
      SUM(urls."visitsCount") AS "visitCount",
      json_agg(json_build_object(
        'id', urls.id,
        'shortUrl', urls."shortUrl",
        'url', urls.url,
        'visitCount', urls."visitsCount"
      )) AS "shortenedUrls"
    FROM users
    LEFT JOIN urls ON users.id = urls."userId"
    WHERE users.id = $1
    GROUP BY users.id, users.name
    
  `,
      [userId]
    );
    res.status(200).send(user.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getRanking(req, res) {
  try {
    const users = await db.query(
      `SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", SUM(urls."visitsCount") AS "visitCount"
      FROM users
      LEFT JOIN urls ON users.id = urls."userId"
      GROUP BY users.id, users.name
      ORDER BY "visitCount" DESC
      LIMIT 10;`
    );
    res.status(200).send(users.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
