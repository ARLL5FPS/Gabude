import express from 'express';
const router = express.Router();

import { 
    abreadd, 
    add, 
    del,
    UsersList,
    login,
    fazerLogin,
    abreAddProperty,
    AddProperty,
    WhoWeAre,
    Menu,
    atualizarADM,
    PropertyDel,
    GetPropertyEdit,
    PropertyEdit,
    SearchProperty,
    Profile,
    abreEdtUser,
    saveEdtUser
} from '../controllers/controllers.js';

router.get('/add', abreadd);
router.post('/add', add);
router.get('/del/:id', del);
router.get('/PropertyDel/:id', PropertyDel);
router.get('/editProperty/:id', GetPropertyEdit);
router.post('/editProperty/:id', PropertyEdit);
router.get('/UsersList', UsersList);
router.post('/UsersList', UsersList);
router.get('/Login', login);
router.post('/Login', fazerLogin);
router.get('/AddProperty', abreAddProperty);
router.post('/AddProperty', AddProperty);

router.get('/whoweare', WhoWeAre);
router.get('/menu', Menu);

router.post('/updateAdm', atualizarADM);

router.post('/SearchProperty', SearchProperty);
router.get('/Profile', Profile);

router.get('/abreEdtUser/:id', abreEdtUser);
router.post('/editUser/:id', saveEdtUser);

export default router;