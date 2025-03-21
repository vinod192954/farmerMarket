import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCheckout = JSON.parse(localStorage.getItem("checkout")) || [];
    setCheckoutItems(storedCheckout);
  }, []);

  const getTotalPrice = () => {
    return checkoutItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const confirmPurchase = () => {
    alert("Purchase Confirmed! 🎉");
    localStorage.removeItem("cart");
    localStorage.removeItem("checkout");
    navigate("/products");
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <div style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        {checkoutItems.length === 0 ? (
          <Typography variant="h6">No items in checkout.</Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {checkoutItems.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body1">
                        Price: ₹{item.price} x {item.quantity}
                      </Typography>
                      <Typography variant="body1">
                        Total: ₹{item.price * item.quantity}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h5" sx={{ mt: 3 }}>
              Total: ₹{getTotalPrice()}/-
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={confirmPurchase}
            >
              Confirm Purchase
            </Button>
          </>
        )}
      </div>
    </Suspense>
  );
};

export default Checkout;
