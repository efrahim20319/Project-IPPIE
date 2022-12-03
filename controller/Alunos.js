import AlunoModelo from "../model/Alunos";
import fs from "fs"
export default class Aluno {
    static async criarAluno(req, res, next) {
        try {
            const { nome, numero_BI, endereco, data_nascimento, nome_pai, nome_mae, numero_telefone, email, provincia_id, curso_id } = req.body
            const [foto_perfil, BI_img, certificado_img, comprovativo_img] = req.files
            const aluno = new AlunoModelo(nome, numero_BI, endereco, data_nascimento, nome_pai, nome_mae, numero_telefone, email, provincia_id, curso_id, foto_perfil.path, BI_img.path, certificado_img.path, comprovativo_img.path)
            await aluno.adiciona()
            res.json({ aluno })
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
}