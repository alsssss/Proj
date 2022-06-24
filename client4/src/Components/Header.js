import React from 'react'
import Authorize from '../Services/services'

class Header extends React.Component{
        constructor(props){
                super(props)
                this.state = {
                        agent: this.props.username,
                        isAdmin:this.props.isAdmin,
                        isChef: this.props.isChef,
                }
                this.handleClick=this.handleClick.bind(this);
        }


        handleClick(){
            Authorize.endLog()
                .then(() => {
                    sessionStorage.removeItem('utente')
                    window.history.pushState({}, "", '/');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop);
                })
        }


        render(){
                return(
                    <header>
                            <ul>
                            <li><img src='https://media.istockphoto.com/vectors/cartoon-burger-vector-isolated-illustration-vector-id1184633031?s=612x612' alt='Immagine di un humberger' title='immagine di un hamburger' width='50' height='50'/></li>
                                    <li >{this.state.isAdmin ? <span>Hello Admin {this.state.agent}</span> :
                                        this.state.isChef ? <span>Hello Chef {this.state.agent}</span> :
                                            <span>Hello User {this.state.agent}</span>}</li>
                                    <li><button onClick={this.handleClick}>Logout </button></li>
                            </ul>
                    </header>
                )
        }




}

export default Header