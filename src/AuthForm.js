import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material";

const AuthForm = ({ type, open, onClose }) => {
  const [isRegister, setIsRegister] = useState(type === "register");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    businessName: "",
    businessAddress: "",
  });
  const [state, setState] = useState({
    showPassword: false,
    loading: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    setIsRegister(type === "register");
    setFormData((prev) => ({ ...prev, email: "", password: "" })); // Reset only email & password
  }, [type]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true, success: false });

    try {
      const response = await fetch(
        `http://localhost:8087/api/seller/${isRegister ? "register" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(isRegister ? formData : { email: formData.email, password: formData.password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setState({ ...state, success: true, message: isRegister ? "Registration successful!" : "Login successful!" });
        
        setFormData({
          email: "",
          password: "",
          name: "",
          phone: "",
          businessName: "",
          businessAddress: "",
        });

        setTimeout(() => {
          if (!isRegister) localStorage.setItem("authToken", data.token);
          onClose();

        }, 2000);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error) {
      setState({ ...state, message: error.message });
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4">{isRegister ? "Seller Registration" : "Login"}</Typography>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
          )}
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={state.showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setState({ ...state, showPassword: !state.showPassword })}>
                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isRegister && ["phone", "businessName", "businessAddress"].map((field) => (
            <TextField key={field} fullWidth label={field.replace(/([A-Z])/g, " $1")} name={field} value={formData[field]} onChange={handleChange} margin="normal" required />
          ))}
          <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }} disabled={state.loading}>
            {state.loading ? <CircularProgress size={24} color="inherit" /> : isRegister ? "Register as Seller" : "Login"}
          </Button>
        </form>

        {state.success && <CheckCircle color="success" fontSize="large" sx={{ mt: 2 }} />}
        <Typography variant="body2" sx={{ mt: 2 }}>
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <Button onClick={() => setIsRegister(!isRegister)} sx={{ textTransform: "none" }}>
            {isRegister ? "Sign In" : "Register"}
          </Button>
        </Typography>
      </Box>

      <Snackbar open={!!state.message} autoHideDuration={3000} onClose={() => setState({ ...state, message: "" })}>
        <Alert severity={state.success ? "success" : "error"}>{state.message}</Alert>
      </Snackbar>
    </Dialog>
  );
};

export default AuthForm;
