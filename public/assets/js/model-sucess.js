(function ($) {
    showSwal = function (type) {
        'use strict';
        if (type === 'success-signin') {
            swal({
                title: 'Usuário cadastrado com sucesso!',
                text: 'Dados enviados corretamente.',
                type: 'success',
                button: {
                    text: "Continue",
                    value: true,
                    visible: true,
                    className: "btn btn-primary"
                }
            })
            return
        }
        if (type === 'success-message') {
            swal({
                title: 'Mensagem enviada com sucesso!',
                text: 'Será respondido por email em instantes.',
                type: 'success',
                button: {
                    text: "Continue",
                    value: true,
                    visible: true,
                    className: "btn btn-primary"
                }
            })
        } else {
            swal("Error occured !");
        }
    }

})(jQuery);