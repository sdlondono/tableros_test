import React, { Component } from 'react'
import axios from 'axios';


import 'babel-core/register';
import 'babel-polyfill';
let tablero = ""
export class Idea extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: [],
      idea: [],
      idIdea: "",
      comment: "",
    }

  }

  async componentDidMount() {

    await axios.get(`api/usuario/`).then(res => {
      this.setState({ user: res.data })


    })
      .catch(err => console.log(err))

    this.onIdea()


  }

  // onChange = e => this.setState({ [e.target.name]: e.target.value })


  async deleteIdea(event, idIdea) {
    event.preventDefault();
    await axios.delete(`/api/idea/${idIdea}`).then(res => {

      this.onIdea()

    }).catch(err => {
      console.log("Into here");
    })
  }

  async onIdea() {

    this.state.user.map((user) => {
      axios.get(`api/idea/${user.id}/${this.props.tablero}`).then(res => {
        if (res.data.length > 0) {
          this.setState({ idea: res.data })
        } else {
          console.log("Aun no esta :", res.data)
        }
      }).catch((err) => console.log(err))
    })

  }





  onSubmitIdea(e, test) {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };


    // const body = JSON.stringify({ comment: this.state.comment, state: true, usuario_fk: localStorage.getItem("id"), tablero_fk: tablero })

    console.log(tablero, test);

    // axios.post(`/api/idea/`, body, config)
    //   .then(res => {
    //     $('#modalCreateIdea').modal('hide');
    //     this.onIdea()
    //   }).catch(err => console.log("Error"));

  }

  onModalIdea = () => {

    return (
      <div className="modal fade" id="modalCreateIdea" tabIndex="-1" role="dialog" aria-labelledby="modalCreateIdea" aria-hidden="true">

        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Crear Idea</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form onSubmit={(event) => this.onSubmitIdea(event, tablero) }>
              
              <div className="modal-body">

                <div className="form-group">
                  <label className="text-dark">Comentario</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="comment"  ></textarea>
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





  render() {

    tablero = this.props.tablero
    return (
      <div>
        {this.state.idea.map((e, i) => {

          return (
            <div key={i}>
              <div className="mb-2 border p-2 d-flex justify-content-between ">
                <p className="card-text">{e.comment}</p>
                <a href="#" onClick={(event) => this.deleteIdea(event, e.id)} ><i className="fas fa-minus-circle text-danger" style={{ fontSize: 20 }}></i></a>

              </div>


            </div>

          )

        })}


        <a href="#" className="card-link" data-toggle="modal" data-target="#modalCreateIdea"><i className="fas fa-plus-circle pr-2"></i>Nueva idea</a>
        {this.onModalIdea()}
      </div>
    )
  }
}

export default Idea
