// Inicializa o SDK do Facebook
window.fbAsyncInit = function() {
    FB.init({
        appId      : '917368066880291', 
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
    });

    FB.AppEvents.logPageView();   
};

// Carrega o SDK do Facebook de maneira assíncrona
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Lida com o login padrão
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Valida os dados (aqui você pode adicionar sua lógica de validação)
    if (username === 'admin' && password === 'admin123') {
        document.getElementById('message').textContent = 'Login successful!';
        document.getElementById('message').style.color = 'green';
    } else {
        document.getElementById('message').textContent = 'Invalid username or password';
        document.getElementById('message').style.color = 'red';
    }
});

// Lida com o login do Facebook
document.getElementById('fb-login-btn').addEventListener('click', function() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Bem-vindo! Recuperando suas informações.... ');
            FB.api('/me', function(response) {
                console.log('Logado como: ' + response.name);
                document.getElementById('message').textContent = 'Login successful! Welcome, ' + response.name;
                document.getElementById('message').style.color = 'green';
            });
        } else {
            console.log('O usuário cancelou o login ou não autorizou.');
            document.getElementById('message').textContent = 'Facebook login failed';
            document.getElementById('message').style.color = 'red';
        }
    }, {scope: 'public_profile,email'});
});
