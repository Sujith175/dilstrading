import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import ProfileEdit from "./Pages/ProfileEdit";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Admin from "./Components/Admin/Admin";
import AllUsers from "./Components/Admin/Users/AllUsers";
import CheckoutPage from "./Pages/CheckoutPage";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsContextProvider from "./Components/Context/ProductsContext";
import CategoryContextProvider from "./Components/Context/CategoryContext";
import SignupvalContextProvider from "./Components/Context/SignupInputValContext";
import { UserContext } from "./Components/Context/AuthContext";
import LoginRedirect from "./Components/LoginRedirect";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  // const { userData } = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);

  console.log(currentUser);

  return (
    <CategoryContextProvider>
      <SignupvalContextProvider>
        <ProductsContextProvider>
          <Routes>
            {/* Navbar with Home as default route */}
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
            </Route>

            <Route path="login" element={<LoginRedirect />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedTypes={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedTypes={["user"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {/* Admin Dashboard - only accessible for admins */}
            {/* <Route
              path="/admin"
              element={
                userData?.type === "admin" ? (
                  <Admin />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            /> */}

            {/* Login Route - redirect based on user type */}
            {/* <Route
              path="/login"
              element={
                userData?.type === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : userData?.type === "user" ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <Login />
                )
              }
            /> */}

            {/* User Profile - only accessible for logged-in users */}
            {/* <Route
              path="/profile"
              element={
                userData?.type === "user" ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            /> */}

            {/* Other Routes */}
            <Route path="/users" element={<AllUsers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/editpage" element={<ProfileEdit />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Zoom}
          />
        </ProductsContextProvider>
      </SignupvalContextProvider>
    </CategoryContextProvider>
  );
};

export default App;
