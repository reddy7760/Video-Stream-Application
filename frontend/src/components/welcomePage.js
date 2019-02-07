import React from 'react'
import {BrowserRouter,Route,Link} from 'react-router-dom'
import {Nav,NavItem,NavLink} from 'reactstrap'
// import UserRegistration from './user'
// import SignIn from './login-signup/login'
export default class HomePage extends React.Component{
    render(){
        return(
            <div>
                {/* <Nav>
                        <NavLink href="videos/list">videos</NavLink> <NavLink href="admin/language">languages</NavLink>
                </Nav>
                <hr /> */}
            <Link to="/login">log in</Link><br/>
            <Link to ="/signup">Sign up</Link>
            </div>
        )
    }
}