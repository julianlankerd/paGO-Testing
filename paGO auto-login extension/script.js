
var joomlaAdminUser = "admin", joomlaAdminPsw = "admin";

$(document).ready(function () {

    if (document.getElementById("mod-login-username") && document.getElementById("mod-login-password")) {
        document.getElementById("mod-login-username").value = joomlaAdminUser;
        document.getElementById("mod-login-password").value = joomlaAdminPsw;
        $(".btn-primary").click();
    }

})