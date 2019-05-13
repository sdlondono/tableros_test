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

    async componentDidMount() {

        var ideas = []

        // Get all tableros
        await axios.get("/api/tablero/").then(res => {
            this.setState({ tablero: res.data })
        }).catch(err => {
            console.log(err);
        })

        await axios.get(`/api/usuario/`).then(res => {
            this.setState({ user: res.data })
        }).catch(err => console.log(err))

        await this.state.tablero.map(async (tablero) => {
            // Get all ideas

            await this.state.user.forEach(async (user) => {
                await axios.get(`/api/idea/${user.id}/${tablero.id}`).then(async res => {

                    if (res.data.length > 0) {

                        return (res.data)
                        // await this.state.idea.push(res.data)
                        // this.state.idea.map((val, index) => {
                        //     val.map((e) => {
                        //         console.log(e)
                        //     })
                        // })

                    }

                }).then(async (data) => {
                    if (data) {
                        await ideas.push(data)
                        this.setState({ idea : ideas})
                    }
                })
                    .catch((err) => console.log(err))
            })


        })





    }


    render() {


        return (
            <div className="row mt-5 ">

                <div className="col-md-12">
                    <div className="jumbotron">
                        <h1 className="display-4">Tableros de todos!</h1>
                        <p className="lead">Aqui se muestran todos los tableros que existen en la base de datos dependiendo si estan privados o no.</p>
                    </div>
                </div>

                {
                    // Map the tableros
                    this.state.tablero.map((tablero, index) => {

                        if (!tablero.state) {

                            return (
                                <div key={index} className="col-md-6 ">
                                    <div className="card mb-5" >
                                        <div className="card-body">
                                            <h5 className="card-title">{tablero.nombre}</h5>

                                            {
                                                this.state.idea.map((idea, indexIdea) => {

                                                    return idea.map((val, index) => {

                                                        if (tablero.id == val.id_tablero){

                                                            console.log("Into here")

                                                            return (
                                                                <div key={indexIdea} className="mb-3 border p-2 d-flex justify-content-between">
                                                                    <p className="card-text">{val.comment}</p>
                                                                </div>
                                                            )

                                                        }

                                                    })

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