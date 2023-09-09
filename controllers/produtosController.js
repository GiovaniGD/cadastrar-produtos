const produtosModel = require("../models/produtosModel");
const usuarioModel = require("../models/usuarioModel");
let produtos = [];

function cadastroProduto(req, res) {
  res.render('cadastroProduto');
}

async function todosProdutos(req, res) {
  produtos = await produtosModel.todosProdutos();

  for (const produto of produtos) {
      let categoria = await produtosModel.pegarCategoria(produto.id_categoria);
      if (categoria && categoria.length > 0) {
          produto.categoria = categoria[0].nome;
      }
      let imagem = await produtosModel.pegarImagem(produto.id);
      if (imagem && imagem.length > 0) {
          produto.imagem = imagem[0].url;
      }
  }
  res.render('listaProdutos', { produtos });
}

async function efetivarCadastro(req, res) {
  const {nome, descricao, categoria, valor, estoque, imagem} = req.body;
  let id_usuario = req.session.usuario.id_usuario;
  console.log(req.body);
  let respEsp = await produtosModel.cadastroCategoria(categoria);
  if (respEsp.affectedRows > 0) {
      console.log('Você adicionou uma nova categoria');
  } else {
      console.log('Falha em adicionar nova categoria');
  }
  const id_categoria = respEsp.insertId;
  let resp = await produtosModel.cadastroProduto(id_usuario, id_categoria, nome, descricao, valor, estoque, categoria);
  if (resp.affectedRows > 0) {
      console.log('Você adicionou um novo produto');
      let respImg = await produtosModel.imagemProduto(imagem, resp.insertId);
      if (respImg.affectedRows > 0) {
          console.log('Você adicionou uma imagem ao produto');
      } else {
          console.log('Falha em adicionar imagem ao produto');
      }
      res.redirect('/listaProdutos');
  } else {
      console.log('Falha em cadastrar novo produto');
      res.redirect('/cadastroProduto');
  }
}

module.exports = { cadastroProduto, efetivarCadastro, todosProdutos };