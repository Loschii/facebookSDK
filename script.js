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
        hideLoginForm();
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
            FB.api('/me', { fields: 'name,email,picture,id' }, function(response) {
                console.log('Logado como: ' + response.name);
                document.getElementById('userName').textContent = response.name;
                document.getElementById('userEmail').textContent = response.email;
                document.getElementById('userPicture').src = response.picture.data.url;
                document.getElementById('userId').textContent = 'ID: ' + response.id;
                document.getElementById('message').textContent = 'Login successful! Welcome, ' + response.name;
                document.getElementById('message').style.color = 'green';
                hideLoginForm();
                document.getElementById('userInfo').style.display = 'block';
                document.getElementById('fb-logout-btn').style.display = 'block'; // Exibe o botão de logout do Facebook
            });
        } else {
            console.log('O usuário cancelou o login ou não autorizou.');
            document.getElementById('message').textContent = 'Facebook login failed';
            document.getElementById('message').style.color = 'red';
        }
    }, {scope: 'public_profile,email'});
});

// Lida com o logout do Facebook
document.getElementById('fb-logout-btn').addEventListener('click', function() {
    FB.logout(function(response) {
        document.getElementById('message').textContent = 'Logged out from Facebook';
        document.getElementById('message').style.color = 'blue';
        showLoginForm();
        document.getElementById('userInfo').style.display = 'none';
    });
});

// Função para lidar com a resposta do Google Login
function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    console.log('ID: ' + responsePayload.sub);
    console.log('Nome completo: ' + responsePayload.name);
    console.log('Primeiro nome: ' + responsePayload.given_name);
    console.log('Sobrenome: ' + responsePayload.family_name);
    console.log('Image URL: ' + responsePayload.picture);
    console.log('Email: ' + responsePayload.email);

    document.getElementById('userName').textContent = responsePayload.name;
    document.getElementById('userEmail').textContent = responsePayload.email;
    document.getElementById('userPicture').src = responsePayload.picture;
    document.getElementById('userId').textContent = 'ID: ' + responsePayload.sub;
    document.getElementById('message').textContent = 'Login successful! Welcome, ' + responsePayload.name;
    document.getElementById('message').style.color = 'green';
    hideLoginForm();
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('google-logout-btn').style.display = 'block'; // Exibe o botão de logout do Google
}

// Função para decodificar o JWT retornado pela API de autenticação do Google
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Lida com o logout do Google usando a nova API
document.getElementById('google-logout-btn').addEventListener('click', function() {
    google.accounts.id.disableAutoSelect();

    document.getElementById('message').textContent = 'Logged out from Google';
    document.getElementById('message').style.color = 'blue';
    showLoginForm();
    document.getElementById('userInfo').style.display = 'none';
});

// Lida com o login do GitHub
document.getElementById('github-login-btn').addEventListener('click', function() {
    const clientId = 'Ov23li8K0IX9NV4QVQis';
    const redirectUri = 'https://facebook-sdk-six.vercel.app/';
    const state = 'random_state_string';
    const scope = 'user';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
    window.location.href = githubAuthUrl;
});

// Lida com o logout do GitHub
document.getElementById('github-logout-btn').addEventListener('click', function() {
    document.getElementById('message').textContent = 'Logged out from GitHub';
    document.getElementById('message').style.color = 'blue';
    showLoginForm();
    document.getElementById('userInfo').style.display = 'none';
});

function hideLoginForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('fb-login-btn').style.display = 'none';
    document.getElementById('g_id_onload').style.display = 'none';
    document.querySelector('.g_id_signin').style.display = 'none';
    document.getElementById('github-login-btn').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('fb-login-btn').style.display = 'inline';
    document.getElementById('g_id_onload').style.display = 'block';
    document.querySelector('.g_id_signin').style.display = 'block';
    document.getElementById('github-login-btn').style.display = 'inline';
    document.getElementById('fb-logout-btn').style.display = 'none';
    document.getElementById('google-logout-btn').style.display = 'none';
    document.getElementById('github-logout-btn').style.display = 'none';
}
