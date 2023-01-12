import Movies from "./components/movies";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "font-awesome/css/font-awesome.css";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import Rentals from "./components/rentals";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import Logout from "./components/logout";
import Auth from "./services/authService";
import React, { Component } from "react";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = Auth.getCurrentUser();

    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies/:id" element={<MovieForm user={user} />} />
            <Route path="/movies" element={<Movies user={user} />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
