paypal.Buttons({
  // Sets up the transaction when a payment button is clicked
  createOrder: async (data, actions) => {
    const urlParams = new URLSearchParams(window.location.search)
    const response = await fetch(`/api/alunos/email/${urlParams.get('email')}`)
    const { aluno } = await response.json()
    return fetch("/api/create-paypal-order", { //Retorna o OrderID
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [
          { id: aluno.Curso.id, quantidade: 1 },
        ] //items a serem comprados
      })
    }).then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ id }) => {
      return id
    }).catch((err) => console.error(err))

  },
  // Finalize the transaction after payer approval
  onApprove: (data, actions) => {
    return actions.order.capture().then(async function (orderData) {
      // Successful capture! For dev/demo purposes:
      console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
      const transaction = orderData.purchase_units[0].payments.captures[0];
      const email = window.localStorage.getItem('ippie_user_email')
      const resposta = await fetch(`/api/geraToken/${email}`)
      const { token } = await resposta.json()
      window.location.replace(`/sucessPayment?email=${token}`)
      // alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
      // When ready to go live, remove the alert and show a success message within this page. For example:
      // const element = document.getElementById('paypal-button-container');
      // element.innerHTML = '<h3>Thank you for your payment!</h3>';
      // Or go to another URL:  actions.redirect('thank_you.html');
    });
  }
}).render('#paypal');