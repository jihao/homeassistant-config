/**
 *  feature: 修改HTMLElement根节点的style，跟horizontal-stack组合使用时，可以修改flex布局的属性
 * */
class CardWrapper extends HTMLElement {

    setConfig(config) {
        this.config = config;

        let tag = this.config.card.type;
        if (tag.startsWith("custom:"))
            tag = tag.substr(7);
        else
            tag = `hui-${tag}-card`;
        this.card = document.createElement(tag);
        this.card.setConfig(config.card);
        this.appendChild(this.card);

        this._cardTagMod();
    }

    _cardTagMod() {
        if (!this.config.tagStyle) return;
        for (var k in this.config.tagStyle) {
            this.style.setProperty(k, this.config.tagStyle[k]);
        }
    }

    set hass(hass) {
        if (!hass) return;
        if (this.card) this.card.hass = hass;
    }

    getCardSize() {
        return this.card.getCardSize();
    }
}

customElements.define('card-wrapper', CardWrapper);
