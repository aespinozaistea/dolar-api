# Cotización del dólar en Argentina

Sitio web estático que muestra las cotizaciones actuales del **dólar oficial** y
del **dólar blue** en Argentina, obtenidas de la API pública **DolarAPI**.

La página no almacena datos: al cargarse consulta la API y presenta el precio de
compra, el precio de venta y la fecha de última actualización de cada cotización.

## Tecnologías

- HTML, CSS y JavaScript (nativo, sin frameworks).
- Git (control de versiones).
- Docker (contenedor).
- Nginx (servidor web de la imagen Docker).

## Requisitos

- Docker instalado y funcionando.
- Un navegador web y conexión a Internet para consultar la API.

## API consumida

- **Proveedor:** DolarAPI.
- **Endpoint:** `GET https://dolarapi.com/v1/dolares`
- **Documentación:** https://dolarapi.com/docs/argentina/operations/get-dolares
- **Atribución:** datos provistos por [DolarAPI](https://dolarapi.com/).

## Construcción de la imagen

Desde la raíz del proyecto:

```bash
docker build -t tp-dolar-argentina .
```

## Ejecución del contenedor

```bash
docker run --rm --name tp-dolar-argentina -p 8080:80 tp-dolar-argentina
```

## Acceso

Abrir en el navegador: http://localhost:8080

## Estructura de archivos

```text
.
├── index.html   # Estructura semántica de la página y atribución de DolarAPI.
├── style.css    # Estilos propios, adaptables a móvil y escritorio.
├── app.js       # Consulta la API, valida la respuesta y actualiza el DOM.
├── Dockerfile   # Imagen Nginx que publica los archivos estáticos.
└── README.md    # Documentación del proyecto.
```
