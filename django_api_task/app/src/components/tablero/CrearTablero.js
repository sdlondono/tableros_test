import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTablero, createTablero } from "../../actions/tablero";
import { getIdea } from '../../actions/idea';
import axios from 'axios';

import 'babel-core/register';
import 'babel-polyfill';
let ideas = []
export class CrearTablero extends Component {


    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            stateCheck: false,
            idTablero: null,
            comment: "",
            tablero: [],
            idea: [],
        }


    }

    async componentWillMount() {

        await this.props.getTablero()

        setTimeout(() => {
            this.props.tablero.map((e) => {
                ideas = []
                this.onIdea(e.id)
            })
        }, 2000);

    }

    onLoadIdeas(){

        ideas = []

        this.props.tablero.map((e) => {
            this.onIdea(e.id)
        })

    }
    
    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = async e => {
        e.preventDefault();

        const { nombre, stateCheck } = this.state;
        const tablero = { nombre: nombre, state: stateCheck, usuario_fk: parseInt(localStorage.getItem("id")) }

        await this.props.createTablero(tablero)



        setTimeout(() => {
            this.props.getTablero();
            if (!this.props.alert) {
                // Hiden modal the bootstrap
                $('#modalCreateTable').modal('hide');
            }
        }, 1000);

    }

    onModal = () => {
        return (
            <div className="modal fade" id="modalCreateTable" tabIndex="-1" role="dialog" aria-labelledby="modalCreateTable" aria-hidden="true">
                {(this.props.alert) ?
                    <div className="col-md-12 bg-red d-flex justify-content-center">
                        <div className={(this.props.flag) ? "alert alert-success w-100 text-center" : "alert alert-danger w-100 text-center"} role="alert">
                            {this.props.message}
                        </div>
                    </div>
                    : null
                }

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Crear Tablero</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">


                                <div className="form-group">
                                    <label className="text-dark">Nombre</label>
                                    <input type="text" className="form-control" name="nombre" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label className="text-dark">Estado del tablero(Privado o Publico)</label>
                                    <div className="input-group-text bg-white">
                                        <input type="checkbox" aria-label="Checkbox for following text input" name="state" onChange={(click) => this.setState({ stateCheck: !this.state.stateCheck })} />
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <input type="submit" className="btn btn-primary" value="Crear" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    onIdea = async (idTablero) => {

        const id = localStorage.getItem("id")

        await axios.get(`/api/idea/${id}/${idTablero}`).then(res => {

            if (res.data.length > 0) {
                
                ideas.push(res.data)

                this.setState({ idea : ideas})

            }



        }
        )
            .catch(err => console.log("Into here"));


    }

    async deleteIdea(event, idIdea) {
        event.preventDefault();
        await axios.delete(`/api/idea/${idIdea}`).then(res => {
            this.onLoadIdeas()
        }).catch(err => {
            console.log(err.response);
        })
    }

    async deleteTablero(event, idTablero) {
        event.preventDefault();
        await axios.delete(`/api/tablero/${idTablero}`).then(res => {
            this.props.getTablero();
        }).catch(err => {
            console.log(err.response);
        })


    }

    async nuevaIdea(event, idTablero) {
        event.preventDefault();
        this.setState({ idTablero })
    }

    onModalIdea = () => {
        return (
            <div className="modal fade" id="modalCreateIdea" tabIndex="-1" role="dialog" aria-labelledby="modalCreateIdea" aria-hidden="true">
                {(this.props.alert) ?
                    <div className="col-md-12 bg-red d-flex justify-content-center">
                        <div className={(this.props.flag) ? "alert alert-success w-100 text-center" : "alert alert-danger w-100 text-center"} role="alert">
                            {this.props.message}
                        </div>
                    </div>
                    : null
                }

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Crear Idea</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmitIdea}>
                            <div className="modal-body">


                                <div className="form-group">
                                    <label className="text-dark">Comentario</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="comment" onChange={this.onChange} ></textarea>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <input type="submit" className="btn btn-primary" value="Crear" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    onSubmitIdea = e => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify({ comment: this.state.comment, state: true, usuario_fk: localStorage.getItem("id"), tablero_fk: this.state.idTablero })


        axios.post(`/api/idea/`, body, config)
            .then(res => {
                $('#modalCreateIdea').modal('hide');
                this.onLoadIdeas()
            }).catch(err => console.log("Error"));

    }


    render() {


        return (
            <div className="row mt-5 justify-content-between bg-light">
                <div className="col-md-12">

                    <div className="row">
                        <div className="col-md-12 mt-3">
                            <h1>Tus tableros</h1>
                        </div>
                        {
                            this.props.tablero.map((val, index) => {

                                return (
                                    <div className="col-md-6  mt-5" key={index}>
                                        <div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title">{val.nombre}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{val.nick}</h6>
                                                {this.state.idea.map((idea, i) => {

                                                    return idea.map((value, index) => {


                                                        if (val.id == value.id_tablero) {

                                                            return (
                                                                <div key={index} className="mb-2 border p-2 d-flex justify-content-between ">
                                                                    <p className="card-text">{value.comment}</p>
                                                                    <a href="#" onClick={(event) => this.deleteIdea(event, value.id)} ><i className="fas fa-minus-circle text-danger" style={{ fontSize: 20 }}></i></a>
                                                                </div>
                                                            )

                                                        }

                                                    })


                                                })}
                                                <a href="#" onClick={(event) => this.nuevaIdea(event, val.id)} className="card-link" data-toggle="modal" data-target="#modalCreateIdea"><i className="fas fa-plus-circle pr-2"></i>Nueva idea</a>
                                                <a href="#" onClick={(event) => this.deleteTablero(event, val.id)} className="card-link"><i className="fas fa-trash pr-2"></i> Eliminar</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>


                {this.onModal()}
                {this.onModalIdea()}

                <div className="bg-secondary col-md-12 d-flex align-items-end justify-content-end mt-5 ">
                    <a href="#" role="button" data-toggle="modal" data-target="#modalCreateTable" >
                        <i className="fas fa-plus-circle text-white" style={{ fontSize: 100 }} ></i>
                    </a>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    tablero: state.tablero.tablero,
    idea: state.idea.idea,
    flag: state.tablero.flag,
    alert: state.tablero.alert,
    message: state.tablero.message
});



export default connect(
    mapStateToProps,
    { getTablero, createTablero, getIdea },
)(CrearTablero);