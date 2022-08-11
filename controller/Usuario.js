import Usuario from "../model/Usuario";

export async function criarUsuario(req, res, next) {
  //rota para cadastrar usuario, não vi necessidade de encriptar os dados
  try {
    const { nome, email, numero_telefone } = req.body;
    const usuario = new Usuario(nome, email, numero_telefone);
    await usuario.valida();
    await usuario.adiciona();
    res.status(201).end();
  } catch (erro) {
    next(erro);
  }
}
export async function listarUsuarios(req, res) {
  const dados = await Usuario.lista();
  res.status(200).json(dados);
}
export async function obterPorID(req, res, next) {
  try {
    const id = Number(req.params[0]);
    const usuario = await Usuario.pegarPorId(id);
    res.status(200).json({ usuario });
  } catch (erro) {
    next(erro);
  }
}
export async function deletarPorID(req, res, next) {
  try {
    const id = Number(req.params[0]);
    await Usuario.deleta(id);
    res.status(204).end();
  } catch (erro) {
    next(erro);
  }
}
export async function atualizarPorID(req, res, next) {
  try {
    const id = Number(req.params[0]);
    const { nome, email, numero_telefone } = req.body;
    const usuario = new Usuario(nome, email, numero_telefone);
    await usuario.atualiza(id);
    res.status(204).end();
  } catch (erro) {
    next(erro);
  }
}
export async function obterPorEmail(req, res, next) {
  try {
    const email = req.params[0];
    const usuario = await Usuario.pegarPorEmail(email);
    res.status(200).json({ usuario });
  } catch (erro) {
    next(erro);
  }
}
