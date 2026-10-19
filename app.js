(function () {
  "use strict";

  var ENDPOINT = "https://dolarapi.com/v1/dolares";

  var formateadorImporte = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
  });

  var formateadorFecha = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires"
  });

  var elementos = {
    status: document.getElementById("status"),
    oficial: {
      compra: document.getElementById("oficial-compra"),
      venta: document.getElementById("oficial-venta"),
      fecha: document.getElementById("oficial-fecha")
    },
    blue: {
      compra: document.getElementById("blue-compra"),
      venta: document.getElementById("blue-venta"),
      fecha: document.getElementById("blue-fecha")
    }
  };

  function formatearImporte(valor) {
    if (typeof valor !== "number" || !isFinite(valor)) {
      return "No disponible";
    }
    return formateadorImporte.format(valor);
  }

  function formatearFecha(valor) {
    if (typeof valor !== "string" || valor.trim() === "") {
      return "No disponible";
    }
    var fecha = new Date(valor);
    if (isNaN(fecha.getTime())) {
      return "No disponible";
    }
    return formateadorFecha.format(fecha);
  }

  function mostrarCotizacion(destino, registro) {
    if (!registro) {
      destino.compra.textContent = "No disponible";
      destino.venta.textContent = "No disponible";
      destino.fecha.textContent = "No disponible";
      return;
    }
    destino.compra.textContent = formatearImporte(registro.compra);
    destino.venta.textContent = formatearImporte(registro.venta);
    destino.fecha.textContent = formatearFecha(registro.fechaActualizacion);
  }

  function buscarCasa(lista, casa) {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i] && lista[i].casa === casa) {
        return lista[i];
      }
    }
    return null;
  }

  function mostrarError() {
    elementos.status.textContent = "No se pudieron cargar las cotizaciones.";
  }

  function cargarCotizaciones() {
    fetch(ENDPOINT)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Respuesta HTTP no exitosa");
        }
        return response.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) {
          throw new Error("Respuesta inválida");
        }
        var oficial = buscarCasa(data, "oficial");
        var blue = buscarCasa(data, "blue");
        mostrarCotizacion(elementos.oficial, oficial);
        mostrarCotizacion(elementos.blue, blue);
        elementos.status.textContent = "";
      })
      .catch(function () {
        mostrarError();
      });
  }

  cargarCotizaciones();
})();
