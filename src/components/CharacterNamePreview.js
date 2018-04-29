import React from 'react';
import PropTypes from 'prop-types';

import './stylesheets/Component.css';

function CharacterNamePreview(props) {
  return <div className="namePreviewBox">{props.username}</div>;
}

CharacterNamePreview.propTypes = {
  username: PropTypes.string.isRequired,
};

export default CharacterNamePreview;
