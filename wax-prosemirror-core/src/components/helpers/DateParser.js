import moment from 'moment';
import propTypes from 'prop-types';

const getDuration = timestamp => {
  const today = moment();
  const stamp = moment(timestamp);
  return moment.duration(today.diff(stamp));
};

const DateParser = props => {
  const { children, timestamp, dateFormat, humanizeThreshold } = props;

  const renderTimeAgo = () => {
    if (!timestamp) return '';
    const duration = getDuration(timestamp);
    return duration.humanize();
  };

  const renderTimestamp = () => {
    if (!timestamp) return '';
    const duration = getDuration(timestamp);

    if (duration.asDays() < humanizeThreshold) {
      return `${duration.humanize()} ago`;
    }
    return moment(timestamp).format(dateFormat);
  };

  return children(renderTimestamp(), renderTimeAgo());
};

DateParser.propTypes = {
  /** The date string. Can be any date parsable by momentjs. */
  timestamp: propTypes.oneOfType([propTypes.string, propTypes.number, Date])
    .isRequired,
  /** Format of the rendered date. */
  dateFormat: propTypes.string,
  /** Humanize duration threshold */
  humanizeThreshold: propTypes.number,
};

export default DateParser;
