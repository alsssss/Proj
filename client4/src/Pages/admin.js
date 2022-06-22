import React from 'react'
import Services from "../Services/services";
import Header from "../Components/Header";
import ProductList from "../Components/ProductList";


const user=sessionStorage.getItem('utente');


export default class Admin extends React.Component{
    constructor(props) {
        super(props);


        this.handleCheck.this.handleCheck.bind(this)
    }


    componentDidMount() {
        return this.handleCheck();
    }
    handleCheck(){
        Services.checkAuth()
            .then((res => {
                if(!res.ok){
                    window.history.pushState({}, "", '/');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop)}
                return res.text()
            }))
            .catch(error => error)
    }


    handleOther(){

    }

    render(){
        return(
            <div>
                {sessionStorage.length === 0 ? <></> :
                    <Header username={JSON.parse(user).details.username}
                            isAdmin={JSON.parse(user).isAdmin}
                            isChef={JSON.parse(user).isChef}/>}
                <ProductList onChange={this.handleOther} admin={true}/>
            </div>
        )
    }
}