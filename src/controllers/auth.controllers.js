import {
  checkingEmail,
  logOutDB,
  signInDB,
  signUpDB,
} from "../repositories/auth.repository.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { email, password, name } = req.body;

  try {
    const user = await checkingEmail(email);
    if (user.rows[0] != null)
      return res.status(409).send("E-mail já cadastrado");

    const hash = bcrypt.hashSync(password, 10);

    await signUpDB(name, email, hash);

    res.status(201).send("Conta criada com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await checkingEmail(email);
    if (!user.rows[0])
      return res.status(401).send("Esse e-mail não foi cadastrado");

    const passwordCorrect = bcrypt.compareSync(password, user.rows[0].password);
    if (!passwordCorrect) return res.status(401).send("Senha incorreta");

    const token = uuid();
    await signInDB(token, user);

    res.send({ token, userName: user.rows[0].name, userId: user.rows[0].id });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function logOut(req, res) {
  try {
    const { token } = res.locals.session;
    await logOutDB(token);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
