import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

// Use a global scope so keybindings apply everywhere
const SCOPE = Meta.KeyBindingFlags.BUILTIN;

export default class SummonExtension extends Extension {
  enable() {
    this.display = Shell.Global.get().get_display();
    this.settings = this.getSettings();
    this.appSystem = Shell.AppSystem.get_default();

    log('setting up key binding');
    this.display.add_keybinding(
      'firefox-summon',
      this.settings,
      SCOPE,
      () => { this.activate_app('Firefox'); }
    );
  }

  disable() {
    this.display.remove_keybinding('firefox-summon');
    this.display = null;
    this.settings = null;
  }

  activate_app(name) {
    const app = this.
      appSystem.
      get_running().
      find(app => app.get_name() === name);

    if (app === undefined) {
      log(`Couldn't locate "${name}" app`);
    } else {
      app.activate();
    }
  }
}
