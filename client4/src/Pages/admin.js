import React from 'react'
import Services from "../Services/services";
import Header from "../Components/Header";
import ProductList from "../Components/ProductList";
import Form from '../Components/Form'



const user=sessionStorage.getItem('utente');

export default class Admin extends React.Component{
    constructor(props) {
        super(props);

        this.state ={
            formUpdate:'',
            formCreate:'',
            showUpdate:false,
            showCreate:false
        }

        this.handleCheck=this.handleCheck.bind(this)
        this.handleOther=this.handleOther.bind(this)
        this.handleHide1=this.handleHide1.bind(this)
        this.handleHide2=this.handleHide2.bind(this)
        this.handleClick=this.handleClick.bind(this)
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


     handleOther(prod) {
        if(prod.source.innerHTML==='Aggiorna'){
            this.setState({
                showUpdate:true,
                formUpdate: <Form product={prod} hide={this.handleHide1} upd={true}/>
            })
        }else{
            prod.source.parentNode.parentNode.remove()
            Services.deleteProduct(prod._id)
        }
        }

        handleHide1(){
        this.setState({
            showUpdate:false,

        })
        }

    handleHide2(){
        this.setState({
            showCreate:false,

        })
    }


    handleClick(){
        const prod={
            title:'',
            ingredients:'',
            desc:'',
            photo:'',
            price:'',
            disp:'',
        }
        this.setState({
            showCreate:true,
            formCreate:<Form product={prod} hide={this.handleHide2} upd={false}/>
        })

        }






    render(){
        return(
            <div>
                {sessionStorage.length === 0 ? <></> :
                    <Header username={JSON.parse(sessionStorage.getItem('utente')).details.username}
                            isAdmin={JSON.parse(sessionStorage.getItem('utente')).isAdmin}
                            isChef={JSON.parse(sessionStorage.getItem('utente')).isChef}/>}
                <ProductList onChange={this.handleOther} admin={true}/>
                <button onClick={this.handleClick}>Aggiungi Prodotto</button>
                <aside>
                    {this.state.showUpdate && this.state.formUpdate}
                    {this.state.showCreate && this.state.formCreate}
                </aside>
            </div>
        )
    }
}