load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');
load('api_neopixel.js');

// Receive MQTT Messages from Azure
MQTT.sub('devices/' + Cfg.get('device.id') + '/messages/devicebound/#', function(conn, topic, msg) {
 print('Topic:', topic, 'message:', msg);
}, null);

let pin = 5, numPixels = 16, colorOrder = NeoPixel.GRB, cnt = 0;
let s = NeoPixel(pin, numPixels, colorOrder);
Timer.set(100, 1, function() {
  NeoPixel.clear(s);
  NeoPixel.setPixel(s, ++cnt % 12, 0, 30, 0);
  NeoPixel.show(s);
}, null);


// Monitor network connectivity.
Event.addGroupHandler(Net.EVENT_GRP, function(ev, evdata, arg) {
  let evs = '???';
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = 'DISCONNECTED';
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = 'CONNECTING';
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = 'CONNECTED';
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = 'GOT_IP';
  }
  print('== Net event:', ev, evs);
}, null);
