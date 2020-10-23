import React from 'react';
import PropTypes from 'prop-types';

import icons from '../icons/icons';

/**
 * Only works with SVG icons from icons.js
 */

const SVGIcon = props => {
  const { className, name } = props;

  const Component = icons[name];
  return <Component className={className} />;
};

SVGIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SVGIcon;
