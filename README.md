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

## Guía de instalación y ejecución paso a paso

Seguí los pasos en orden.

### Requisitos previos

- **Docker** instalado y funcionando.
  - Ubuntu: `sudo apt update && sudo apt install docker.io` (o instalar Docker Desktop).
  - Windows/macOS: instalar **Docker Desktop** desde https://www.docker.com/products/docker-desktop/ y abrirlo hasta que el ícono quede activo.
- **Git** instalado (`git --version`).
- Conexión a Internet y un navegador.

Verificá que todo responda **antes de empezar**:

```bash
docker --version
git --version
docker run hello-world      # debe imprimir un mensaje de bienvenida
```

> En **Linux/Ubuntu**, si `docker` da error de permisos, agregá tu usuario al grupo:
> `sudo usermod -aG docker $USER` y luego cerrá y reabrí la sesión (o usá `sudo`
> delante de cada comando `docker`).

### Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/aespinozaistea/dolar-api.git
```

### Paso 2 — Entrar a la carpeta del proyecto

```bash
cd dolar-api
```

> El nombre de la carpeta es el último tramo de la URL, sin `.git`. Confirmá que
> estás en el lugar correcto listando los archivos: `ls` (Ubuntu/macOS) o `dir`
> (Windows). Deberías ver `Dockerfile`, `index.html`, `style.css`, `app.js` y `README.md`.

### Paso 3 — Construir la imagen Docker

```bash
docker build -t tp-dolar-argentina .
```

- La `-t tp-dolar-argentina` es solo el **nombre** que le damos a la imagen.
- El `.` final es importante: indica "construir usando esta carpeta actual".
- La primera vez tarda un poco porque descarga `nginx:alpine`.

### Paso 4 — Ejecutar el contenedor

```bash
docker run --rm --name tp-dolar-argentina -p 8080:80 tp-dolar-argentina
```

- `-p 8080:80` publica el puerto **8080 de tu máquina** hacia el **80 del contenedor**.
- Esta terminal queda "ocupada" mostrando los logs mientras la app corre. **Dejala abierta.**

### Paso 5 — Abrir la aplicación

En el navegador entrá a:

```text
http://localhost:8080
```

Deberías ver las cotizaciones del **dólar oficial** y **dólar blue**.

### Paso 6 — Detener la aplicación

- Opción A: volvé a la terminal del Paso 4 y presioná **Ctrl + C**.
- Opción B: desde **otra** terminal:

```bash
docker stop tp-dolar-argentina
```

### Problemas frecuentes

| Síntoma | Causa / solución |
|---|---|
| `docker: command not found` | Docker no está instalado o no está en el PATH. Reabrí la terminal; en Ubuntu verificá con `sudo systemctl start docker`. |
| `permission denied` en Linux | Agregá tu usuario al grupo `docker` (ver Requisitos) y reiniciá la sesión. |
| `port is already allocated` | El puerto 8080 está ocupado: usá otro, p. ej. `-p 8081:80`, y abrí `http://localhost:8081`. |
| La página no muestra precios | Revisá tu conexión a Internet (la app consulta DolarAPI) y mirá la consola del navegador con F12. |

## Estructura de archivos

```text
.
├── index.html   # Estructura semántica de la página y atribución de DolarAPI.
├── style.css    # Estilos propios, adaptables a móvil y escritorio.
├── app.js       # Consulta la API, valida la respuesta y actualiza el DOM.
├── Dockerfile   # Imagen Nginx que publica los archivos estáticos.
└── README.md    # Documentación del proyecto.
```
