const form = document.querySelector('form');

const lastname = document.getElementById('lastname');
const firstname = document.getElementById('firstname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const code = document.getElementById('code');
const type1 = document.getElementById('type1');
const type2 = document.getElementById('type2');

function sendEmail() {
    const bodyMessage = `Nom : ${lastname.value} <br> 
    Prénom : ${firstname.value} <br> 
    Email : ${email.value} <br> 
    Téléphone : ${phone.value} <br> 
    Code postal : ${code.value} <br>
    Type de projet : ${type1.checked ? type1.value : type2.value}`;


    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "exemple.landing.page@gmail.com",
        Password: "FAC28C3710303E5A51CD61640B81F8597740",
        To: 'exemple.landing.page@gmail.com',
        From: "exemple.landing.page@gmail.com",
        Subject: "Formulaire de contact",
        Body: bodyMessage
    }).then(
        message => {
            if (message === 'OK') {
                Swal.fire({
                    title: "Confirmé !",
                    text: "Votre message a bien été envoyé.",
                    icon: "success"
                  });
            } else {
                console.error(message);
                alert('Une erreur est survenue lors de l\'envoi du message.');
        }
    }
    );
}

function checkInputs() {
    const fields = document.querySelectorAll('.field');

    for (const field of fields) {
        if (field.value == "") {
            field.classList.add('error');
            field.parentElement.classList.add('error');
        }

        if (fields[2].value != "") {
            checkEmail();
        }
        fields[2].addEventListener("keyup", checkEmail);

        if (fields[3].value != "") {
            checkPhone();
        }
        fields[3].addEventListener("keyup", checkPhone);

        if (fields[4].value != "") {
            checkCode();
        }
        fields[4].addEventListener("keyup", checkCode);

        field.addEventListener("keyup", () => {
            field.classList.remove('error');
            field.parentElement.classList.remove('error');
        });
    }

    checkType();
    checkCgu();
}

function checkEmail() {
    const emailValue = email.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailErrorTxt = document.querySelector('.error-txt.email');

    if (!emailValue.match(emailPattern)) {
        email.classList.add('error');
        email.parentElement.classList.add('error');

        if (emailValue != "") {
            emailErrorTxt.innerText = "Veuillez entrer une adresse email valide.";
        } else {
            emailErrorTxt.innerText = "L'adresse mail doit être renseignée.";
        }

    } else {
        email.classList.remove('error');
        email.parentElement.classList.remove('error');
    }
}

function checkPhone () {
    const phoneValue = phone.value;
    const phonePattern = /^0[1-9]\d{8}$/;
    const phoneErrorTxt = document.querySelector('.error-txt.phone');

    if (!phoneValue.match(phonePattern)) {
        phone.classList.add('error');
        phone.parentElement.classList.add('error');

        if (phoneValue != "") {
            phoneErrorTxt.innerText = "Veuillez entrer un numéro de téléphone valide.";
        } else {
            phoneErrorTxt.innerText = "Le numéro de téléphone doit être renseigné.";
        }

    } else {
        phone.classList.remove('error');
        phone.parentElement.classList.remove('error');
    }
}

function checkCode () {
    const codeValue = code.value;
    const codePattern = /^[0-9]{5}$/;
    const codeErrorTxt = document.querySelector('.error-txt.code');

    if (!codeValue.match(codePattern)) {
        code.classList.add('error');
        code.parentElement.classList.add('error');

        if (codeValue != "") {
            codeErrorTxt.innerText = "Veuillez entrer un code postal valide.";
        } else {
            codeErrorTxt.innerText = "Le code postal doit être renseigné.";
        }

    } else {
        code.classList.remove('error');
        code.parentElement.classList.remove('error');
    }
}

function checkType() {
    const type1 = document.getElementById('type1');
    const type2 = document.getElementById('type2');

    if (!type1.checked && !type2.checked) {
        type1.parentElement.parentElement.classList.add('error');
    } else {
        type1.parentElement.parentElement.classList.remove('error');
    }
}

function checkCgu() {
    const cgu = document.getElementById('cgu');

    if (!cgu.checked) {
        cgu.parentElement.parentElement.classList.add('error');
    } else {
        cgu.parentElement.parentElement.classList.remove('error');
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (document.querySelectorAll('.error').length == 0) {
        sendEmail();

        form.reset();
    }
   
});