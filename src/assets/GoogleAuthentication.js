/// <reference path="./jquery-3.3.1.min.js" />

    function getAccessToken() {
    console.log("Test");
    if (location.hash) {
        if (location.hash.split('access_token=')) {
            var accessToken = location.hash.split('access_token=')[1].split('&')[0];
            if (accessToken) {
                isUserRegistered(accessToken);
            }
        }
    }
}

function isUserRegistered(accessToken) {
    console.log(accessToken);
    $.ajax({
        url: 'http://localhost:49685/api/Account/UserInfo',
        method: 'GET',
        headers: {
            'content-type': 'application/JSON',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            console.log(response);
            if (response.HasRegistered) {               
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('userName', response.Email);
               // window.location.href = "http://localhost:4200/view";
            }
            else {
                signupExternalUser(accessToken);
            }
        }
    });    
}


function signupExternalUser(accessToken) {
    
    $.ajax({
        url: 'http://localhost:49685/api/Account/RegisterExternal',
        method: 'POST',
        headers: {
            'content-typez': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function () {
            console.log("Sign up");
            window.location.href="http://localhost:49685/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fdashboard&state=oIHzYNikreT1WZ05yEvNqSpHARsywtU7bQyUUb73au01";     
    
        }
    });
}