import React, { useState } from "react";
import "./loginPage.css";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [uid, setUid] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "https://4thyr-production.up.railway.app/api/loginUser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid,
                }),
            }
        );

        if (response.ok) {
            history.push(`./home?uid=${uid}`);
        } else {
            alert(await response.text());
        }
    };

    return (
        <div>
            <section class="container">
                <div class="login-container">
                    <div class="circle circle-one"></div>
                    <div class="form-container">
                        <img
                            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
                            alt="illustration"
                            class="illustration"
                        />
                        <h1 class="opacity">LOGIN</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="UID"
                                onChange={(e) => setUid(e.target.value)}
                            />
                            <button class="opacity">SUBMIT</button>
                        </form>
                        <div
                            class="register-forget opacity"
                            onClick={() => history.push("./register")}
                        >
                            <a href="">REGISTER</a>
                        </div>
                    </div>
                    <div class="circle circle-two"></div>
                </div>
                <div class="theme-btn-container"></div>
            </section>
        </div>
    );
};

export default LoginPage;
