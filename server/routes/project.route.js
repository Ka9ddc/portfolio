/* Rotas do antigo CRUD do usuário, pode ignorar */

import { Router } from "express";
import Project from "../models/Project.js";
import sgMail from '@sendgrid/mail'

const router = Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const createProject = async (req, res) => {
  try {
    const { name, email, project, message } = req.body;

    if (!name || !email || !project || !message) {
      return res
        .status(400)
        .send({ message: "Fill all fields to send a project!" });
    }

    const newProject = await Project.create(req.body);

    if (!newProject) {
      return res.status(400).send({ message: "Error creating project" });
    }

    const msg = {
      to: 'ryanmicaelb@gmail.com', // Seu endereço de email aqui
      from: process.env.EMAIL, // Seu endereço de email aqui
      subject: 'Novo Projeto',
      text: `Nome: ${name}\nEmail: ${email}\nProjeto: ${project}\nMensagem: ${message}`,
    };
    
    sgMail.send(msg)
      .then(() => {
        console.log('Email enviado');
      })
      .catch((error) => {
        console.error(error);
      });


    return res.status(200).send({ message: "Project sent successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

router.post("/", createProject);

export default router;
