/*
    Rutas de ventas
    host + /api/ventas


*/
const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarVenta, crearVenta, eliminarVenta, listarVentas } = require('../controllers/ventas');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use(validarJWT);


router.get('/', listarVentas);

router.post('/',
    [
        check('nombreCliente', 'El nombre del cliente es Obligatorio').not().isEmpty(),
        check('monto', 'El monto es obligatorio').not().isEmpty(),
        check('tipoDeVenta', 'El tipo de venta es obligatorio').not().isEmpty(),
        check('lugar', 'El lugar es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').custom(isDate),
        validarCampos
    ],
    crearVenta);

router.put('/:id', actualizarVenta);

router.delete('/:id', eliminarVenta);


module.exports = router;