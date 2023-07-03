# Lista de reproducción para un reproductor de música en la web

Este repositorio contiene una solución para la prueba técnica frontend que consiste en desarrollar una lista de reproducción para un reproductor de música en la web utilizando Angular.

## Introducción

Un cliente ha solicitado a nuestra empresa desarrollar una lista de reproducción para un reproductor de música en la web. La aplicación ya cuenta con gran parte de la funcionalidad de un reproductor de música convencional, lo único que hace falta para completarlo es un módulo o sección en la cual el usuario del reproductor pueda añadir nuevas listas de reproducción, visualizar las listas de reproducción que ha creado, visualizar el detalle de una lista de reproducción creada y borrar una lista de reproducción creada.

Para el módulo que maneja las listas de reproducción y registro de canciones, ya se tienen unos servicios web con unos endpoint o servicios disponibles asociados. Los servicios para manejar la lista de reproducción se presentan a continuación:

https://app.quipux.com/testqx/api/swagger-ui/index.html

Se deben implementar los endpoint definidos en la anterior documentación en swagger, utilizando el API de autenticación para registrar usuarios y hacer login para consumir los otros servicios.


## Puntos a Evaluar

1. Debe tener al menos un componente standalone o no standalone.
    - [./src/app/app.component.ts](./src/app/app.component.ts)
    - [./src/app/modules/playlists/components/form/form.component.ts](./src/app/modules/playlists/components/form/form.component.ts)
    - [./src/app/modules/playlists/components/songs-form/songs-form.component.ts](./src/app/modules/playlists/components/songs-form/songs-form.component.ts)
    - [./src/app/modules/playlists/components/list/list.component.ts](./src/app/modules/playlists/components/list/list.component.ts)
    - [./src/app/modules/playlists/playlists.component.ts](./src/app/modules/playlists/playlists.component.ts)
    - [./src/app/modules/auth/auth.component.ts](./src/app/modules/auth/auth.component.ts)
    - [./src/app/modules/auth/components/sing-up/sing-up.component.ts](./src/app/modules/auth/components/sing-up/sing-up.component.ts)
    - [./src/app/modules/auth/components/sing-in/sing-in.component.ts](./src/app/modules/auth/components/sing-in/sing-in.component.ts)
    - [./src/app/modules/layout/layout.component.ts](./src/app/modules/layout/layout.component.ts)
2. Debe tener una directiva.
    - [./src/app/app.component.html](./src/app/app.component.html)
    - [./src/app/modules/playlists/components/form/form.component.html](./src/app/modules/playlists/components/form/form.component.html)
    - [./src/app/modules/playlists/components/songs-form/songs-form.component.html](./src/app/modules/playlists/components/songs-form/songs-form.component.html)
    - [./src/app/modules/playlists/components/list/list.component.html](./src/app/modules/playlists/components/list/list.component.html)
    - [./src/app/modules/playlists/playlists.component.html](./src/app/modules/playlists/playlists.component.html)
    - [./src/app/modules/auth/components/sing-up/sing-up.component.html](./src/app/modules/auth/components/sing-up/sing-up.component.html)
    - [./src/app/modules/auth/components/sing-in/sing-in.component.html](./src/app/modules/auth/components/sing-in/sing-in.component.html)
    - [./src/app/modules/auth/auth.component.html](./src/app/modules/auth/auth.component.html)
    - [./src/app/modules/layout/layout.component.html](./src/app/modules/layout/layout.component.html)
3. Debe tener una transformación de datos empleando alguno de los pipe con lo que
    - [/src/app/core/pipes/truncate.pipe.ts](/src/app/core/pipes/truncate.pipe.ts)
viene el framework o mejor aún si se crea uno.
4. Debe tener un interceptor.
    - [./src/app/core/interceptors/error.interceptor.ts](./src/app/core/interceptors/error.interceptor.ts)
    - [./src/app/core/interceptors/json-web-token.interceptor.ts](./src/app/core/interceptors/json-web-token.interceptor.ts)
