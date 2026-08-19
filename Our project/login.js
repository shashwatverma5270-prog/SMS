document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) {
        return;
    }

    loginBtn.onclick = function () {

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value.trim();


        // Check empty fields
        if (username === "" || password === "") {

            alert("Please enter Username and Password");

            return;
        }


        // Demo admin login
        if (username === "admin" && password === "admin123") {

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Username or Password");

        }

    };

});