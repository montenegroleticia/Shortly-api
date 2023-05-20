import { getRankingDB, getUserDB } from "../repositories/users.repository.js";

export async function getUser(req, res) {
  try {
    const { userId } = res.locals.session;
    const user = await getUserDB(userId);
    res.status(200).send(user.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getRanking(req, res) {
  try {
    const users = await getRankingDB();
    res.status(200).send(users.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
