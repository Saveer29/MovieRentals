import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as UserService from "../services/userService";
import withRouter from "./common/withRouter";
import Auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { name: "", password: "", email: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await UserService.register(this.state.data);
      await Auth.loginWithJwt(response.headers["x-auth-token"]);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
