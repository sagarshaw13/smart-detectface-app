import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {

    return(

        <div className='ma3 mt0'>

            <Tilt className="Tilt br2 shadow-3" options={{ max : 50 }} style={{ height: 120, width: 120 }} >
            <div className="Tilt-inner pa2">
                <img alt='logo' src="https://img.icons8.com/carbon-copy/100/000000/brain.png"/>
            </div>
            </Tilt>

        </div>

    );

}

export default Logo;