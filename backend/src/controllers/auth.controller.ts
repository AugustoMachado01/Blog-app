import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  console.log("entrou");
  

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("login entoru");
  
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
     res.status(400).json({ error: 'User not found' });
     return
  }


  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400).json({ error: 'Incorrect password' });
    return
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  res.json({ token });
};
