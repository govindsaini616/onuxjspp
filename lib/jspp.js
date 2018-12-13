'use babel';

import jsppView from './jspp-view';
import { CompositeDisposable } from 'atom';

export default {

  jsppView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jsppView = new jsppView(state.jsppViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jsppView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jspp:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jsppView.destroy();
  },

  serialize() {
    return {
      jsppViewState: this.jsppView.serialize()
    };
  },

  toggle() {
    console.log('Jspp was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
