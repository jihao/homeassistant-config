import {
  LitElement, html
} from 'https://unpkg.com/@polymer/lit-element@^0.5.2/lit-element.js?module';

class LightToggleCard extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
    }
  }

  _render({ hass, config }) {
    return html`
      <style>
        :host {
          --toggle-off-color: #ccc;
          --toggle-on-color: #2196F3;
        }
        ha-card {
          background-color: transparent;
          padding: 16px;
          display: block;
          font-size: 18px;
        }
        .state {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          align-items: center;
          color: rgba(202,217,235,1);
        }

        label.switch {
          margin-left: 8px;
        }
        /* The switch - the box around the slider */
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        /* Hide default HTML checkbox */
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        /* The slider */
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--toggle-off-color);;
          -webkit-transition: .4s;
          transition: .4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: var(--toggle-on-color);
        }

        input:focus + .slider {
          box-shadow: 0 0 1px var(--toggle-on-color);
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }

      </style>
      <ha-card elevation="2">
        ${config.entities.map(ent => hass.states[ent]).map((state) => {
          if(state!= undefined) {
          return html`
            <div class='state'>
              ${state.attributes.friendly_name}

              <label class="switch">
                <input type="checkbox" checked="${state.state === 'on'}" 
                  onchange="${ev => this._toggle(state)}">
                <span class="slider"></span>
              </label>
            </div>
          `
          }
        }
        )}
      </ha-card>
    `;
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error('You need to define entities');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return this.config.entities.length + 1;
  }

  _toggle(state) {
    this.hass.callService('homeassistant', 'toggle', {
      entity_id: state.entity_id
    });
  }
}
customElements.define('light-toggle-card', LightToggleCard);