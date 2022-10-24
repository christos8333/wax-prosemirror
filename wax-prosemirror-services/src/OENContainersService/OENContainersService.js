import { Service } from 'wax-prosemirror-core';
import OenNodes from './schema';
import OENContainersTool from './OENContainersTool';
import OENAsideLongToolCaseStudy from './OENAsideLongToolCaseStudy';
import OENAsideLongToolBiography from './OENAsideLongToolBiography';
import OENAsideLongToolWorkedExample from './OENAsideLongToolWorkedExample';
import OENAsideShortToolNote from './OENAsideShortToolNote';
import OENAsideShortToolTip from './OENAsideShortToolTip';
import OENAsideShortToolWarning from './OENAsideShortToolWarning';
import OENAsideShortToolReminder from './OENAsideShortToolReminder';
import PopulateHeadingsComponent from './PopulateHeadingsComponent';
import './oenContainers.css';

class OENContainersService extends Service {
  name = 'OENContainersService';

  register() {
    this.container.bind('OENContainersTool').to(OENContainersTool);
    this.container
      .bind('OENAsideLongToolCaseStudy')
      .to(OENAsideLongToolCaseStudy);
    this.container
      .bind('OENAsideLongToolBiography')
      .to(OENAsideLongToolBiography);
    this.container
      .bind('OENAsideLongToolWorkedExample')
      .to(OENAsideLongToolWorkedExample);

    this.container.bind('OENAsideShortToolNote').to(OENAsideShortToolNote);
    this.container.bind('OENAsideShortToolTip').to(OENAsideShortToolTip);

    this.container
      .bind('OENAsideShortToolWarning')
      .to(OENAsideShortToolWarning);

    this.container
      .bind('OENAsideShortToolReminder')
      .to(OENAsideShortToolReminder);

    const createNode = this.container.get('CreateNode');

    Object.keys(OenNodes).forEach(node => {
      createNode({
        [node]: OenNodes[node],
      });
    });

    const createOverlay = this.container.get('CreateOverlay');

    createOverlay(
      PopulateHeadingsComponent,
      {},
      {
        nodeType: 'oen_container',
        findInParent: true,
        markType: '',
        followCursor: false,
        selection: false,
      },
    );
  }
}

export default OENContainersService;
