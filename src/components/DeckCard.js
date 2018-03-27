import React, { Component } from "react";
import styled from "styled-components";
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "../ItemTypes";

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

const deckCardSource = {
  beginDrag(props) {
    return {
      name: props.name,
      letter: props.letter,
      sourcePosition: props.positionInDeck(props.letter)
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(`(${item.letter} at ${item.sourcePosition}) dropped on (${dropResult.letter} at ${dropResult.dropPosition}) `);
      props.reorder(item.sourcePosition, dropResult.dropPosition);
    }
  }
};

const deckCardTarget = {
  drop(props, monitor){
    return{
      name: "DeckCard",
      letter: props.letter,
      dropPosition: props.positionInDeck(props.letter),
      item: monitor.getItem()
    }
  }
};

@DropTarget(ItemTypes.DeckCard, deckCardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.DeckCard, deckCardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Card extends Component {
  render() {
    const { letter } = this.props;
    const { isDragging, connectDragSource, hideSourceOnDrag, connectDropTarget } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    // if (isDragging) return null;

    return connectDragSource(
      connectDropTarget(<div>
        <Wrapper>{letter}</Wrapper>
      </div>),
    );
  }
}

export default Card;
