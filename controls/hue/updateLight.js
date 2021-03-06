/**
 * Posts a payload to the specified light number of a Hue Bridge
 *
 */
 
const xapi = require('xapi');

function updateLight(bridgeip, username, light, payload, cb) {

  // Post message
  xapi.command(
    'HttpClient Put',
    {
      Header: ["Content-Type: application/json"],
      Url: `http://${bridgeip}/api/${username}/lights/${light}/state`
    },
    JSON.stringify(payload))
    .then((response) => {
      if (response.StatusCode == 200) {
        console.log("message pushed to bridge")
        if (cb) cb(null, response.StatusCode)
        return
      }
            
      console.log("failed with status code: " + response.StatusCode)
      if (cb) cb("failed with status code: " + response.StatusCode, response.StatusCode)
    })
    .catch((err) => {
      console.log("failed with err: " + err.message)
      if (cb) cb("Could not contact the bridge")
    })
}

// Update for your Hue deployment
const BRIDGE_IP = '192.168.1.33'
const BRIDGE_USER = 'SECRET'
const LIGHT_ID = 1 // number of your Bulb as registered at your Hue Bridge

// Turn green color
updateLight(BRIDGE_IP, BRIDGE_USER, LIGHT_ID, { "hue": 25500 }, console.log)
