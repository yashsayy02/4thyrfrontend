import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RegisterPage = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [uid, setUid] = useState("");
    const [showModal, setShowModal] = useState(true);

    const inputStyle = {
        width: "100%",
        padding: "5px",
    };

    const buttonStyle = {
        padding: "8px 16px",
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        const response = await fetch(
            "https://4thyr-production.up.railway.app/api/registerUser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    gender,
                    aadhar,
                    phoneNo,
                    uid: randomNumber,
                }),
            }
        );

        if(response.ok){
            setUid(randomNumber);
            setShowModal(false);
        }else{
            alert(await response.text());
        }
    };

    return showModal ? (
        <div style={{ marginTop: "10rem" }}>
            <h1 style={{ margin: "auto", textAlign: "center", color: "black" }}>
                Register
            </h1>
            <form
                style={{ maxWidth: "400px", margin: "0 auto" }}
                onSubmit={handleRegistration}
            >
                <div style={{ marginBottom: "10px", color: "black" }}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        style={inputStyle}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: "10px", color: "black" }}>
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        style={inputStyle}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={{ marginBottom: "10px", color: "black" }}>
                    <label htmlFor="phoneNo">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNo"
                        name="phoneNo"
                        style={inputStyle}
                        onChange={(e) => setPhoneNo(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: "10px", color: "black" }}>
                    <label htmlFor="aadhar">Aadhar:</label>
                    <input
                        type="text"
                        id="aadhar"
                        name="aadhar"
                        style={inputStyle}
                        onChange={(e) => setAadhar(e.target.value)}
                    />
                </div>
                <button type="submit" style={buttonStyle}>
                    Submit
                </button>
            </form>
        </div>
    ) : (
        <>
            <div
                style={{
                    marginTop: "10rem",
                    textAlign: "center",
                    color: "black",
                }}
            >
                <h1 style={{ margin: "auto", textAlign: "center" }}>
                    Your UID:
                </h1>
                <h2
                    style={{
                        margin: "20px",
                        textAlign: "center",
                        letterSpacing: "5px",
                    }}
                >
                    {uid}
                </h2>
                <button
                    type="submit"
                    style={{ ...buttonStyle, marginTop: "2rem" }}
                    onClick={() => history.push("./")}
                >
                    Go To Login
                </button>
            </div>
        </>
    );
}

export default RegisterPage;