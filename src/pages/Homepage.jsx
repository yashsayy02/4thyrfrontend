import React from "react";
import "./homepage.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Homepage = () => {
     const location = useLocation();
     const searchParams = new URLSearchParams(location.search);
     const uid = searchParams.get("uid");

    const downloadCSV = (e) => {
        e.preventDefault();
        fetch("https://4thyr-production.up.railway.app/api/getFile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("Network response was not ok");
                    alert("file corresponding to this uid dosen't exist");
                }
                return response.blob();
            })
            .then((blob) => {
                // Create a URL for the Blob
                const url = window.URL.createObjectURL(blob);
                // Create a link element and trigger the download
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "data.csv");
                document.body.appendChild(link);
                link.click();
                // Clean up
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <header>
                <nav>
                    <div className="logo-container"></div>
                    <div className="nav-links">
                        <a
                            href="#"
                            className="hoverable"
                            data-message="Welcome to the Home Page!"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="hoverable"
                            data-message="Learn more about us!"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="hoverable"
                            data-message="Get in touch with us!"
                        >
                            Contact
                        </a>
                    </div>
                </nav>
            </header>
            <section className="hero">
                <h1>Welcome to Your Profile</h1>
                <p>
                    Discover your reports and access multiple facilities
                    directly
                </p>
                <button className="cta-button" onClick={downloadCSV}>
                    Download Report
                </button>
            </section>
            <section className="features">
                <div className="feature">
                    <a href="tel:112">
                        <img
                            src="https://www.freelogovector.com/wp-content/uploads/2017/06/40%20-%20PNG%20emergency%20copy.jpg"
                            alt="Feature 1"
                        />
                        <h2>Emergency</h2>
                        <p>Tap to call an ambulance</p>
                    </a>
                </div>
                <div className="feature">
                    <a href="https://www.livehealthily.com/">
                        <img
                            src="https://i.pinimg.com/originals/7e/4e/eb/7e4eebfd3f66d18b69139a332974d43b.png"
                            alt="Feature 2"
                        />
                        <h2>ChatBot</h2>
                        <p>
                            Have an interactive conversation with a chatbot and
                            get confusions sorted out
                        </p>
                    </a>
                </div>
                <div className="feature">
                    <a href="https://www.yashodahealthcare.com/book-an-appointment/">
                        <img
                            src="https://cdn6.f-cdn.com/contestentries/357874/17076392/56d3fa2446066_thumb900.jpg"
                            alt="Feature 3"
                        />
                        <h2>Book an Appointment</h2>
                        <p>Book your appointment with the nearest hospital</p>
                    </a>
                </div>
                <div className="feature">
                    <a href="https://pharmeasy.in">
                        <img
                            src="https://thumbs.dreamstime.com/b/delivery-medicine-icon-logo-design-element-can-be-used-as-as-complement-to-96496455.jpg"
                            alt="Feature 4"
                        />
                        <h2>Online Medical Store</h2>
                        <p>
                            Get your medicine delivered to your doorstep by
                            ordering online
                        </p>
                    </a>
                </div>
            </section>
        </>
    );
};

export default Homepage;
