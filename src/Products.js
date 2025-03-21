import React, { useState, useEffect, lazy, Suspense } from "react";
import { Card, CardContent, Typography, Button, IconButton, Grid, CircularProgress } from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8087/api/products/all-products")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                const initialCart = {};
                data.forEach(product => {
                    initialCart[product._id] = 1;
                });
                setCart(initialCart);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const increaseQuantity = (id) => {
        setCart(prevCart => ({ ...prevCart, [id]: prevCart[id] + 1 }));
    };

    const decreaseQuantity = (id) => {
        setCart(prevCart => ({ ...prevCart, [id]: Math.max(1, prevCart[id] - 1) }));
    };

    const addToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = storedCart.find(item => item._id === product._id);

        if (existingProduct) {
            existingProduct.quantity += cart[product._id];
        } else {
            storedCart.push({ ...product, quantity: cart[product._id] });
        }

        localStorage.setItem("cart", JSON.stringify(storedCart));
        alert("Item added to cart! 🛒");
    };

    const buyNow = (product) => {
        const checkoutItems = [{ ...product, quantity: cart[product._id] }];
        localStorage.setItem("checkout", JSON.stringify(checkoutItems));
        navigate("/checkout");
    };

    return (
        <Suspense fallback={<CircularProgress />}>
            <Grid container spacing={3} sx={{ padding: 3 }}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                        <Card sx={{ maxWidth: 345, boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
                            <LazyLoadImage
                                src={product.image}
                                alt={product.name}
                                height="200"
                                width="100%"
                                effect="blur"
                                style={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                                <Typography variant="body1" color="textSecondary">₹{product.price}</Typography>
                                <Typography variant="body2" color="textSecondary">{product.description}</Typography>

                                <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                                    <IconButton size="small" onClick={() => decreaseQuantity(product._id)} color="primary">
                                        <Remove />
                                    </IconButton>
                                    <Typography variant="h6" sx={{ mx: 2 }}>{cart[product._id]}</Typography>
                                    <IconButton size="small" onClick={() => increaseQuantity(product._id)} color="primary">
                                        <Add />
                                    </IconButton>
                                </div>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    onClick={() => buyNow(product)}
                                >
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Suspense>
    );
};

export default ProductList;
