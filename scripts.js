var form = document.forms['form'];

form.onsubmit = function(e){
    e.preventDefault();

    let presentismo = 0.25;

    let nombre = document.getElementById("nombre").value;
    nombre = "Ricardo"
    let apellido = document.getElementById("apellido").value;
    nombre = "Ricardo"
    let cuil = document.getElementById("cuil").value;
    nombre = "Ricardo"
    let legajo = document.getElementById("legajo").value;
    nombre = "Ricardo"
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    let sueldoBasico = parseInt(document.getElementById("sueldoBasico").value) || 0;
    sueldoBasico = 100000
    let horaExtra100 = parseInt(document.getElementById("horaExtra100").value) || 0;
    let horaExtra50 = parseInt(document.getElementById("horaExtra50").value) || 0;
    let feriadosLV = parseInt(document.getElementById("feriadosLV").value) || 0;
    let feriadosS = parseInt(document.getElementById("feriadosS").value) || 0;
    let faltasLV = (parseInt(document.getElementById("faltasLV").value)) || 0;
    let faltasLVJustificado = parseInt(document.getElementById("faltasLVJustificado").value) || 0;
    let faltasS = (parseInt(document.getElementById("faltasS").value)) || 0;
    let faltasSJustificado = parseInt(document.getElementById("faltasSJustificado").value) || 0;

    let horasTrabajadas = 176;

    let valorHora = sueldoBasico/horasTrabajadas;
    
    horasTrabajadas -= ((faltasLV * 8) + (faltasS*4));
    
    faltasLVJustificado *= 8 * valorHora

    faltasSJustificado *= 4 * valorHora

    sueldoBasico -= ((faltasLV * 8) + (faltasS*4)) * valorHora

    valorHora = sueldoBasico/horasTrabajadas;

    
    
    feriadosLV *= (valorHora * 8);
    feriadosS *= (valorHora *4);

    if(faltasLV + faltasS === 1){
        presentismo = 0.20;
    }

    else if(faltasLV + faltasS === 2){
        presentismo = 0.15;
    }
    else if(faltasLV + faltasS === 3){
        presentismo = 0.10;
    }
    else if(faltasLV + faltasS === 4){
        presentismo = 0.05;
    }
    else if(faltasLV + faltasS >= 5){
        presentismo = 0;
    }
    
    horaExtra100 *= (valorHora * 2);
    horaExtra100 = (horaExtra100*1.1) + (horaExtra100*presentismo);

    horaExtra50 *= (valorHora * 1.5);
    horaExtra50 = (horaExtra50*1.1) + (horaExtra50*presentismo);

    feriadosLV = (feriadosLV*1.1) + (feriadosLV*presentismo)
    
    feriadosS = (feriadosS*1.1) + (feriadosS*presentismo)
    
    let sueldoBruto = (sueldoBasico*1.1 + sueldoBasico*presentismo) + faltasLVJustificado + faltasSJustificado + horaExtra100 + horaExtra50 + feriadosLV + feriadosS
    console.log(sueldoBruto)

    jubilacion = sueldoBruto * 0.11

    ley19032 = sueldoBruto * 0.03

    obraSocial = sueldoBruto * 0.03

    let sueldoNeto = sueldoBruto - jubilacion - ley19032 - obraSocial
    console.log(sueldoNeto)
    document.getElementById("anadirLuego").insertAdjacentHTML("afterend",
                `<div class="card bg-secondary m-2">
                <div class="card-body">
                  <h4 class="card-title text-center">Recibo</h4>
                  <div class="table-responsive">
                    <table class="table table-primary table-bordered border-black">
                      <thead>
                        <tr>
                          <th scope="col">Fuente</th>
                          <th scope="col">Datos/Paga</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="">
                          <td scope="row">Nombre:</td>
                          <td>${nombre}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Apellido:</td>
                            <td>${apellido}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Cuil:</td>
                            <td>${cuil}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Legajo:</td>
                            <td>${legajo}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Fecha de ingreso:</td>
                            <td>${fechaIngreso}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Sueldo Basico:</td>
                            <td>${sueldoBasico}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Horas extras al 100%:</td>
                            <td>${horaExtra100}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Horas extas al 50%:</td>
                            <td>${horaExtra50}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Feriados de Lunes a Viernes:</td>
                            <td>${feriadosLV}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Feriados los Sabados:</td>
                            <td>${feriadosS}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Faltas de Lunes a Viernes:</td>
                            <td>${faltasLV}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Faltas de Luneas a Viernes, justificadas:</td>
                            <td>${faltasLVJustificado}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Faltas en Sabado:</td>
                            <td>${faltasS}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Faltas en Sabado, justificadas:</td>
                            <td>${faltasSJustificado}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Sueldo bruto:</td>
                            <td>${sueldoBruto}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Sueldo neto:</td>
                            <td>${sueldoNeto}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                </div>
              </div>`);
}