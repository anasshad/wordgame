import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import styled from "styled-components";
import ItemTypes from "../ItemTypes";
import DeckCard from "./DeckCard";

const DeckWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  align-items: center;
  justify-content: center;
  background: lightblue;
`;

const boxTarget = {
  drop(props, monitor) {
    return {
      name: "Deck",
      item: monitor.getItem()
    };
  }
};

@DropTarget(ItemTypes.Card, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
//Class Deck Definition Start
class Deck extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget, letters } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = "#222";
    if (isActive) {
      backgroundColor = "darkgreen";
    } else if (canDrop) {
      backgroundColor = "darkkhaki";
    }

    return connectDropTarget(
      <div>
        <DeckWrapper>
          {letters &&
            letters.map((letter, i) => (
              <DeckCard
                key={i}
                letter={letter}
                positionInDeck={this.props.positionInDeck}
                reorder={this.props.reorder}
              />
            ))}
        </DeckWrapper>
      </div>
    );
  }
}

export default Deck;
