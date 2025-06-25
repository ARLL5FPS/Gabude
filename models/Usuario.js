import conexao from '../config/conexao.js';

const UsuarioSchema = new conexao.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },
    adm:  { type: Boolean, required: true , default: false}
})

export default conexao.model('Usuario', UsuarioSchema);