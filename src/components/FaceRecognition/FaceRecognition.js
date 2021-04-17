import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {

    return(

       <div className='center ma3'>
           <div className='absolute'>
           <img id = 'inputimage' alt='Click on Detect to detect the face' src={imageURL} />
           <div className = 'bounding-box' 
                style={{top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol}}
            ></div>
           </div>
       </div>

    );

}

export default FaceRecognition;