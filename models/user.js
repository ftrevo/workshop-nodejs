// ----------------- Import de dependências ----------------- //
const mongoose = require('mongoose');

//Schema Mongoose de Usuário
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String
    }
}, { versionKey: false, timestamps: true });

// --------------------- Module Exports --------------------- //
module.exports = mongoose.model('User', UserSchema);
