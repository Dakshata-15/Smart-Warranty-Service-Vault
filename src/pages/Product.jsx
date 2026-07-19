import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

function Product() {

    const [products, setProducts] = useState([]);

    const [productId, setProductId] = useState("");

    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] =useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [warrantyMonths, setWarrantyMonths] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    function loadProducts() {

        fetch("http://localhost:8080/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });

    }

    function addProduct() {

        fetch("http://localhost:8080/products", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                productName,
                brand,
                category,
                price,
                purchaseDate,
                warrantyMonths

            })

        })

        .then((response) => response.text())

        .then((data) => {

            alert(data);

            clearForm();

            loadProducts();

        });

    }

    function updateProduct() {

        fetch("http://localhost:8080/products", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                productId,
                productName,
                brand,
                category,
                price,
                purchaseDate,
                warrantyMonths

            })

        })

        .then((response) => response.text())

        .then((data) => {

            alert(data);

            clearForm();

            loadProducts();

        });

    }

    function deleteProduct(id) {

        if (!window.confirm("Delete this product?")) {
            return;
        }

        fetch("http://localhost:8080/products/" + id, {

            method: "DELETE"

        })

        .then((response) => response.text())

        .then((data) => {

            alert(data);

            loadProducts();

        });

    }

    function editProduct(product) {

        setProductId(product.productId);

        setProductName(product.productName);

        setBrand(product.brand);

        setCategory(product.category);

        setPrice(product.price);

        setPurchaseDate(product.purchaseDate);

        setWarrantyMonths(product.warrantyMonths);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    function clearForm() {

        setProductId("");

        setProductName("");

        setBrand("");

        setCategory("");

        setPrice("");

        setPurchaseDate("");

        setWarrantyMonths("");

    }

    return (

        <div className="productPage">
            <div className="topBar">

            <Link to="/dashboard" className="backBtn">
                ← Back
            </Link>

            </div>

            <h1>📦 Product Management</h1>

            <div className="productForm">

                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Warranty (Months)"
                    value={warrantyMonths}
                    onChange={(e) => setWarrantyMonths(e.target.value)}
                />

                <div className="buttonGroup">

                    <button
                        className="saveBtn"
                        onClick={addProduct}
                    >
                        Save Product
                    </button>

                    <button
                        className="updateBtn"
                        onClick={updateProduct}
                    >
                        Update Product
                    </button>

                    <button
                        className="clearBtn"
                        onClick={clearForm}
                    >
                        Clear
                    </button>

                </div>

            </div>

            <h2>All Products</h2>

            <div className="tableContainer">

                <table>

                    <thead>

                    <tr>

                        <th>ID</th>

                        <th>Product</th>

                        <th>Brand</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Purchase Date</th>

                        <th>Warranty</th>

                        <th>Edit</th>

                        <th>Delete</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        products.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="9">
                                        No Products Found
                                    </td>

                                </tr>

                            )

                            :

                            (

                                products.map((product) => (

                                    <tr key={product.productId}>

                                        <td>{product.productId}</td>

                                        <td>{product.productName}</td>

                                        <td>{product.brand}</td>

                                        <td>{product.category}</td>

                                        <td>₹ {product.price}</td>

                                        <td>{product.purchaseDate}</td>

                                        <td>{product.warrantyMonths} Months</td>

                                        <td>

                                            <button
                                                className="editBtn"
                                                onClick={() => editProduct(product)}
                                            >
                                                Edit
                                            </button>

                                        </td>

                                        <td>

                                            <button
                                                className="deleteBtn"
                                                onClick={() => deleteProduct(product.productId)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )

                    }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Product;