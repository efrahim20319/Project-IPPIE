import axios from "axios";
export default class Autenticacao {
    static estaLogado(rotaPorInvalidacao = '/entrar') {
        return async (req, res, next) => {
            try {
                const access_token = req.cookies.access_token
                const refresh_token = req.cookies.refresh_token
                const tokenIsValid = await jwtTokenIsValid(access_token)
                if (tokenIsValid) {
                    return next()
                }
                else {
                    const requisicao = await fetch('http://localhost:3333/api/admin/atualizaToken', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            refresh_token: refresh_token
                        })
                    })
                    if (requisicao.ok) {
                        const accessToken = requisicao.headers.get("Authorization")
                        const { refreshToken } = await requisicao.json()
                        if (accessToken && refreshToken) {
                            res.cookie("access_token", accessToken)
                            res.cookie("refresh_token", refreshToken)
                            return next()
                        }
                    }
                    return res.redirect(rotaPorInvalidacao)
                }
            } catch (error) {
                return res.redirect(rotaPorInvalidacao)
            }
        }
    }
}

export async function jwtTokenIsValid(token) {
    try {
        const response = await axios.post("http://localhost:3333/api/admin/tokensValidos", {}, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        })
        return response.status >= 200 && response.status < 300
    } catch (error) {
        return false
    }
}