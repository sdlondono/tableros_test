import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from "../../actions/usuario";
import { Link, Redirect } from "react-router-dom";

export class Registro extends Component {

    state = {
        nombre: "",
        apellido: "",
        nick: "",
        password: "",
        num_iden: null,
        foto: "",
        alert: false,
        flag: false,
        message: ""

    }

    componentWillMount() {
        console.log(this.props)
    }


    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = async e => {
        e.preventDefault();
        const { nombre, apellido, nick, password, num_iden, foto } = this.state;
        const user = (nombre != "" && apellido != "" && nick != "" && password != "" && num_iden != "" && foto != "") ? { nombre, apellido, nick, password, num_iden, foto } : null;


        console.log(this.props);

        if (user) {

            await this.props.register(user)

            setTimeout(() => {

                if (this.props.isAuthenticated) {
                    this.props.history.push('/')
                } else {
                    console.log("Error")
                }

            }, 1000)


        } else {
            // console.log(this.state.foto);
            this.setState({ alert: true, flag: false, message: "Llena los campos" })
        }

    }

    render() {

        if (localStorage.getItem("nick")) {
            return <Redirect to="/" />;
        }


        return (
            <div className="row mt-5">
                {(this.props.alert || this.state.alert) ?
                    <div className="col-md-12 bg-red d-flex justify-content-center">
                        <div className={(this.props.flag || this.state.flag) ? "alert alert-success w-100 text-center" : "alert alert-danger w-100 text-center"} role="alert">
                            {this.props.message || this.state.message}
                        </div>
                    </div>
                    : null
                }
                <div className="col-md-12 d-flex justify-content-center">

                    <div className="col-md-7 bg-light p-4 rounded shadow-lg">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="text-dark">Nombre</label>
                                <input type="text" className="form-control" name="nombre" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Apellido</label>
                                <input type="text" className="form-control" name="apellido" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Usuario</label>
                                <input type="text" className="form-control" name="nick" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Password</label>
                                <input type="password" className="form-control" name="password" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Numero de identificacion</label>
                                <input type="number" className="form-control" name="num_iden" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Foto</label>
                                <div className="custom-file">

                                    <input type="file" className="custom-file-input" id="validatedCustomFile" name="foto" onChange={this.onChange} />
                                    <label className="custom-file-label">Choose file...</label>
                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary w-100" value="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.usuario.isAuthenticated,
    flag: state.usuario.flag,
    alert: state.usuario.alert,
    message: state.usuario.message
});


export default connect(
    mapStateToProps,
    { register }
)(Registro);
