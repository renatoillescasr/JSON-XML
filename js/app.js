var http_request = false;

function makeRequest(url) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/plain');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);
}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            /*Aquí deben procesar el JSON y mostrar la respuesta en el HTML*/
            /*
            leerJSON('gastos_personales.json');
            leerXML('servicios_basico.xml');*/
             

        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

function leerJSON(url) {
  //lectura del JSON
  var json = JSON.parse(http_request.responseText);
  var datoswebJSON = document.getElementById("usuarios");
  json.forEach(function(usuarios){
    console.log(usuarios.nombre);
    console.log(usuarios.servicios);
    //creacion de usuarios con hipervinculo
    var contenedor_usuarios = document.createElement("div");
    var a_usuarios = document.createElement("a");
    a_usuarios.setAttribute("href","#");
    a_usuarios.textContent = usuarios.nombre;
    contenedor_usuarios.appendChild(a_usuarios);

    //agregar servicios, deudas por servicio y total a pagar
    var total = 0;
    usuarios.servicios.forEach(function(obj){
      var p_servicio = document.createElement("p");
      var p_deuda = document.createElement("p");
      p_servicio.textContent = obj.servicio;
      p_deuda.textContent = obj.deuda;
      contenedor_usuarios.appendChild(p_servicio);
      contenedor_usuarios.appendChild(p_deuda);
      total += parseFloat(obj.deuda);
      //totalf = total.toFixed(2);
    });

    //agrega valor total a pagar
    var p_total = document.createElement("p");
    p_total.textContent = "Total a pagar: " + total.toFixed(2);;
    contenedor_usuarios.appendChild(p_total);
    console.log(total.toFixed(2));
    datoswebJSON.appendChild(contenedor_usuarios);
  });
}

function leerXML(url) {
  var datoswebXML = document.getElementById("usuarios");
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(http_request.responseText, "application/xml");
  var leerTags = xmlDoc.getElementsByTagName('servicio');
  for(var i=0; i < leerTags.length ; i++){
    console.log(leerTags[i].getAttribute("tipo"));
    var servicio_nombre = document.createElement("p");
    servicio_nombre.textContent = leerTags[i].querySelector("nombre").textContent;
    console.log(servicio_nombre);
    var servicio_direccion = document.createElement("p");
    servicio_direccion.textContent = leerTags[i].querySelector("direccion").textContent;
    console.log(servicio_direccion);
    var servicio_telefono = document.createElement("p");
    servicio_telefono.textContent = leerTags[i].querySelector("telefono").textContent;
    console.log(servicio_telefono);

    datoswebXML.appendChild(servicio_nombre);
    datoswebXML.appendChild(servicio_direccion);
    datoswebXML.appendChild(servicio_telefono);
 }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('gastos_personales.json');
    }
}
