import AlunoModelo from "../model/Alunos";
import fs from "fs"
export default class Aluno {
    static async criarAluno(req, res, next) {
        try {
            const { nome, numero_BI, endereco, data_nascimento, nome_pai, nome_mae, numero_telefone, email, provincia_id, curso_id } = req.body
            const [foto_perfil, BI_img, certificado_img, comprovativo_img] = req.files

            const aluno = new AlunoModelo({
                nome, numero_BI, endereco, data_nascimento, nome_pai, nome_mae, numero_telefone, email, provincia_id, curso_id, foto_perfil: foto_perfil.path, BI_img: BI_img.path, certificado_img: certificado_img.path, comprovativo_img: comprovativo_img ? comprovativo_img.path : null
            })
            await aluno.adiciona()
            res.status(201).json({ aluno })
        } catch (error) {
            const files = req.files
            if (files) {
                for (const file of files) {
                    fs.unlink(file.path, (erro) => {
                        if (erro) console.error("Erro ao eliminar o arquivo");
                        console.log("Arquivo eliminado com sucesso");
                    })
                }
            }
            next(error)
        }
    }

    static async enviarCertificado(req, res, next) {
        try {
            const [ comprovativo ] = req.files
            const { email } = req.body 
            const aluno = await AlunoModelo.pegarPorEmail(email, { bloquearNaAusencia: true })
            await aluno.atualizarComprovativo(comprovativo.path)
            res.status(200).end()
        } catch (error) {
            next(error)
        }
    }

    static async pegarPorEmail(req, res, next) {
        try {
            const { email } = req.params
            const aluno = await AlunoModelo.alunoPreCadastrado(email)
            res.status(200).json({ aluno })
        } catch (error) {
            next(error)
        }
    }
}