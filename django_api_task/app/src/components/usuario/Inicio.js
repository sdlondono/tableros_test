import React, { Component } from 'react'

export class Inicio extends Component {

    componentWillMount() {
        console.log(this.props.location);
    }

    render() {
        return (
            <div className="row justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div className="col-md-12">
                    <div class="jumbotron jumbotron-fluid bg-light">
                        <div class="container">
                            <h1 class="display-4">Bienvenido a mi sitio web {localStorage.getItem("nick")}!</h1>
                            <hr class="my-4"/>
                            <p class="lead">Contactame en <span className="text-info">samioff19@gmail.com</span> o a mi repositorio <span className="text-info">github.com/ConDish</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Inicio
