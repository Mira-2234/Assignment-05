console.log('hello world');

document.getElementById("signin-btn")
.addEventListener("click", function(){
    console.log("sing in button cliked");

    // 1. get the username input
    const usernameInput = document.getElementById("login-username");
    const userName = usernameInput.value;
    console.log(userName);

    // 2. get the password input

    const pinInput = document.getElementById("input-pin");
    const pinNumber = pinInput.value;
    console.log(pinNumber);

    // 3. match password & username
    if(pinNumber == "admin123" && userName == "admin"){

        //    3.1- true -> alert> hompage
        alert("Login success");
        // window.location.replace("/home.html");
        window.location.assign("/home.html");
    } else{
        //    3.2- false -> alert> return
        alert("Login failed");
        return;

    }
})