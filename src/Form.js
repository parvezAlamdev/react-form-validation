import React, { Component } from "react";
import { FormErrors } from "./FormErrors";
import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      gender: "0",
      phoneNumber: "",
      email: "",
      websiteAddress: "",
      password: "",
      formErrors: {
        email: "",
        password: "",
        name: "",
        gender: "",
        phoneNumber: "",
        websiteAddress: ""
      },
      emailValid: false,
      passwordValid: false,
      nameValid: false,
      genderValid: false,
      phoneNumberValid: false,
      websiteAddressValid: false,
      formValid: false
    };
  }

  handleUserInput = e => {debugger;
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;
    let genderValid = this.state.genderValid;
    let phoneNumberValid = this.state.phoneNumberValid;
    let websiteAddressValid = this.state.websiteAddressValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length >= 6;
        fieldValidationErrors.name = nameValid ? "" : " is invalid";
        break;
      case "gender":
        genderValid = value!="";
        fieldValidationErrors.gender = genderValid ? "" : " is invalid";
        break;
      case "phoneNumber":
        phoneNumberValid = value.match(
          /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i
        );
        fieldValidationErrors.phoneNumber = phoneNumberValid
          ? ""
          : " is invalid";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "websiteAddress":
        var urlreg = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;
        websiteAddressValid = value.match(urlreg);
        fieldValidationErrors.websiteAddress = websiteAddressValid
          ? ""
          : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        nameValid: nameValid,
        genderValid: genderValid,
        phoneNumberValid: phoneNumberValid,
        websiteAddressValid: websiteAddressValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.nameValid &&
        this.state.phoneNumberValid &&
        this.state.websiteAddressValid &&
        this.state.genderValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    return (
      <form className="demoForm">
        <h2>Please Enter The Below Information</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.name
          )}`}
        >
          <label htmlFor="email">Name</label>
          <input
            type="text"
            required
            className="form-control"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.gender
          )}`}
        >
          <label htmlFor="gender">Gender</label>
          <select name="gender" className="form-control" value={this.state.gender} onChange={this.handleUserInput}>
            <option name="gender" value="0">Male</option>
            <option name="gender" value="1">Female</option>           
          </select>
          {/* <input
            type="text"
            required
            className="form-control"
            name="gender"
            placeholder="Gender"
            value={this.state.gender}
            onChange={this.handleUserInput}
          /> */}
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="email"
            required
            className="form-control"
            name="phoneNumber"
            placeholder="text"
            value={this.state.phoneNumber}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            required
            className="form-control"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.websiteAddress
          )}`}
        >
          <label htmlFor="email">Website</label>
          <input
            type="text"
            required
            className="form-control"
            name="websiteAddress"
            placeholder="Website Address"
            value={this.state.websiteAddress}
            onChange={this.handleUserInput}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.state.formValid}
        >
          Sign up
        </button>
      </form>
    );
  }
}

export default Form;
