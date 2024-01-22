import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

// Use a global scope so keybindings apply everywhere
const SCOPE = Meta.KeyBindingFlags.BUILTIN;

export default class SummonExtension extends Extension {
    enable() {
        this._display = Shell.Global.get().get_display();
        this._settings = this.getSettings();

        log('setting up binding');
        this._display.add_keybinding(
          'firefox-summon',
          this._settings,
          SCOPE,
          () => { log('firefox-summon keybind triggered') }
        );
    }

    disable() {
        this._display.remove_keybinding('firefox-summon');
        this._display = null;
        this._settings = null;
    }
}
