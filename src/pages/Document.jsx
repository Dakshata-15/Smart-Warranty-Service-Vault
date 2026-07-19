import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Document.css";
import { useNavigate } from "react-router-dom";

function DocumentVault() {

    const [documents, setDocuments] = useState([]);

    const [documentId, setDocumentId] = useState("");

    const [productName, setProductName] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [remarks, setRemarks] = useState("");

    const [file, setFile] = useState(null);

    const [uploadDate, setUploadDate] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadDocuments();

    }, []);

    function loadDocuments() {

        fetch("http://localhost:8080/documents")

            .then(response => response.json())

            .then(data => {

                setDocuments(data);

            });

    }

    function uploadDocument() {

        if (!file) {

            alert("Please choose a file.");

            return;

        }

        const formData = new FormData();

        formData.append("productName", productName);
        formData.append("documentType", documentType);
        formData.append("remarks", remarks);
        formData.append("file", file);

        fetch("http://localhost:8080/documents/upload", {

            method: "POST",

            body: formData

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            clearForm();

            loadDocuments();

        });

    }

    function updateDocument() {

        fetch("http://localhost:8080/documents", {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                documentId,
                productName,
                documentType,
                fileName: file ? file.name : "",
                filePath: "",
                uploadDate,
                remarks

            })

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            clearForm();

            loadDocuments();

        });

    }

    function deleteDocument(id) {

        fetch("http://localhost:8080/documents/" + id, {

            method: "DELETE"

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadDocuments();

        });

    }

    function editDocument(document) {

        setDocumentId(document.documentId);

        setProductName(document.productName);

        setDocumentType(document.documentType);

        setUploadDate(document.uploadDate);

        setRemarks(document.remarks);

        setFile(null);

    }

    function clearForm() {

        setDocumentId("");

        setProductName("");

        setDocumentType("");

        setRemarks("");

        setUploadDate("");

        setFile(null);

    }

    const filteredDocuments = documents.filter((document) =>

        document.productName.toLowerCase().includes(search.toLowerCase()) ||

        document.documentType.toLowerCase().includes(search.toLowerCase())

    );
        return (

        <div className="documentPage">

            <Link to="/dashboard" className="backButton">
                ← Back
            </Link>

            <h1>Document Vault</h1>

            <div className="documentForm">

                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                >
                    <option value="">Select Document Type</option>
                    <option value="Invoice">Invoice</option>
                    <option value="Warranty Card">Warranty Card</option>
                    <option value="User Manual">User Manual</option>
                    <option value="Service Receipt">Service Receipt</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <textarea
                    placeholder="Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                />

                <div className="buttonGroup">

                    <button
                        className="saveBtn"
                        onClick={uploadDocument}
                    >
                        Upload Document
                    </button>

                    <button
                        className="updateBtn"
                        onClick={updateDocument}
                    >
                        Update
                    </button>

                    <button
                        className="clearBtn"
                        onClick={clearForm}
                    >
                        Clear
                    </button>

                </div>

            </div>

            <div className="searchBar">

                <span className="searchIcon">
                    <FiSearch />
                </span>

                <input
                    type="text"
                    placeholder="Search Product / Document Type..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="tableContainer">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Product</th>
                            <th>Type</th>
                            <th>File Name</th>
                            <th>Upload Date</th>
                            <th>Remarks</th>
                            <th>Download</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredDocuments.map((document) => (

                                <tr key={document.documentId}>

                                    <td>{document.documentId}</td>

                                    <td>{document.productName}</td>

                                    <td>{document.documentType}</td>

                                    <td>{document.fileName}</td>

                                    <td>{document.uploadDate}</td>

                                    <td>{document.remarks}</td>

                                    <td>

                                        <a
                                            href={document.filePath}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="downloadBtn"
                                            >
                                                Download
                                            </a>

                                    </td>

                                    <td>

                                        <button
                                            className="editBtn"
                                            onClick={() => editDocument(document)}
                                        >
                                            Edit
                                        </button>

                                    </td>

                                    <td>

                                        <button
                                            className="deleteBtn"
                                            onClick={() => deleteDocument(document.documentId)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default DocumentVault;