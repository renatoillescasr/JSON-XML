
function cargarDatosServicios() {
  //Carga de datos empresa desde servicios_basicos.xml
  $.ajax({
    url: 'data/servicios_basicos.xml',
    error: function() {
      alert('¡error al cargar el archivo con los ritmos!')
    },
    dataType: 'xml',
    success: function(data) {
      $(data).find('servicio').each(function(){
        //captura el atributo "tipo" del tag "servicio" de servicios_basicos.xml
        $servicio = $(this).attr('tipo');
        console.log($servicio);

        let p_nombre = $('<p></p>');
        var nombre = $(this).find('nombre').text();
        p_nombre.append(nombre);
        $(".energía").append(p_nombre);

        let p_direccion = $('<p></p>');
        var direccion = $(this).find('direccion').text();
        p_direccion.append(direccion);
        $(".energía").append(p_direccion);

        let p_telefono = $('<p></p>');
        var telefono = $(this).find('telefono').text();
        p_telefono.append(telefono);
        $(".energía").append(p_telefono);
      });
    },
    type: 'GET'
  });
}

function cargarUsuarios() {
  $.getJSON("data/gastos_personales.json", function(data) {
    //Leer del Json.nombre
    for(var i=0 ; i<data.length ; i++){
      //console.log(data[i].nombre);
      //Leer los nombres del json
      var $p_nombre = $('<h3></h3>');
      $p_nombre.text(data[i].nombre);
      $("#usuarios").append($p_nombre);

      //Leer del Json.servicios
      for(var j=0 ; j<data[i].servicios.length ; j++){
        var cont_servicio = data[i].servicios[j].servicio;
        //console.log(cont_servicio);
        var $p_servicio = $('<div></div>');
        $p_servicio.attr("class",cont_servicio)
        $p_servicio.text(cont_servicio);
        $("#usuarios").append($p_servicio);

        var cont_deuda = data[i].servicios[j].deuda;
        //console.log(cont_deuda);
        var $p_deuda = $('<p></p>');
        $p_deuda.text(cont_deuda);
        $("#usuarios").append($p_deuda);
      }
    }
  });
}

$(window).load(function() {
    cargarUsuarios();
    cargarDatosServicios();
});
