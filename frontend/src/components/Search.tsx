import React, { useState } from "react";
import axios from "axios";

const Search: React.FC = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError("");
        setResults([]);

        try {
            console.log("🔍 Sending search request:", { text: query });

            const response = await axios.post(
                "http://127.0.0.1:8000/search",
                { text: query },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("✅ Search response:", response.data);

            if (response.data.results.length === 0) {
                setError("⚠️ No results found.");
            }

            setResults(response.data.results);
        } catch (error: any) {
            console.error("❌ Search failed:", error);
            setError("⚠️ An error occurred while searching. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (!value.trim()) {
            setError(""); // clear error message when input is cleared
            setResults([]); // clear results too
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🔍 Toolhouse Search</h1>
            <div style={styles.searchBox}>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="Search for tools..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button style={styles.button} onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
            {error && <p style={styles.error}>{error}</p>}
            <ul style={styles.results}>
                {results.map((tool: any, index) => (
                    <li key={index} style={styles.resultItem}>
                        <h3 style={styles.resultTitle}>{tool.name}</h3>
                        <p style={styles.resultDescription}>{tool.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #121212, #1e1e2f)",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "20px",
        textShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
        fontFamily: "'Montserrat', sans-serif",
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50px",
        padding: "10px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.1)",
    },
    input: {
        flex: 1,
        border: "none",
        outline: "none",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "50px",
        background: "transparent",
        color: "white",
        width: "250px",
        caretColor: "#ffcc00",
    },
    button: {
        background: "linear-gradient(45deg, #007BFF, #0056b3)",
        border: "none",
        padding: "10px 20px",
        borderRadius: "50px",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        transition: "0.3s",
        boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
    },
    results: {
        listStyle: "none",
        padding: "0",
        marginTop: "20px",
        width: "80%",
        maxWidth: "400px",
    },
    resultItem: {
        background: "rgba(255, 255, 255, 0.15)",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "10px",
        transition: "0.3s",
        boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
    },
    resultTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "5px",
        color: "#ffcc00",
    },
    resultDescription: {
        fontSize: "14px",
        opacity: "0.9",
        color: "rgba(255, 255, 255, 0.8)",
    },
    error: {
        color: "#ffcc00",
        marginTop: "15px",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
    },
};

export default Search;
