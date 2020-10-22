const { model, Schema } = require('mongoose');

const VentaSchema = Schema({

    nombreCliente: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    tipoDeVenta: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

VentaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Venta', VentaSchema);