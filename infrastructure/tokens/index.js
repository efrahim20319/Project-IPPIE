import access from "./manipula-access-token"
import manipulaPaymentToken from "./manipula-paymentToken";
import refresh from "./manipula-refresh-token"
import manipulaSuperAdminToken from "./manipula-superAdminToken";
import verificacaoEmail from "./manipula-token-verificacao-email"

const tokens = {
  access,
  refresh,
  verificacaoEmail,
  manipulaPaymentToken,
  manipulaSuperAdminToken
};

export default tokens