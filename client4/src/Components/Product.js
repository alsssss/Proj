import React from 'react';

export default class Product extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            showDisp:this.props.showDisp
        }
        this.handleClick=this.handleClick.bind(this)
    }

    handleClick(){
        this.props.onChange({
            _id:this.props.prod._id,
            title:this.props.prod.title,
            price:this.props.prod.price,
        })
    }






    render(){
        return(
            <li>
                <div>{this.props.prod.title}</div>
                <div>{this.props.prod.photos }</div>
                {this.props.prod.ingredients ?
                <div>{this.props.prod.ingredients.join(', ')}</div> :
                    <></>}
                <div>{this.props.prod.desc }</div>
                <div>{this.props.prod.price} € </div>
                {this.props.admin ?
                    this.props.prod.disp ? <><div>Presente in magazzino</div>
                            <div>
                                <button>Aggiorna</button>
                                <button>Elimina</button>
                            </div></>
                        :
                        <div>Prodotto esaurito</div>
                :
                 this.props.showDisp ?
                 this.props.prod.disp ? <><div>Presente in magazzino</div>
                    <div>
                        <button onClick={this.handleClick}>
                            <img src='https://media.istockphoto.com/vectors/shopping-cart-icon-vector-id1128229893?k=20&m=1128229893&s=612x612&w=0&h=uOQYRr-vTDnW60Mn8MWSwt6i9uK2SGni8jR1CKKELK8=' alt='CLICCA' height='25' width='25'/>
                        </button>
                    </div></>
                    :
                    <div>Prodotto esaurito</div> : <></>}

            </li>

        )
    }
}