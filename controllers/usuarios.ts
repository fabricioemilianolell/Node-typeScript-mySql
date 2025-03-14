import { Request, response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res = response) => {

    const usuarios = await Usuario.findAll();

    res.json({usuarios});
}


export const getUsuario = async (req: Request, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if(usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `no existe un usuario con el id ${id}`
        })
    }

}


export const postUsuario = async(req: Request, res = response) => {

    const { body } = req

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeEmail) {
            return res.status(400).json({
                msg:`ya existe un usuario con el email ${body.email}`
            })
        }

        const usuario = new Usuario(body)
        await usuario.save()

        res.json(usuario)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        })
    }

}


export const putUsuario = async (req: Request, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if(!usuario) {
            return res.status(404).json({
                msg: "No existe un usuario con el id:" + id
            })
        }

        await usuario.update(body);

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        })
    }
}



export const eliminarUsuario = async (req: Request, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if(!usuario) {
        return res.status(404).json({
            msg: "No existe un usuario con el id:" + id
        })
    }

    await usuario.update({ estado: false });

    // await usuario.destroy();

    res.json(usuario);
}

