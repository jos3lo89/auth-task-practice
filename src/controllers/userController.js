import userModel from "../models/userModel.js";
import { JWT_SECRET } from "../config/config.js";
import createToken from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { usuario, correo, clave } = req.body;

    const userFound = await userModel.findOne({ correo: correo });
    if (userFound)
      return res.status(406).json({ mensaje: ["usuaio existente"] });

    const claveHash = await bcrypt.hash(clave, 10);

    const newUser = new userModel({
      usuario,
      correo,
      clave: claveHash,
    });

    const userSaved = await newUser.save();

    res.status(201).json(userSaved);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    const userFound = await userModel.findOne({ correo: correo });
    if (!userFound)
      return res.status(400).json({ mensaje: ["usuaio no existente"] });

    const isMatch = await bcrypt.compare(clave, userFound.clave);
    if (!isMatch)
      return res.status(400).json({ mensaje: ["clave incorrecta"] });

    const token = await createToken({ id: userFound._id });

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      id: userFound._id,
      usuario: userFound.usuario,
      correo: userFound.correo,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyToken = async (req, res) => {
  try {

    console.log(req.user)

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ mensaje: ["token requerido"] });

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ mensaje: ["token invalido"] });

      const userFound = await userModel.findById(user.id)
      if(!userFound) return res.status(401).json({mensaje: ["usuario no encontrado"]})

      return res.status(200).json({
        id: userFound._id,
        usuario: userFound.usuario,
        correo: userFound.correo
      })

    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensaje: [error.message] });
  }
};
