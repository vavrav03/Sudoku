import React from 'react';
import PropTypes from 'prop-types';

function GameSquare({ number, variant }) {
   return <div className={`game-square ${variant}`}>{number}</div>;
}

GameSquare.propTypes = {
   number: PropTypes.number.isRequired,
   variant: PropTypes.oneOf(['normal', 'diagonalGroup']),
};

export default GameSquare;