5. Debe tener un guard.
    - [./src/app/core/guards/authenticated.guard.ts](./src/app/core/guards/authenticated.guard.ts)
6. Debe haber al menos un service de angular.
    - [./src/app/core/services/session.service.ts](./src/app/core/services/session.service.ts)
    - [./src/app/modules/playlists/services/songs.service.ts](./src/app/modules/playlists/services/songs.service.ts)
    - [./src/app/modules/playlists/services/playlists.service.ts](./src/app/modules/playlists/services/playlists.service.ts)
    - [./src/app/modules/auth/services/auth.service.ts](./src/app/modules/auth/services/auth.service.ts)
7. Implementar un par de pruebas unitarias a alguna parte de su código que usted elija.
    - [./src/app/core/pipes/truncate.pipe.spec.ts](./src/app/core/pipes/truncate.pipe.spec.ts)
    - [./src/app/core/guards/authenticated.guard.spec.ts](./src/app/core/guards/authenticated.guard.spec.ts)
8. Debe tener al menos 2 rutas y es indispensable implementar un login falso que al ingresar lleve al reproductor web.
    - [./src/app/app-routing.module.ts](./src/app/app-routing.module.ts)
    - [./src/app/modules/playlists/playlists-routing.module.ts](./src/app/modules/playlists/playlists-routing.module.ts)
    - [./src/app/modules/auth/auth-routing.module.ts](./src/app/modules/auth/auth-routing.module.ts)
    - [./src/app/modules/layout/layout-routing.module.ts](./src/app/modules/layout/layout-routing.module.ts)
9. Implementar los formularios empleando ReactiveForms.
    - [./src/app/modules/playlists/components/form/form.component.ts](./src/app/modules/playlists/components/form/form.component.ts)
    - [./src/app/modules/playlists/components/songs-form/songs-form.component.ts](./src/app/modules/playlists/components/songs-form/songs-form.component.ts)
    - [./src/app/modules/auth/components/sing-up/sing-up.component.ts](./src/app/modules/auth/components/sing-up/sing-up.component.ts)
    - [./src/app/modules/auth/components/sing-in/sing-in.component.ts](./src/app/modules/auth/components/sing-in/sing-in.component.ts)


## Instrucciones de uso

Para utilizar esta solución, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local.
2. Configura el archivo `environment.ts` con las credenciales de autenticación proporcionadas por el cliente.
3. Ejecuta el comando `npm install` en tu terminal para instalar las dependencias necesarias.
4. Ejecuta el comando `ng serve` para iniciar el servidor y la aplicación web.
5. Accede a `http://localhost:4200` en tu navegador para utilizar la lista de reproducción.
6. Tambien puedes acceder directamente a la version desplegada en GitHubPages aqui https://luisvega91.github.io/quipux-test/auth

<sub>__nota:__ el backend no tiene configurado los CORS para ser consumido por el dominio en el cual se encutra deplegado actualmente este rpoyecto, por lo tanto recomiendo usar el navegador chrome con la siguiente opcion 

mac:
```sh
    $ open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

```

windows:
```cmd 
    >  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="c:/carpeta_temporal
```

</sub>

## Tecnologías utilizadas

Este proyecto ha sido desarrollado utilizando las siguientes tecnologías:

- Angular
- TypeScript
- RxJS
- NG-ZORRO

## Mokups y Diseño arquitectonico 

[Mokups y Diseño arquitectonico](https://www.figma.com/file/VK75T3ncWpPG8zMWfbofUw/Test-Quipux?type=design&node-id=0%3A1&mode=design&t=dGfRaH4CczJ7alzP-1)

## Autor

Este proyecto ha sido desarrollado por Luis Enrique Vega Martinez. Si tienes alguna pregunta o comentario, no dudes en contactarme a través de mi correo electrónico: luisevegam.91@gmail.com.
