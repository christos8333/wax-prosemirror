import { Service } from 'wax-prosemirror-core';
// import { yCursorPlugin, ySyncPlugin, yUndoPlugin } from 'y-prosemirror';
// import { WebsocketProvider } from 'y-websocket';
// import * as Y from 'yjs';
// import './yjs.css';

class YjsService extends Service {
  name = 'YjsService';
  boot() {
    // const { connectionUrl, docIdentifier } = this.config;
    // const ydoc = new Y.Doc();
    // // const provider = new WebsocketProvider('wss://demos.yjs.dev', 'prosemirror-demo', ydoc)
    // const provider = new WebsocketProvider(connectionUrl, docIdentifier, ydoc);
    // provider.on('sync', args => {
    //   console.log({ sync: args });
    // });
    // provider.on('status', args => {
    //   console.log({ status: args });
    // });
    // provider.on('connection-close', args => {
    //   console.log({ connectioClose: args });
    // });
    // provider.on('connection-error', args => {
    //   console.log({ connectioError: args });
    // });
    // const type = ydoc.getXmlFragment('prosemirror');
    // this.app.PmPlugins.add('ySyncPlugin', ySyncPlugin(type));
    // this.app.PmPlugins.add('yCursorPlugin', yCursorPlugin(provider.awareness));
    // this.app.PmPlugins.add('yUndoPlugin', yUndoPlugin());
  }
}

export default YjsService;
