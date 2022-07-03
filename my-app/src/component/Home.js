import React, { Component } from "react";
import { Button } from 'primereact/button';

import './login.css'
// import background from './imagini/background.jpg'



export class Home extends Component {

    constructor(props) {

        super(props)
        this.state = {
            loading1: false,
            loading2: false
        }
    }
    render() {
        return (

            <div className="login">
                {/* <div>
                        <img src={background} alt="this is background"></img>
                    </div> */}
                <div className="card">
                    <h3>Alege tipul logarii</h3>
                    <button className="button login__submit" label="Profesor" ></button>
                    <button className="button login__submit" label="Student"></button>


                </div>
            </div>


        )
    }

}
export default Home;