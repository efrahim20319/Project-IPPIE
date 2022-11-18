(function ($) {
    showSwal = function (type) {
        'use strict';
        if (type === 'error') {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        if (type === 'success-signin') {
            Swal.fire(
                'Usuário cadastrado com sucesso!',
                'Dados enviados corretamente.',
                'success'
            )
            return
        }
        if (type === 'success-message') {
            Swal.fire(
                'Mensagem enviada com sucesso!',
                'Será respondido por email em instantes.',
                'success'
            )
        } else {
            swal("Error occured !");
        }
    }

})(jQuery);