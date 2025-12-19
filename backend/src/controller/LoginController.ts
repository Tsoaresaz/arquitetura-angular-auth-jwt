import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';

export class LoginController {
  static login(req: Request, res: Response) {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        messsage: 'E-mail e senha são obrigatórios',
      });
    }

    const dbPath = path.resolve(__dirname, '../database/db.json');
    const dbFile = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(dbFile);

    const user = db.users.find((u: any) => u.email === email);
    if (!user)
      return res.status(401).json({ message: 'Credenciais inválidas' });

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      env.jwtSecret,
      {
        expiresIn: '1m',
      }
    );

    return res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  static register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Nome, e-mail e senha são obrigatórios' });
    }

    const dbPath = path.resolve(__dirname, '../database/db.json');
    const dbFile = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(dbFile);

    const emailExists = db.users.some((u: any) => u.email === email);

    if (emailExists)
      return res.status(409).json({ message: 'E-mail já cadastrado' });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
    };

    db.users.push(newUser);

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  }
}
