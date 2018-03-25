let Blynk = {
  _send: ffi('void blynk_send(void *, int, int, void *, int)'),

  // **`Blynk.send(conn, type, msg, id)`**
  // Send raw message to Blynk server.
  //
  // `conn` is a network connection which is passed to the handler registered
  // with `Blynk.setHandler`. `type` is one of the following:
  //
  // - `Blynk.TYPE_RESPONSE`
  // - `Blynk.TYPE_LOGIN`
  // - `Blynk.TYPE_PING`
  // - `Blynk.TYPE_HARDWARE`
  //
  // `msg` is a string with the data to send. `id` is the internal blynk
  // message id; if undefined it will be autogenerated.
  //
  // Return value: none.
  // Example:
  // ```javascript
  // // Send "virtual write" command manually: write "1" to pin "16"
  // Blynk.send(conn, Blynk.TYPE_HARDWARE, 'vw\x0016\x001');
  // ```
  send: function(conn, type, msg, id) {
    this._send(conn, type, id || 0, msg, msg.length);
  },

  // **`Blynk.virtualWrite(conn, pin, val, id)`**
  // Write to the virtual pin. If id is undefined, it will be autogenerated.
  // This is a helper function that uses `Blynk.send()`.
  // Return value: none.
  // Example:
  // ```javascript
  // // Send "virtual write" command: write "1" to pin "16"
  // Blynk.virtualWrite(conn, 16, 1);
  // ```
  virtualWrite: function(conn, pin, val, id) {
    let msg = 'vw\x00' + JSON.stringify(pin) + '\x00' + JSON.stringify(val);
    this.send(conn, Blynk.TYPE_HARDWARE, msg, id);
  },

  TYPE_RESPONSE: 0,
  TYPE_LOGIN: 2,
  TYPE_PING: 6,
  TYPE_HARDWARE: 20,

  // **`Blynk.setHandler(handler, userdata)`**
  // Set handler for the virtual pin reads / writes.
  // 
  // Example:
  // ```javascript
  // Blynk.setHandler(function(conn, cmd, pin, val, id) {
  //   print(cmd, pin, val);
  // }, null);
  // ```
  setHandler: ffi('void blynk_set_handler(void (*)(void *, char *, int, int, int, userdata), userdata)'),
};
