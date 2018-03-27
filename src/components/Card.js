import React, {Component} from 'react';
import styled from 'styled-components';
import {DragSource} from 'react-dnd';
import ItemTypes from '../ItemTypes';

const cardSource = {
  beginDrag(props){
    return {
      name: props.name,
      letter: props.letter,
    }
  },
  endDrag(props, monitor){
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if(dropResult){
      console.log(`${item.letter} in ${dropResult.name} `);
      props.removeLetter(item.letter);
    }
  }
}

const Wrapper = styled.div`
  display: flex;
  color: blue;
  height: 100%;
  width: 50%;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  background: pink;
  font-size: 4.5em;
`;

@DragSource(ItemTypes.Card, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class Card extends Component{
 
  render(){
    const {letter} = this.props;
    const { isDragging, connectDragSource, hideSourceOnDrag } = this.props
    const { name } = this.props
    const opacity = isDragging ? 0.4 : 1

    if (isDragging && hideSourceOnDrag){
      return null
    }

    if(isDragging)
    return null;

    return connectDragSource(
      <div>
        <Wrapper>{letter}</Wrapper>        
      </div>
    )
    }
}

export default Card;