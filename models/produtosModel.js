const database = require('./database');

class ProdutoModel {
    constructor(id_produto, id_usuario, id_categoria, nome, descricao, valor, estoque, categoria, imagem) {
        this.id_produto = id_produto;
        this.id_usuario = id_usuario;
        this.id_categoria = id_categoria;
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.estoque = estoque;
        this.categoria = categoria;
        this.imagem = imagem;
    }

    static async todosProdutos(){
        let sql = `SELECT * FROM produto ORDER BY id_produto DESC`;
        let resp = await database.query(sql);
        return resp;
    }

    static async cadastroProduto(id_usuario, id_categoria, nome, descricao, valor, estoque, categoria, imagem){
        let sql = `INSERT INTO produto (id_usuario, id_categoria, nome, descricao, valor, estoque, categoria, imagem) VALUES ('${id_usuario}', '${id_categoria}', '${nome}', '${descricao}', '${valor}', '${estoque}', '${categoria}', '${imagem}')`;
        let resp = await database.query(sql);
        return resp;
    }

    static async pegarProduto(id){
        let sql = `SELECT * FROM produto WHERE id_produto = '${id}'`;
        let resp = await database.query(sql);
        return resp;
    }

    static async cadastroCategoria(nome){
        let sql = `INSERT INTO categoria (nome) VALUES ('${nome}')`;
        let resp = await database.query(sql);
        return resp;
    }

    static async pegarCategoria(id){
        let sql = `SELECT * FROM categoria WHERE id_categoria = '${id}'`;
        let resp = await database.query(sql);
        return resp;
    }

    static async deleteProduto(id_produto) {
        let res = await database.query(`DELETE FROM produto WHERE id_produto = ${id_produto}`);
        return true;
    }
}

module.exports = ProdutoModel;