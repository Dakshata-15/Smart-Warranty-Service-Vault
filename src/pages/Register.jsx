import "./Register.css";
import { useState } from "react";

function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleRegister() {

        if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        fetch("http://localhost:8080/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                fullName: fullName,
                email: email,
                password: password

            })

        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong");
        });

    }

    return (

        <div className="container">

            <div className="card">

                <h1>SMART WARRANTY</h1>

                <h3>Create Account</h3>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button onClick={handleRegister}>
                    Register
                </button>

                <p>
                    Already have an account?
                    <a href="/" className="loginLink">
                        Login
                    </a>
                </p>

            </div>

        </div>

    );

}

export default Register;