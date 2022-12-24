import access from "./manipula-access-token"
import manipulaPaymentToken from "./manipula-paymentToken";
import refresh from "./manipula-refresh-token"
import verificacaoEmail from "./manipula-token-verificacao-email"

const tokens = {
  access,
  refresh,
  verificacaoEmail,
  manipulaPaymentToken
};

export default tokens