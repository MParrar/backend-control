const { response } = require('express');
const Venta = require('../models/Venta');


const crearVenta = async (req, res = response) => {

    const venta = new Venta(req.body);

    try {

        venta.user = req.uid;

        const ventaGuardada = await venta.save();

        res.status(201).json({
            ok: true,
            venta: ventaGuardada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Hable con el administrador'
        });
    }



}

const listarVentas = async (req, res = response) => {

    const ventas = await Venta.find({ user: req.uid })
        .populate('user', 'name');

    res.status(200).json({
        ok: true,
        ventas
    })
}

const actualizarVenta = async (req, res = response) => {

    const ventaId = req.params.id
    const uid = req.uid;

    try {

        const venta = await Venta.findById(ventaId);

        if (!venta) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if (venta.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar'
            })
        }

        const nuevaVenta = {
            ...req.body,
            user: uid
        }

        const ventaActualizada = await Venta.findByIdAndUpdate(ventaId, nuevaVenta, { new: true });

        res.status(200).json({
            ok: true,
            venta: ventaActualizada
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mesg: 'Hable con el administrador'
        })
    }



}

const eliminarVenta = async (req, res = response) => {

    const ventaId = req.params.id
    const uid = req.uid;

    try {

        const venta = await Venta.findById(ventaId);

        if (!venta) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        // if (venta.user.toString() !== uid) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio para eliminar'
        //     })
        // }



        await Venta.findByIdAndDelete(ventaId);

        res.status(200).json({
            ok: true,
            msg: 'Venta eliminada'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mesg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    crearVenta,
    listarVentas,
    actualizarVenta,
    eliminarVenta
}