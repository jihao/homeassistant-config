class DateTimeCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.className = 'datetime'
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = '/local/custom_ui/datetime-card.css';
      card.appendChild(link);
      this.content = document.createElement('div');
      this.content.className = 'card';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    
    const entity_date = hass.states[this.config.entity_date].state;
    const entity_time = hass.states[this.config.entity_time].state;


    this.content.innerHTML = `
      <div class="datetime clear">
          <h1 class="time">${entity_time}</h1>
          <h2 class="date">${entity_date}</h2>
      </div>`;
  }

  setConfig(config) {
    if (!config.entity_date || !config.entity_time) {
      throw new Error('Please define entities');
    }
    this.config = config;
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 2;
  }
}

customElements.define('datetime-card', DateTimeCard);
