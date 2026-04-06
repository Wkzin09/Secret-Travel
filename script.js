const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const forgotForm = document.getElementById("forgotForm");
const showForgot = document.getElementById("showForgot");
const backToLogin = document.getElementById("backToLogin");
const btnSendCode = document.getElementById("btnSendCode");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

let codigoGerado = "";
let emailRecuperacao = "";

showForgot.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    forgotForm.classList.add("active");
});

backToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    forgotForm.classList.remove("active");
    loginForm.classList.add("active");
    step1.style.display = "block";
    step2.style.display = "none";
});

btnSendCode.addEventListener("click", () => {
    emailRecuperacao = document.getElementById("forgotEmail").value;
    const usuario = localStorage.getItem(emailRecuperacao);

    if (usuario) {
        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        codigoGerado = "";
        for (let i = 0; i < 4; i++) {
            codigoGerado += letras.charAt(Math.floor(Math.random() * letras.length));
        }

        alert(`Seu código de recuperação é: ${codigoGerado}`);

        step1.style.display = "none";
        step2.style.display = "block";
        document.getElementById("forgotSubtitle").innerText = "Insira o código enviado e sua nova senha.";
    } else {
        alert("E-mail não encontrado!");
    }
});

forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const codigoInput = document.getElementById("recoveryCode").value.toUpperCase();
    const novaSenha = document.getElementById("newPassword").value;

    if (codigoInput === codigoGerado) {
        const dadosUsuario = JSON.parse(localStorage.getItem(emailRecuperacao));
        dadosUsuario.senha = novaSenha; //

        localStorage.setItem(emailRecuperacao, JSON.stringify(dadosUsuario));

        alert("Senha alterada com sucesso!");
        backToLogin.click();
    } else {
        alert("Código inválido!");
    }
});

showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
});

showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
});

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("regNome").value;
    const email = document.getElementById("regEmail").value;
    const senha = document.getElementById("regSenha").value;

    const novoUsuario = { nome, email, senha };

    localStorage.setItem(email, JSON.stringify(novoUsuario));

    alert("Cadastro realizado com sucesso! Agora você pode entrar.");
    registerForm.reset();
    showLogin.click();
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginPassword").value;

    const usuarioSalvo = localStorage.getItem(email);

    if (usuarioSalvo) {
        const dadosUsuario = JSON.parse(usuarioSalvo);

        if (dadosUsuario.senha === senha) {
            localStorage.setItem("usuarioLogado", dadosUsuario.nome);
            alert(`Bem-vindo, ${dadosUsuario.nome}! Redirecionando...`);
            window.location.href = "home.html";
        } else {
            alert("Senha incorreta!");
            showError();
        }
    } else {
        alert("Usuário não encontrado. Crie uma conta primeiro!");
        showError();
    }
});

function showError() {
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = "#ef4444";
        setTimeout(() => input.style.borderColor = "", 2000);
    });
}