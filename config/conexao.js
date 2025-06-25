import mongoose from "mongoose";

const conexao = await mongoose.connect("mongodb+srv://raphaell:123@cluster0.gwll3uj.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default conexao;