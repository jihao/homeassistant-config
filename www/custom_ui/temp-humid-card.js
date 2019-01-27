class TempHumidCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.className = 'temp-humid'
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = '/local/custom_ui/temp-humid-card.css';
      card.appendChild(link);
      this.content = document.createElement('div');
      this.content.className = 'card';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    
    const entity_temp = hass.states[this.config.entity_temperature];
    const entity_humid = hass.states[this.config.entity_humidity];


    this.content.innerHTML = `
      <div class="temp-humid clear">
          <span class="temp-humid-text">
          室温：${entity_temp.state} ${entity_temp.attributes.unit_of_measurement}    
          湿度: ${entity_humid.state} ${entity_humid.attributes.unit_of_measurement}</span>
      </div>`;
  }

  setConfig(config) {
    if (!config.entity_temperature || !config.entity_humidity) {
      throw new Error('Please define entities');
    }
    this.config = config;
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 1;
  }
}

customElements.define('temp-humid-card', TempHumidCard);
