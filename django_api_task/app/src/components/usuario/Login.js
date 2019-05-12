import React, { Component } from 'react'
// import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/usuario";


export class Login extends Component {

    state = {
        nick: "",
        password: "",
        flag: false,
        alert: false,
        message: "",
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };


    componentWillMount() {
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = async  e => {
        e.preventDefault();


        await this.props.login(this.state.nick, this.state.password);

        if (this.props.isAuthenticated) {
            this.props.history.push('/')
        }




    }


    render() {

        if (localStorage.getItem("nick")) {
            return <Redirect to="/" />;
        }

        return (
            <div className="row mt-5">
                {(this.props.alert) ?
                    <div className="col-md-12 bg-red d-flex justify-content-center">
                        <div className={(this.props.flag) ? "alert alert-success w-100 text-center" : "alert alert-danger w-100 text-center"} role="alert">
                            {this.props.message}
                        </div>
                    </div>
                    : null
                }
                <div className="col-md-12 d-flex justify-content-center">
                    <div className="col-md-7 bg-light p-4 rounded shadow-lg">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="text-dark">Username</label>
                                <input type="text" className="form-control" name="nick" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label className="text-dark">Password</label>
                                <input type="password" className="form-control" name="password" onChange={this.onChange} />
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
    { login }
)(Login);
