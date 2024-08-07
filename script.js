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
        hideLogoutButtons();
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
                hideLogoutButtons();
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
    console.log('Logout button clicked');
    FB.logout(function(response) {
        console.log('FB.logout response', response);
        if (response.status === 'unknown') {
            document.getElementById('message').textContent = 'Logged out from Facebook';
            document.getElementById('message').style.color = 'blue';
            hideLogoutButtons();
        } else {
            document.getElementById('message').textContent = 'Facebook logout failed';
            document.getElementById('message').style.color = 'red';
        }
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

    document.getElementById('message').textContent = 'Login successful! Welcome, ' + responsePayload.name;
    document.getElementById('message').style.color = 'green';
    hideLogoutButtons();
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
    hideLogoutButtons();
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

// Função para lidar com o login do GitHub na resposta de redirecionamento
function handleGitHubRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
        // Realizar a troca do código pelo token de acesso no servidor
        fetch(`https://your-server.com/github-oauth-callback?code=${code}&state=${state}`)
            .then(response => response.json())
            .then(data => {
                console.log('GitHub access token:', data.access_token);
                document.getElementById('message').textContent = 'Login successful! Welcome, GitHub user';
                document.getElementById('message').style.color = 'green';
                hideLogoutButtons();
                document.getElementById('github-logout-btn').style.display = 'block'; // Exibe o botão de logout do GitHub
            })
            .catch(error => {
                console.log('Error during GitHub OAuth callback:', error);
                document.getElementById('message').textContent = 'GitHub login failed';
                document.getElementById('message').style.color = 'red';
            });
    }
}

// Chamar a função para lidar com o redirecionamento do GitHub ao carregar a página
window.onload = handleGitHubRedirect;

// Função para ocultar todos os botões de logout
function hideLogoutButtons() {
    document.getElementById('fb-logout-btn').style.display = 'none';
    document.getElementById('google-logout-btn').style.display = 'none';
    document.getElementById('github-logout-btn').style.display = 'none';
}

// Lida com o logout do GitHub
document.getElementById('github-logout-btn').addEventListener('click', function() {
    document.getElementById('message').textContent = 'Logged out from GitHub';
    document.getElementById('message').style.color = 'blue';
    hideLogoutButtons();
});
