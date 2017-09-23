# WiFi911

**Clonar para correr prueba de concepto ($ npm install && npm start)**

Flujo [borrador]

1) Identificar SSID de red WiFi e IP de gateway

2) Obtener contraseña de WiFi actual, que tiene mucha probilidad de ser la misma que para la administración del módem/router.

3) Intenta deducir y probar la información de acceso a la interfaz de administración del router/módem (URL, usuario, contraseña) para efectuar login. También considerar contraseñas conocidas, establecidas desde fábrica según marca/modelo del dispositivo, etc.

4) Si no se logra acceder, solicitar al usuario información que falte, si no lo a conoce o no funciona, mostrar instrucciones para restaurar router a modo de fábrica.

5) Ejecutar proceso para configurar modo emergencia.



Configurar modo emergencia:
(Todos los puntos aplican sólo a los dispositivos que soporten dicha característica)

1) Respaldar la configuración actual para restablecer la configuración del módem una vez levantada la emergencia (backup&restore)

2) Configurar la interfaz inalámbrica (si es posible, añadir una nueva en paralelo):
  - Establecer nombre del SSID para el modo emergencia
  - Potencia de transisión al máximo
  - Sin autenticación ni cifrado (red abierta)
  - Establecer un límite de usuarios máximos relativamente bajo,  pero al mismo tiempo establecer un tiempo bajo de 'lease' del DHCP para intentar evitar saturación y dar oportunidad a más dispositivos de que usen la red.
  - Otros "tunings"

 3) Verificar configuración de red:
   - Firewall desactivado
   - Filtros desactivados (MAC / IP / URLs)
   - Otros...


## Screenshot

![Screenshot](screenshot.jpg?raw=true "Screenshot")


## Licencia

[CC0 1.0 (Dominio Público)](LICENSE.md)
