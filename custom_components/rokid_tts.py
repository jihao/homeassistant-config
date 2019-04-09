import requests
import voluptuous as vol
import homeassistant.helpers.config_validation as cv
import logging

_LOGGER = logging.getLogger(__name__)

CONF_ROKID_SN = 'sn'
CONF_WEBHOOK_ID = 'webhook_id'

ATTR_MESSAGE = 'message'

DOMAIN = 'rokid_tts'

SERVICE_SCHEMA = vol.Schema({
    vol.Required(ATTR_MESSAGE): cv.string,
})

CONFIG_SCHEMA = vol.Schema({
    DOMAIN: vol.Schema({
        vol.Required(CONF_ROKID_SN): cv.string,
        vol.Required(CONF_WEBHOOK_ID): cv.string,
    }),
}, extra=vol.ALLOW_EXTRA)

def setup(hass, config):
    conf = config.get(DOMAIN, {})
    rokid_sn = conf.get(CONF_ROKID_SN)
    webhook_id = conf.get(CONF_WEBHOOK_ID)  
    
    def send_message(call):
        message = call.data.get(ATTR_MESSAGE) 
        client = rokid_tts(rokid_sn, webhook_id)       
        try:
            message = client.speak(message)
        except Exception as e:
            _LOGGER.error(e)

    hass.services.register(DOMAIN, 'speak', send_message, schema=SERVICE_SCHEMA)
    return True

class rokid_tts:

    def __init__(self, rokid_sn=None, webhook_id=None):     
        self._rokid_sn = rokid_sn
        self._headers = {"Content-Type": "application/json; charset=utf-8"}
        self._tts_url = "https://homebase.rokid.com/trigger/with/{}".format(webhook_id)

    def _text_to_speech(self, text):
        try:
            data = {"type":"tts","devices":{"sn": self._rokid_sn},"data": {"text": text}}
            r = requests.post(self._tts_url, headers=self._headers, json=data)
            if r.status_code == 200:
                return
        except Exception as e:
            _LOGGER.error(e)
            return False

    def speak(self, text):
        if text:
            self._text_to_speech(text)
        else:
            _LOGGER.error('Please provide message to speak!')