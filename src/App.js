import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';


const initialState = {
  input: '',
  imageURL: '',
  box: '',
  route: 'signin',
  isSignedIn: false,
  user: {
        id: '',
        name : '',
        email: '',
        password: '',
        entries: 0,
        joined: new Date()
  }
}

const particleOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1000,
      }
    },
  },
};

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: '',
      route: 'signin',
      isSignedIn: false,
      user: {
            id: '',
            name : '',
            email: '',
            password: '',
            entries: 0,
            joined: new Date()
      }
    }
  }

  loadUser = (data) => {
    
    this.setState({
      user: {
    
        id: data.id,
        name : data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined

      }
    })

  }


  onRouteChange = (route) => {

    if(route === 'signout'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({isSignedIn: true});
    }

    this.setState({route: route});
  }

  calculateFaceLocation = (response) => {

    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };

  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
      this.setState({input: event.target.value});
  }

  onSubmit = () => {

    this.setState({imageURL: this.state.input});

    fetch('https://cryptic-oasis-79454.herokuapp.com/imageURL',{
          method: 'post',
          headers: {'Content-Type': 'Application/json'},
          body: JSON.stringify({
            input: this.state.input
          })

    })
    .then(response => response.json())
    .then((response) => {
      if(response){
        fetch('https://cryptic-oasis-79454.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'Application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })

        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))}
      )
    .catch((err) => console.log(err));
 

  }


  render(){

    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {
        (this.state.route === 'home')?
        <div><Logo />
        <Rank name ={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm 
        onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageURL = {this.state.imageURL} box ={this.state.box} />
        </div> 
        : (
          this.state.route === 'signin' ?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 

        )
        
        }
      </div>
    );

  }
}

export default App;
