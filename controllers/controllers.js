export async function abreadd(req, res) {
    // Renderiza a view de adição de usuário
    res.render('usuario/add.ejs');
}

import Usuario from '../models/Usuario.js';
import Property from '../models/Property.js';
export async function add(req, res){
    let usuario = new Usuario({
        email: req.body.email,
        senha: req.body.senha,
        adm: false
    })
    await usuario.save();

    req.session.usuarioLogado = {
            id: usuario._id,
            email: usuario.email,
            adm: usuario.adm,
            senha: usuario.senha
    };

    const usuarioLogado = req.session.usuarioLogado || null;

    const properties = await Property.find();
    res.render('usuario/menu.ejs', {
        "properties": properties,
         usuarioLogado: usuarioLogado
    });
}

export async function abreAddProperty(req, res) {
    res.render('usuario/AddProperty.ejs');
}

export async function AddProperty(req, res) {
    let property = new Property({
        Tittle: req.body.titulo,
        Desc: req.body.descricao,
        Adress: req.body.endereco,
        Price: req.body.preco,
        NOfBedrooms: req.body.quartos,
        NOfBathrooms: req.body.banheiros
    })
    property.save();

    const usuarioLogado = req.session.usuarioLogado || null;
    const properties = await Property.find();
    res.render('usuario/menu.ejs', {
        "properties": properties,
        usuarioLogado: usuarioLogado
    });
}

export async function login(req, res) {
    res.render('usuario/login.ejs');
}

export async function del(req, res) {
    await Usuario.findByIdAndDelete(req.params.id);
    res.redirect('/userslist');
}

export async function PropertyDel(req, res) {
    await Property.findByIdAndDelete(req.params.id);
    res.redirect('/menu');
}

export async function GetPropertyEdit(req, res) {
    const id = req.params.id;
    const property = await Property.findById(id);

    res.render('usuario/EdtProperty.ejs', { property });
}

export async function SearchProperty(req, res) {
    let properties;
    if (req.method === 'POST') {
        const filtro = req.body.filtro || '';
        properties = await Property.find({
            Tittle: { $regex: filtro, $options: 'i' }
        });
    } else {
        properties = await Property.find({});
    }

    res.render('usuario/menu', {
        properties: properties,
        usuarioLogado: req.session.usuario
    });
}


export async function PropertyEdit(req, res) {
    await Property.findByIdAndUpdate(req.params.id, {
        Tittle: req.body.titulo,
        Desc: req.body.descricao,
        Adress: req.body.endereco,
        Price: req.body.preco,
        NOfBedrooms: req.body.quartos,
        NOfBathrooms: req.body.banheiros
    });
    res.redirect('/menu');
}

export async function UsersList(req, res) {
    const usuarioLogado = req.session.usuarioLogado || null;
    let usuarios;

    if (req.method === 'POST') {
        const filtro = req.body.filtro || '';
        usuarios = await Usuario.find({
            email: { $regex: filtro, $options: 'i' } // busca por email contendo o filtro
        });
    } else {
        usuarios = await Usuario.find({});
    }

    res.render('usuario/UsersList.ejs', {
        Usuarios: usuarios,
        usuarioLogado: usuarioLogado
    });
}

export async function fazerLogin(req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario || usuario.senha !== senha) {
            return res.render('usuario/login.ejs', {
                erro: 'Email ou senha incorretos.'
            });
        }

        // Guardar o usuário na sessão
        req.session.usuarioLogado = {
            id: usuario._id,
            email: usuario.email,
            adm: usuario.adm
        };

        const usuarioLogado = req.session.usuarioLogado || null;
        const properties = await Property.find();
        res.render('usuario/menu.ejs', {
            usuario: usuario,
            properties: properties,
            usuarioLogado: usuarioLogado
        });

    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).send('Erro interno no servidor');
    }
}


export async function WhoWeAre(req, res) {
    res.render('usuario/whoWeAre.ejs');
}

export async function Menu(req, res) {

    const usuarioLogado = req.session.usuarioLogado || null;
    const properties = await Property.find();
    res.render('usuario/menu.ejs', {
        "properties": properties,
        usuarioLogado: usuarioLogado
    });
}

export async function atualizarADM(req, res) {
    const { id, adm } = req.body;

    try {
        await Usuario.findByIdAndUpdate(id, { adm: adm === true || adm === 'true' });
        res.json({ mensagem: `Usuário ${adm === true || adm === 'true' ? 'agora é' : 'não é mais'} administrador.` });
    } catch (erro) {
        console.error('Erro ao atualizar admin:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar privilégio.' });
    }
}

export async function Profile(req, res) {
    const usuarioLogado = req.session.usuarioLogado;

    if (!usuarioLogado) {
        return res.redirect('/Login');
    }

    const usuario = await Usuario.findById(usuarioLogado.id);

    req.session.usuarioLogado = {
        id: usuario._id,
        email: usuario.email,
        adm: usuario.adm,
        senha: usuario.senha
    };

    res.render('usuario/Profile.ejs', {
        usuario,
        usuarioLogado: req.session.usuarioLogado
    });
}

export async function abreEdtUser(req, res) {
    const usuarioLogado = req.session.usuarioLogado;

    if (!usuarioLogado) {
        return res.redirect('/Login');
    }

    try {
        const usuario = await Usuario.findById(usuarioLogado.id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.render('usuario/EdtUser.ejs', { usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno ao buscar usuário');
    }
}


export async function saveEdtUser(req, res) {
    try {
        const { email, senha } = req.body;
        const updateData = { email };

        if (senha) {
            updateData.senha = senha;
        }

        await Usuario.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.redirect('/Profile');
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).send("Erro interno");
    }
}