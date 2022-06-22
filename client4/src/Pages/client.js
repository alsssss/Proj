import React from 'react'
import Header from "../Components/Header";
import ProductList from '../Components/ProductList';
import Product from "../Components/Product";
import Services from "../Services/services";
import OrderBox from "../Components/OrderBox";


let arr=[];
let counter1=0;
let counter2=0;
let vett=[];
let sum = 0;
let c=0;
const cArr=[];

export default class Client extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartOpened: false,
            prods: [],
            total:0,
            order:[],
            orderOpened:false
        }
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleOther = this.handleOther.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handlePurchase=this.handlePurchase.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
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

    handleClick1() {
        counter1++
        const op = counter1 % 2;
        if (op === 1) {
            this.setState({cartOpened: true})
        } else {
            this.setState({cartOpened: false})
        }
    }

    handleClick2() {
        counter2++
        const op = counter2 % 2;
        if (op === 1) {
            this.setState({orderOpened: true})
        } else {
            this.setState({orderOpened: false})
        }
    }



    handleOther(prod) {
        arr.push(prod);
        const f = 'i'+c;
        cArr.push(c);
        c++;
        const lastPrice = arr.slice(-1)[0].price
        vett.push(<div id={f}><Product prod={arr.slice(-1)[0]} showDisp={false}/><button onClick={this.handleDelete}>X</button></div>)
        this.setState({
            prods:vett
        })
        sum = sum + lastPrice;
        this.setState({total:sum})
    }


    handleDelete(e) {
        const el=e.target.parentElement;
        const i=cArr.findIndex((e) =>{
            const f='#i'+e;
            return el===document.querySelector('div'+f)
        })
        cArr.splice(i,1)
        const falsePrice= arr.at(i).price;
        sum=sum-falsePrice;
        this.setState({
            total:sum
        })
        arr.splice(i,1)
        vett.splice(i,1);
        this.setState({prods:vett})
    }


    handlePurchase(){
        window.alert('Grazie per l\'acquisto, ora deve aspettare');
        arr.forEach((e) =>{
            Services.createOrder(JSON.parse(sessionStorage.getItem('utente')).details._id,e._id)
                .then((res => {
                    if(!res.ok){
                        window.alert('Il tuo ordine non è stato creato per qualche motivo')
                        throw new Error('Http error' + res.status) }
                    return res.json();
                }))
                .then(data => console.log(data))
              /*  .then(data=>{
                    this.setState({ order:data})
                    console.log(this.state.order)
                })
                .catch(e => console.log(e));
        */})
        arr=[];
        vett=[];
        this.setState({prods:[]})
        console.log(this.state.order)
    }


    render() {
        return (
            <div>
                {sessionStorage.length === 0 ? <></> :
                    <Header username={JSON.parse(sessionStorage.getItem('utente')).details.username}
                            isAdmin={JSON.parse(sessionStorage.getItem('utente')).details.isAdmin}
                            isChef={JSON.parse(sessionStorage.getItem('utente')).details.isChef}/>}
                <ProductList onChange={this.handleOther} admin={false}/>
                <aside>
                    <button onClick={this.handleClick1}>Carrello</button>
                    {this.state.cartOpened &&
                        <div>
                            <span>Carrello</span>
                            <ul>
                                {this.state.prods}
                            </ul>
                            <div>Prezzo totale: <span>{this.state.total}</span></div>
                            <button onClick={this.handlePurchase}>Conferma Ordine</button>
                        </div>}
                    <button onClick={this.handleClick2}>Visualizza ordini</button>
                    {this.state.orderOpened &&
                        <OrderBox orders={this.state.order} />}
                </aside>

            </div>
        )
    }
}