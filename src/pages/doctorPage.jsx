import React, { useEffect, useState } from "react";

const DoctorPage = () => {
    const [data, setData] = useState([]);
    const [uid, setUid] = useState("123456");
    const getFiles = async() => {
        try {
            const response = await fetch(
                "https://4thyr-production.up.railway.app/api/listAllFiles"
            );
            const data = await response.json();
            console.log(data.files)
            setData(data.files);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

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
            <button onClick={getFiles}>get files</button>
            <div>
                {data?.map((file, index) => (
                    <h4 style={{ color: "black" }} key={index}>
                        {file}
                    </h4>
                ))}
            </div>
            <input
                type="text"
                placeholder="UID"
                onChange={(e) => setUid(e.target.value)}
            />
            <button onClick={downloadCSV}>getReport</button>
        </>
    );
};

export default DoctorPage;
