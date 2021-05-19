import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../components/Nav/index';
import Theme from '../components/Theme/index';
 
class Themes extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }
 
   render() {
       return (
           <>
                <Nav/>
                <Theme/>
            </>
        )
    }
 
}
 
export default Themes;