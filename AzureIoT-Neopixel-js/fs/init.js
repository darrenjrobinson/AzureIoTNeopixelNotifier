load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');
load('api_neopixel.js');


print('************* Setting NeoPixel Globals ****************');
let pin = 5, numPixels = 16, colorOrder = NeoPixel.GRB, cnt = 0;
let strip = NeoPixel.create(pin, numPixels, colorOrder);
strip.clear();
strip.show(strip);

// Receive MQTT Messages from Azure
MQTT.sub('devices/' + Cfg.get('device.id') + '/messages/devicebound/#', function(conn, topic, msg) {
 print('Topic:', topic, 'message:', msg);
 
   // Number of iterations to light LED's on the ring 
  let rotations = 750;
  
  // RGB Color Codes 
  // https://www.rapidtables.com/web/color/RGB_Color.html
  
  if (msg === "PINK"){
        // PINK 
        for(let colorLoop = 0; colorLoop < rotations; colorLoop++){ 
          strip.clear();
          strip.setPixel(++cnt % 16 /* pixel */, 150, 0, 50);
          strip.show(strip);
        }
        strip.clear();
        strip.show(strip);
  }
  
    if (msg === "GREEN"){
        // GREEN
        for(let colorLoop = 0; colorLoop < rotations; colorLoop++){ 
          strip.clear();
          strip.setPixel(++cnt % 16 /* pixel */, 0, 150, 0);                
          strip.show(strip);
        }
        strip.clear();
        strip.show(strip);
  }
  
      if (msg === "BLUE"){
        // BLUE  
        for(let colorLoop = 0; colorLoop < rotations; colorLoop++){ 
          strip.clear();
          strip.setPixel(++cnt % 16 /* pixel */, 0, 0, 150);                
          strip.show(strip);
        }
        strip.clear();
        strip.show(strip);
  }

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
