// Prueba de concepto, sólo funciona en MacOS por el momento

const { spawn } = require('child_process');

let current_wifi = {
	ssid_name: null,
	ssid_key: null,
	router_ip: null,
	admin_url: null,
	admin_user: null,
	admin_passwd: null
};

// Obtener nombre del SSID
const ssid_proc = spawn('networksetup', ['-getairportnetwork', 'en1']);
ssid_proc.stdout.on('data', (data) => {
  current_wifi.ssid_name = data.toString().substr(23).trim();
  document.getElementById('ssid_name').innerHTML = `Red WiFi: <strong>"${current_wifi.ssid_name}"</strong>`;
  // Intentar obtener contraseña WEP o WPA
  const security_proc = spawn(
  	'security', ['find-generic-password', '-D', 'AirPort network password','-a', current_wifi.ssid_name, '-w']);
  security_proc.stdout.on('data', (data) => {
  	current_wifi.ssid_key = data;
  	document.getElementById('ssid_key').innerHTML = `El password de tu red es: <strong>${current_wifi.ssid_key}</strong>`;
  });
  security_proc.stderr.on('data', (data) => {
  	document.getElementById('ssid_key').innerHTML = `ERROR: <strong>${data}</strong>`;
  });
});
ssid_proc.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
  document.getElementById('ssid_name').innerHTML = `Error: <strong>${data}</strong>`;
});

// Intentar Obtener IP del router
const router_proc = spawn('networksetup', ['-getinfo', 'Wi-Fi']);
router_proc.stdout.on('data', (data) => {
  console.log(data.toString());
  m = data.toString().match(/Router: (.+)/);
  if (m) {
    current_wifi.router_ip = m[1];
    document.getElementById('router_ip').innerHTML = `IP de módem/router: <strong>${current_wifi.router_ip}</strong>`;

    // dedicir URL
    current_wifi.admin_url = `http://${current_wifi.router_ip}`;
    document.getElementById('admin_url').innerHTML = `URL de interfaz de administración: <strong>${current_wifi.admin_url}</strong>`;
    document.getElementById('admin').innerHTML = `<webview id="foo" src="${current_wifi.admin_url}" style="display:inline-flex; width:640px; height:480px"></webview>`;


  //   var win = window.open(current_wifi.admin_url, 'admin', { width: 400, height: 300});
	 //  win.webContents.on('did-finish-load', () => {
	 //    window.focus();
	 //    // win.focus();
	 // });
  }
});
router_proc.stderr.on('data', (data) => {
	document.getElementById('router_ip').innerHTML = `ERROR: <strong>${data}</strong>`;
});



// TODO:
/*
Una vez obtenidos los datos suficientes,
intentar login
y ejecutar proceso deconfioguración para modo emergencia
*/
