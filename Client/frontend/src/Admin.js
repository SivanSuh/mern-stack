import React, { Component } from "react";
import axios from "axios";

export default class Admin extends Component {
  state = {
    username: "",
    password: "",
    basarılıGiris: false,
    fikirler: "",
  };

  girisYap = () => {
    const { username, password } = this.state;
    axios
      .post("http://localhost:5000/giris", { username, password })
      .then((res) => {
        if (res.data === "basarılı") {
          this.setState({ basarılıGiris: true });
          this.FikirCek();
        }
      });
  };

  FikirCek = () => {
    axios.get("http://localhost:5000/fikirler").then((res) => {
      this.setState({ fikirler: res.data });
    });
  };
  render() {
    if (this.state.basarılıGiris)
      return (
        <div className="text-center mt-3 w-50 mx-auto">
          <h1 onClick={() => console.log(this.state.fikirler)}>Fikirler</h1>
          <ul>
            {this.state.fikirler
              ? this.state.fikirler.map((item) => (
                  <div key={item.id} className="border border-primary p-2  m-2">
                    <h2>{item.isim}</h2>
                    <h3>{item.Tur}</h3>
                    <p>{item.Fikir}</p>
                  </div>
                ))
              : null}
          </ul>
        </div>
      );
    return (
      <div className="text-center mx-auto w-25 mt-5 border border-warning px-4 py-4 rounded">
        <h2>ADMİN PANEL</h2>
        <br />
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={this.girisYap}>
          Gonder
        </button>
      </div>
    );
  }
}
