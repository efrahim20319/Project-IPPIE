(function ($) {
    showSwal = function (type) {
        'use strict';
        if (type === 'success-message') {
            swal({
                title: 'Cadastrado com Sucesso!',
                text: 'Você digitou dados correta!',
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
