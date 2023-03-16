import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { WaxContext, Commands, Tools } from 'wax-prosemirror-core';
import ExternalApiButton from './components/ExternalApiButton';
import replaceText from './replaceText';

@injectable()
class AnyStyleTool extends Tools {
  title = 'ChatGPT';
  name = 'ChatGPT';
  label = 'ChatGPT';

  get run() {
    return true;
  }

  select = activeView => {
    return true;
  };

  get enable() {
    return state => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    const context = useContext(WaxContext);
    const anyStyle = replaceText(
      view,
      this.config.get('config.ExternalAPIContentService')
        .ExternalAPIContentTransformation,
      this.pmplugins.get('ExternalAPIContentPlaceHolder'),
      context,
    );
    return this.isDisplayed() ? (
      <ExternalApiButton
        anyStyle={anyStyle}
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    ) : null;
  }

  //   renderTool(view) {
  //     if (isEmpty(view)) return null;
  //     const context = useContext(WaxContext);
  //     const upload = fileUpload(
  //       view,
  //       this.config.get('fileUpload'),
  //       this.pmplugins.get('imagePlaceHolder'),
  //       context,
  //     );
  //     return this.isDisplayed() ? (
  //       <ImageUpload
  //         fileUpload={upload}
  //         item={this.toJSON()}
  //         key={uuidv4()}
  //         view={view}
  //       />
  //     ) : null;
  //   }
}

export default AnyStyleTool;
