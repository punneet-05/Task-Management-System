import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export const register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.create({
    data: { email: req.body.email, password: hashed },
  });
  res.json(user);
};

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res.json({ accessToken, refreshToken });
};
