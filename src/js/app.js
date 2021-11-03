import Feed from './Feed';
import Tooltip from './Tooltip';

const feedArea = document.querySelector('.feed');
const tooltip = new Tooltip();
const feed = new Feed(feedArea, tooltip);

feed.init();
