import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {

    fetch("http://localhost:8080/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    })

    .then(async response => {

        const data = await response.text();

        if (response.ok) {

            localStorage.setItem("token", data);

            alert("Login Successful");

            navigate("/dashboard");

        } else {

            alert(data);

        }

    })

    .catch(error => {

        console.log(error);

        alert("Server Error");

    });

}

    return (

        <div className="container">

            <div className="card">

                <h1>SMART WARRANTY</h1>

                <h3>Login</h3>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>
                    Login
                </button>

                <p className="registerText">
                    Don't have an account?
                <Link to="/register" className="registerLink">
                    Register
                </Link>
                </p>

            </div>

        </div>

    );

}

export default Login;