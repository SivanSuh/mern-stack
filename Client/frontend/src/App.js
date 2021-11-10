import React, { Component } from "react";
import axios from "axios";
import Admin from "./Admin.js";

export default class App extends Component {
  state = {
    tamIsim: "",
    emailAdress: "",
    Tur: "Web Developer",
    Fikir: "",
    alertDisplay: "none",
    alertError: "none",
    adminPanel: false,
  };

  Alanlari__Temizle = () => {
    this.setState({
      tamIsim: "",
      emailAdress: "",
      Tur: "Web Developer",
      Fikir: "",
    });
  };

  formValidation = () => {
    const { tamIsim, emailAdress, Tur, Fikir } = this.state;
    if (!tamIsim || !emailAdress || !Tur || !Fikir) return false;

    return true;
  };
  FormuGonder = () => {
    const { tamIsim, emailAdress, Tur, Fikir } = this.state;

    if (!this.formValidation()) return;
    console.log("devam");
    axios
      .post("http://localhost:5000/fikir", {
        tamIsim,
        emailAdress,
        Tur,
        Fikir,
      })
      .then(() => {
        this.Alanlari__Temizle();
        this.setState({ alertDisplay: "block" });
        setTimeout(() => {
          this.setState({ alertDisplay: "none" });
        }, 1000);
      })
      .catch(() => {
        this.setState({ alertError: "block" });
      });
  };
  render() {
    if (this.state.adminPanel) return <Admin />;

    return (
      <div className="text-center mt-3">
        <h1>Mern Stack Projesi</h1>
        <div className="mx-auto w-25">
          <div
            className="alert alert-success"
            role="alert"
            style={{ display: this.state.alertDisplay }}
          >
            Başarıyla Gönderildi
          </div>
          <div
            className="alert alert-danger"
            role="alert"
            style={{ display: this.state.alertError }}
          >
            Gonderilemedi
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Name"
              value={this.state.tamIsim}
              onChange={(e) => this.setState({ tamIsim: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={this.state.emailAdress}
              onChange={(e) => this.setState({ emailAdress: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Alanını Seç</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => this.setState({ Tur: e.target.value })}
            >
              <option>Seçiniz</option>
              <option>Game Developer</option>
              <option>Web Developer</option>
              <option>App Developer</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={this.state.Fikir}
              onChange={(e) => this.setState({ Fikir: e.target.value })}
            ></textarea>
          </div>
          <button className="btn btn-danger" onClick={this.FormuGonder}>
            Gonder
          </button>
        </div>
        <br />
        <button
          className="btn btn-dark"
          onClick={() => this.setState({ adminPanel: true })}
        >
          Admin Panel
        </button>
      </div>
    );
  }
}
