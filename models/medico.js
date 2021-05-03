const { Schema, model } = require('mongoose');

const medicoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }

}, { collection: 'medicos' });

medicoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.mid = _id;
    return object;
});

module.exports = model('Medico', medicoSchema);