import React from 'react';

export default class OrderBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.orders.length === 0 ? <div>Ancora nessun ordine effettuato</div> :
                    <div>
                        <h1>Ordine di {this.props.user}</h1>
                        <p>Prodotti acquistati:{this.props.products.join(', ')}</p>
                        <p>Stato dell'ordine:{this.props.status}</p>
                        <p>Prezzo totale>{this.props.total}</p>
                    </div>}
            </div>
        )
    }
}