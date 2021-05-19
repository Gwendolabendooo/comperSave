import React from 'react';
import { Link } from 'react-router-dom';
import logo from './COMPER.png'

class Nav extends React.Component {

    render() {
        return (
            <nav>
                <img src={logo} alt="Logo" />
                <ul>
                    <li>Thèmes d'intêret</li>
                    <li>Planification</li>
                    <li>Mon profil</li>
                </ul>
            </nav>
        )
    }

}

export default Nav;