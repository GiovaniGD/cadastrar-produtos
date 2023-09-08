const database = require("./database");
const md5 = require("md5");

class UsuarioModel {
  constructor(id_usuario, nome, email, senha) {
    this.id_usuario = id_usuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static async verificarUsuario(email, senha) {
    console.log("Verificando usuário");
    let sql = `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${md5(senha)}'`;
    let resp = await database.query(sql);
    
    if (resp.length > 0) {
        return resp;
    } else {
        return null;
    }
  }

  static async verificarEmail(email) {
    console.log("Verificando email");
    let sql = `SELECT * FROM usuarios WHERE email = '${email}'`;
    let resp = await database.query(sql);
    return resp;
  }

  static async cadastrarUsuario(nome, email, senha) {
    console.log("Cadastrando usuário");
    let sql = `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${md5(senha)}')`;
    let resp = await database.query(sql);
    if (resp.insertId) {
        return resp;
    } else {
        return null;
    }
  }
}

module.exports = UsuarioModel;
