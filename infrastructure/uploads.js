import moment from "moment";
import path from "path";
const multer = require("multer");

export default () => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./public/uploads")
        },
        filename: async function(req, file, cb) {
            const dados_aluno = req.body
            const imagem = file.originalname
            const extensao = path.extname(imagem)
            let imagem_final = ''
            imagem_final = `${dados_aluno.nome.split(' ')[0]} - ${dados_aluno.numero_BI} ${moment().format('YYYY-MM-DD HH_mm_ss')} ${imagem[0]}${extensao}`
            cb(null, imagem_final)
        }
    })
    const upload = multer({storage: storage})
    return upload
}