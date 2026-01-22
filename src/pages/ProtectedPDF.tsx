import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfFile from "../components/assets/logos/newsletters/Scorecare-Brand-name-Proposal.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ProtectedPDF = () => {
  const [pin, setPin] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const correctPin = "1234"; // <-- Set your PIN here

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsVerified(true);
    } else {
      setError("❌ Incorrect PIN, please try again");
    }
  };

  if (isVerified) {
    return (
      <div style={{ width: "100%", height: "100vh", overflowY: "scroll" }}>
        <Document file={pdfFile}>
          <Page pageNumber={1} width={window.innerWidth - 20} />
          <Page pageNumber={2} width={window.innerWidth - 20} />
          <Page pageNumber={3} width={window.innerWidth - 20} />
          <Page pageNumber={4} width={window.innerWidth - 20} />
          <Page pageNumber={5} width={window.innerWidth - 20} />
          <Page pageNumber={6} width={window.innerWidth - 20} />
        </Document>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Enter PIN to View Proposal</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f0f0f0",
  },
  title: {
    marginBottom: "15px",
    fontSize: "24px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "8px 12px",
    fontSize: "16px",
    width: "150px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#007bff",
    color: "#fff",
    border: "none",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default ProtectedPDF;
