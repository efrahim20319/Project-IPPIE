const formulario = document.querySelector("#logoutLink")
formulario.addEventListener("submit", async (env) => {
    env.preventDefault()
    const requisicao = await fetch("http://localhost:3333/api/admin/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include" //Para enviar outras informacoes na requesicao, como os cookies
    })
    if (requisicao.ok) {
        window.location.href = "/entrar"
    }
})

// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }

//   var getCookies = function(){
//     var pairs = document.cookie.split(";");
//     var cookies = {};
//     for (var i=0; i<pairs.length; i++){
//       var pair = pairs[i].split("=");
//       cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
//     }
//     return cookies;
//   }