import jwt_decode from "jwt-decode";


// Tries to fetch token, decode it, and store it in localStorage
// Returns {success: bool, role: string} where role is the decoded user role (Manager, Model or guest)
async function LoginFunc(form) {
    const decodeToken = (jwt_token) => {
        return JSON.stringify(jwt_decode(jwt_token));
    }
    let url = "https://localhost:7181/api/account/login";
    let result = {success: false, role: "none"};

    console.log("TRYNNA FETCH")
    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(form), // Assumes data is in an object called form
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
        if (response.ok) {
            let token = await response.json();
            localStorage.setItem("token", token.jwt);
            result.success = true;
            let decoded = decodeToken(token.jwt);
            console.log(decoded);
            console.log(decoded.search("role"));
            let substr = decoded.slice(decoded.search("role") + 7);
            let role = substr.substring(0, substr.indexOf('"'))
            result.role = role;
        } else {
            result.success = false;
            const respj = await response.json();
            console.log(respj.Message);
            alert("Server returned: " + respj.Message);
        }
    } catch (err) {
        result.success = false;
        alert("Error: " + err);
    }
    return result
};

export default LoginFunc;
