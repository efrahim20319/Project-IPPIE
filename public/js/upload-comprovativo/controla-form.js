const formulario = document.querySelector("form");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = window.localStorage.getItem("ippie_user_email");
  const comprovativo = document.querySelector("input[type=file]");
  const formData = new FormData();
  consfiguraFormData({ formData, email, comprovativo });
  const response = await fetch(`/api/alunos/comprovativo?email=${email}`, {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    window.localStorage.setItem("ippie_user_email", email);
    const resposta = await fetch(`/api/geraToken/${email}`);
    const { token } = await resposta.json();
    window.location = `/sucessPayment?email=${token}`;
    console.log("Everything is awesome");
    return;
  }
  console.log(await response.json());
});

function consfiguraFormData({ formData, email, comprovativo }) {
  formData.append("email", `${email}`);
  formData.append("files", comprovativo.files[0]);
}
