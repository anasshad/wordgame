import React, {Component} from 'react';

class Card extends Component{
    render(){
        const {letter} = this.props;
        return(
            <div className="Card" >
                {letter}
            </div>
        )
    }
}

export default Card;