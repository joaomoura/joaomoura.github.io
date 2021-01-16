// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const telefone = document.querySelector("#telefone");
const aceito = document.querySelector("#aceito");

const contact = document.querySelector('.menu-lista-contato');

contact.addEventListener('click', function(event) {
    ga('send', 'event', 'menu', 'entre_em_contato', 'link_externo', {
        hitCallback: () =>  console.log('Evento enviado.')
    });
   
});

const downloadPdf = document.querySelector('.menu-lista-download');
downloadPdf.addEventListener('click', (event) =>
    ga('send', 'event', 'menu', 'download_pdf', 'download_pdf', {
        hitCallback: () =>  console.log('Evento enviado.')
    })
   
);

const montadoras = document.querySelectorAll('.card-montadoras');
montadoras.forEach((montadora) => 
    montadora.addEventListener('click', function(event) {
        let name = this.getAttribute('data-name');
        ga('send', 'event', 'analise', 'ver_mais', name, {
            hitCallback: () =>  console.log('Evento enviado.')
        });
    })
);

const inputs = document.querySelectorAll('input');
inputs.forEach((input) =>
    input.addEventListener('change', (event) => {
        if(input.type == 'checkbox' && input.checked == false) {
            return;
        }
        if(input.value.trim() == '') {
            return;
        }

        let idInput = input.getAttribute('id');
        ga('send', 'event', 'contato', idInput, 'preencheu', {
            hitCallback: () =>  console.log('Evento enviado.')
        });
    })
);

function sendEventAnalyticsForm() {
    if(checkIfInputsFormAllFilleds()) {
        ga('send', 'event', 'contato', 'enviado', 'enviado', {
            hitCallback: () =>  console.log('Evento enviado.')
        });
    }
}

function checkIfInputsFormAllFilleds() {
    return checkIfInputsFilleds(nome, email, telefone, aceito);
}

function checkIfInputsFilleds(...args) {
    let resp = true;
    args.forEach((input) => {
        if(input.type == 'checkbox' && input.checked == false) {
            resp = false;
        }
        if(input.value == '') {
            resp = false;
        }
    });
    return resp;
}