import conexao from '../config/conexao.js';

const PropertySchema = new conexao.Schema({
    Tittle: { type: String, required: true },
    Desc: { type: String, required: true },
    Adress: { type: String, required: true },
    Price: { type: Number, required: true },
    NOfBedrooms: { type: Number, required: true },
    NOfBathrooms: { type: Number, required: true }
})

export default conexao.model('Property', PropertySchema);