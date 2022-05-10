import React from 'react'
import logo from '../assets/logo/round_logo.png'
import './styles/Loading.css'

function Loading (){
        return(
                <div className="Loading">
                    <div className="Loading-main">
                        <div>
                            <img alt="logo PMP" src={logo} className="Loading-logo" />
                        </div>
                    </div>
                </div>
        )
    }

export default Loading