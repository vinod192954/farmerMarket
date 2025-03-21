import React, { useState, useEffect, lazy, Suspense } from "react";
import { Card, CardContent, Typography, Button, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const goToCheckout = () => {
        localStorage.setItem("checkout", JSON.stringify(cartItems));
        navigate("/checkout");
    };

    return (
        <Suspense fallback={<CircularProgress />}>
            <div style={{ padding: 20 }}>
                <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
                {cartItems.length === 0 ? (
                    <Typography variant="h6">Your cart is empty.</Typography>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {cartItems.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography variant="body1">Price: ₹{item.price} x {item.quantity}</Typography>
                                            <Typography variant="body1">Total: ₹{item.price * item.quantity}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant="h5" sx={{ mt: 3 }}>Total: ₹{getTotalPrice()}</Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={goToCheckout}
                        >
                            Proceed to Checkout
                        </Button>
                    </>
                )}
            </div>
        </Suspense>
    );
};

export default Cart;
