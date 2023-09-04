const database = require('./database');

async function todosProdutos(){
    let sql = `SELECT * FROM produto ORDER BY id_produto DESC`;
    let resp = await database.query(sql);
    return resp;
}

async function cadastroProduto(id_usuario, id_categoria, nome, descricao, valor, estoque, categoria){
    let sql = `INSERT INTO produto (id_usuario, id_categoria, nome, descricao, valor, estoque, categoria) VALUES ('${id_usuario}', '${id_categoria}', '${nome}', '${descricao}', '${valor}', '${estoque}', '${categoria}')`;
    let resp = await database.query(sql);
    console.log(resp);
    return resp;
}

async function pegarProduto(id){
    let sql = `SELECT * FROM produto WHERE id_produto = '${id}'`;
    let resp = await database.query(sql);
    return resp;
}

async function cadastroCategoria(nome){
    let sql = `INSERT INTO categoria (nome) VALUES ('${nome}')`;
    let resp = await database.query(sql);
    return resp;
}

async function pegarCategoria(id){
    let sql = `SELECT * FROM categoria WHERE id_categoria = '${id}'`;
    let resp = await database.query(sql);
    return resp;
}

async function imagemProduto(imagem, id_produto){
    let sql = `INSERT INTO imagem (id_produto, url) VALUES ('${id_produto}', '${imagem}')`;
    let resp = await database.query(sql);
    console.log(resp);
    return resp;
}

async function pegarImagem(id){
    let sql = `SELECT * FROM imagem WHERE id_produto = '${id}'`;
    let resp = await database.query(sql);
    return resp;
}

module.exports = { todosProdutos, cadastroProduto, pegarProduto, cadastroCategoria, pegarCategoria, imagemProduto, pegarImagem };