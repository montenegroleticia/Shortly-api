import { db } from "../database/database.connection.js";

export async function getUserDB(userId) {
  const result = await db.query(
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
  return result;
}

export async function getRankingDB() {
  const result = await db.query(
    `SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", SUM(urls."visitsCount") AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id, users.name
        ORDER BY "visitCount" DESC
        LIMIT 10;`
  );
  return result;
}
