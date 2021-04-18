import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onSubmit}) => {

    return(

        <div>
            <p className='f3'>
            {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form center pa4 br4 shadow-5'>
                    <input className='f4 pa2 w-70' placeholder='put the image url here' type='text' onChange={onInputChange} />
                    <button onClick={onSubmit} className='grow f4 link bn outline-0 ph4 pv2 white bg-light-purple w-30'>Detect</button>
                </div>
            </div>
        </div>
        

    );

}

export default ImageLinkForm;