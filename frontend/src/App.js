import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'

// import WelcomePage from './components/home'
import AddVideo from './components/video'
import VideoList from './components/videoList'
import PlayMovie from './components/playMovie';
import Language from './components/language'
import AddLanguage from './components/languageAdd'
import EditLanguage from './components/languageEdit'
import GenreAdd from './components/genre/genreAdd'
import EditGenre from './components/genre/genreEdit'
import HomePage from './components/welcomePage'
// import GenreList from './components/genre/genreList'
import Genre from './components/genre/genre'
import UserRegistration from './components/user'
import SignIn from './components/login-signup/login'
import SignUp from './components/login-signup/signup'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <center><h1> Video-Stream-Application </h1></center>
          <Route path='/' component= {HomePage} exact />
          <Route path='/admin/video' component={ AddVideo }  />
          <Route path='/videos/list' component={ VideoList } exact />
          <Route path='/user/:id' component={ PlayMovie } />
          {/* <Route path='/admin/language/list' component={ Language } exact/> */}
          <Route path='/admin/language' component={ Language } exact/>
          <Route path='/admin/language/edit' component={EditLanguage} />
          <Route path='/admin/genre' component={GenreAdd} exact/>
          <Route path='/admin/genre/list' component={Genre} exact/>
          <Route path='/admin/genre/edit' component={EditGenre}/>
          <Route path='/user' component={UserRegistration} exact/>
          <Route path="/login" component={SignIn}/>
          <Route path = "/signup" component={SignUp}/>
        </div>
      </BrowserRouter>
      

    );
  }
}

export default App;
