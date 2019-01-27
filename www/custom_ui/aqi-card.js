class AQICard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.className = 'aqi'
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = '/local/custom_ui/aqi-card.css';
      card.appendChild(link);
      this.content = document.createElement('div');
      this.content.className = 'aqicard';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const air_quality_index = hass.states[this.config.entity_waqi].state;

    const getAQI = function () {
        var AQIlevel = ``;
        switch (true) {
          case (air_quality_index < 50):
            return AQIlevel = '1';
          case (air_quality_index < 100):
            return AQIlevel = '2';
          case (air_quality_index < 150):
            return AQIlevel = '3';
          case (air_quality_index < 200):
            return AQIlevel = '4';
          case (air_quality_index < 300):
            return AQIlevel = '5';
          case (air_quality_index < 9999):
            return AQIlevel = '6';
          default:
            return AQIlevel = '1';
        }
      };

    const ICON = {
        '1': 'mdi:emoticon-excited',
        '2': 'mdi:emoticon-happy',
        '3': 'mdi:emoticon-neutral',
        '4': 'mdi:emoticon-sad',
        '5': 'mdi:emoticon-poop',
        '6': 'mdi:emoticon-dead'
      };
      const AQIbgColor = {
        '1': `#A8E05F`,
        '2': '#FDD74B',
        '3': '#FE9B57',
        '4': '#FE6A69',
        '5': '#A97ABC',
        '6': '#A87383',
      }
      const AQIfaceColor = {
        '1': `#B0E867`,
        '2': '#E3C143',
        '3': '#E48B4E',
        '4': '#E45F5E',
        '5': '#986EA9',
        '6': '#A5516B',
      }
      const AQIfontColor = {
        '1': `#718B3A`,
        '2': '#A57F23',
        '3': '#B25826',
        '4': '#AF2C3B',
        '5': '#634675',
        '6': '#683E51',
      }

    this.content.innerHTML = `
    <div class="grid-container" style="background-color: ${AQIbgColor[getAQI()]};">
      <div class="row">
        <div class="col-left" style="background-color: ${AQIfaceColor[getAQI()]};">
            <ha-icon style="color:${AQIfontColor[getAQI()]}; width: 3.5em; height: 4.5em;" icon="${ICON[getAQI()]}"></ha-icon>
        </div>  
        <div class="col-right" style="background-color: ${AQIbgColor[getAQI()]};  color: ${AQIfontColor[getAQI()]}"> 
            <div style="font-size:2em; line-height: 100px; padding: 20px 0px;">${air_quality_index}</div>
            AQI
        </div>
      </div>
    </div> 
  `;      

  }

  setConfig(config) {
    if (!config.entity_waqi) {
      throw new Error('Please define entities');
    }
    this.config = config;
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 2;
  }
}

customElements.define('aqi-card', AQICard);
