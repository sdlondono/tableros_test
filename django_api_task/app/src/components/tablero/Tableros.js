import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from 'axios';
import 'babel-core/register';
import 'babel-polyfill';


export class Tableros extends Component {

    state = {
        tablero: [],
        user: [],
        idea: []
    }

    async componentWillMount() {

        // Get all tableros
        await axios.get("/api/tablero/").then(res => {
            this.setState({ tablero: res.data })
        }).catch(err => {
            console.log(err);
        })

        await axios.get(`/api/usuario/`).then(res => {
            this.setState({ user: res.data })
        }).catch(err => console.log(err))

        this.state.tablero.map((tablero) => {
            // Get all ideas

            this.state.user.map(async (user) => {
                await axios.get(`/api/idea/${user.id}/${tablero.id}`).then(res => {
                    this.setState({ idea: res.data})
                }).catch((err) => console.log(err))
            })


        })


    }


    render() {
        return (
            <div className="row mt-5">

                <div className="col-md-12">
                    <div className="jumbotron">
                        <h1 className="display-4">Tableros de todos!</h1>
                        <p className="lead">Aqui se muestran todos los tableros que existen en la base de datos dependiendo si estan privados o no.</p>
                    </div>
                </div>

                {
                    // Map the tableros
                    this.state.tablero.map((tablero, index) => {

                        if(!tablero.state){

                            return (
                                <div key={index} className="col-md-6">
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title">{tablero.nombre}</h5>
    
                                            {
                                                this.state.idea.map((idea, indexIdea) => {
                                                    if(tablero.id == idea.id_tablero)
    
                                                    return (
                                                        <div key={indexIdea} className="mb-3 border p-2 d-flex justify-content-between">
                                                            <p className="card-text">{idea.comment}</p>
                                                        </div>
                                                    )
                                                })
                                            }
    
    
                                            <a href="#" className="card-link" ><i className="fas fa-plus-circle pr-2"></i>Nueva idea</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    })
                }

            </div>
        )
    }
}

export default connect()(Tableros);
