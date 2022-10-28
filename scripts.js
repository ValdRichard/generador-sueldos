var form = document.forms['form'];

var aguinaldo
var vacaciones
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

form.onsubmit = function(e){
    e.preventDefault();
    let presentismo = 0.25;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let cuil = document.getElementById("cuil").value;
    let legajo = document.getElementById("legajo").value;
    let fechaIngreso = new Date(document.getElementById("fechaIngreso").value);
    let sueldoBasico = parseInt(document.getElementById("sueldoBasico").value) || 0;
    let horaExtra100 = parseInt(document.getElementById("horaExtra100").value) || 0;
    let horaExtra50 = parseInt(document.getElementById("horaExtra50").value) || 0;
    let feriadosLV = parseInt(document.getElementById("feriadosLV").value) || 0;
    let feriadosS = parseInt(document.getElementById("feriadosS").value) || 0;
    let faltasLV = (parseInt(document.getElementById("faltasLV").value)) || 0;
    let faltasLVJustificado = parseInt(document.getElementById("faltasLVJustificado").value) || 0;
    let faltasS = (parseInt(document.getElementById("faltasS").value)) || 0;
    let faltasSJustificado = parseInt(document.getElementById("faltasSJustificado").value) || 0;
    let sueldoBasico2 = parseInt(document.getElementById("sueldoBasico").value) || 0;
    let horasTrabajadas = 176;

    let valorHora = sueldoBasico/horasTrabajadas;
    
    horasTrabajadas -= ((faltasLV * 8) + (faltasS*4));
    
    faltasLVJustificado *= 8 * valorHora

    faltasSJustificado *= 4 * valorHora

    let valorFaltasLV = faltasLV * 8 *valorHora
    let valorFaltasS = faltasS * 4 * valorHora
    sueldoBasico -= ((faltasLV * 8) + (faltasS*4)) * valorHora
    sueldoBasico2 -= valorFaltasLV + valorFaltasS

    console.log(sueldoBasico)
    console.log(sueldoBasico2)

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
    
    var sueldoBruto = (sueldoBasico*1.1 + sueldoBasico*presentismo) + faltasLVJustificado + faltasSJustificado + horaExtra100 + horaExtra50 + feriadosLV + feriadosS
    

    function getLastDayOfYear(year) {
        return new Date(year, 11, 31);
      }
      
    
    const currentYear = new Date().getFullYear();
    
    var today = getLastDayOfYear(currentYear);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =  yyyy + '-' + mm + '-' + dd;

    var dd2 = String(fechaIngreso.getDate() + 1).padStart(2, '0');
    var mm2 = String(fechaIngreso.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy2 = fechaIngreso.getFullYear();

    fechaIngreso = yyyy2 + '-' + mm2 + '-' + dd2;
    

    let diferencia = diffDays(new Date(fechaIngreso), new Date(today))
    
    aguinaldo = sueldoBruto/2

    let valorDiaVacaciones = (sueldoBasico*1.1 + sueldoBasico*presentismo)/22;
    
    let produccion = sueldoBasico *0.1 
    let presen = sueldoBasico *presentismo

    let diasVacaciones = 0
    
    

    if (diferencia < 184){
        diasVacaciones = Math.floor(diferencia/22);
    }
    else if (diferencia >= 184 && diferencia < 1825){
        diasVacaciones = 14
    } else if(diferencia >= 1825 && diferencia < 3650){
        diasVacaciones = 21
    } else if(diferencia >= 3650){
        diasVacaciones = 28
    }

    vacaciones = diasVacaciones * valorDiaVacaciones;

    function Vacaciones(){
        return vacaciones
    }

    var jubilacion
    var ley19032
    var obraSocial

    jubilacion = sueldoBruto * 0.11

    ley19032 = sueldoBruto * 0.03

    obraSocial = sueldoBruto * 0.03
    
    
    

    var totalDeducciones = jubilacion + ley19032 + obraSocial

    var aguiYVaca = document.getElementById('aguiYVaca').value


    let sueldoNeto = sueldoBruto - jubilacion - ley19032 - obraSocial

    document.getElementById("carta").innerHTML=`<div class="recibo d-flex align-items-center justify-content-center ">
            <div class="card m-2" id="recibo"> 
                <div class="card-body">
                  <h4 class="card-title text-center text-black">Recibo</h4>
                  <div class="table-responsive">
                    <table class="table table-striped table-light table-hover table-bordered border-black text-black" id="tablita">
                        <thead>
                        <tr class="text-center ">
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
                            <td>${sueldoBasico.toFixed(2)}</td>
                        </tr>
                        <tr class="suma">
                            <td scope="row">Horas extas (al 50% y 100%):</td>
                            <td>+ ${(horaExtra100 + horaExtra50).toFixed(2)}</td>
                        </tr>
                        <tr class="suma">
                            <td scope="row">Feriados de Lunes a Viernes:</td>
                            <td>+ ${feriadosLV.toFixed(2)}</td>
                        </tr>
                        <tr class="suma">
                            <td scope="row">Feriados los Sabados:</td>
                            <td>+ ${feriadosS.toFixed(2)}</td>
                        </tr>
                        <tr class="resta">
                            <td scope="row">Faltas de Lunes a Viernes:</td>
                            <td>- ${valorFaltasLV.toFixed(2)}</td>
                        </tr>
                        <tr class="suma">
                            <td scope="row">Faltas de Luneas a Viernes, justificadas:</td>
                            <td>+ ${faltasLVJustificado.toFixed(2)}</td>
                        </tr>
                        <tr class="resta">
                            <td scope="row">Faltas en Sabado:</td>
                            <td>- ${valorFaltasS.toFixed(2)}</td>
                        </tr>
                        <tr class="suma">
                            <td scope="row">Faltas en Sabado, justificadas:</td>
                            <td>+ ${faltasSJustificado.toFixed(2)}</td>
                        </tr>
                        <tr class="suma">
                            <td scope="row">Produccion (10%):</td>
                            <td>+ ${produccion.toFixed(2)}</td>
                        </tr>
                        <tr class="suma">
                            <td scope="row">Presentismo (${presentismo.toFixed(2)*100})%</td>
                            <td>+ ${presen.toFixed(2)}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Sueldo bruto:</td>
                            <td>${sueldoBruto.toFixed(2)}</td>
                        </tr>
                        <tr class="resta">
                            <td scope="row">Jubilacion: </td>
                            <td>- ${jubilacion.toFixed(2)}</td>
                        </tr>                
                        <tr class="resta">
                        <td scope="row">Obra social:</td>
                        <td>- ${obraSocial.toFixed(2)}</td>
                        </tr>
                        <tr class="resta">
                            <td scope="row">Ley 19032: </td>
                            <td>- ${ley19032.toFixed(2)}</td>
                        </tr>
			<tr class="resta">
                            <td scope="row">Total de deducciones: </td>
                            <td>- ${totalDeducciones.toFixed(2)}</td>
                        </tr>
                        <tr class="">
                            <td scope="row">Sueldo neto:</td>
                            <td>${sueldoNeto.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> `;
            console.log('No hay errores')

            form3.onsubmit = function(e){

                e.preventDefault();
            
                var aguiYVaca = document.getElementById('aguiYVaca').value
                
            
                if (aguiYVaca === 'aguinaldo'){
                    sueldoBruto = sueldoBruto + aguinaldo
                    jubilacion = sueldoBruto * 0.11

                    ley19032 = sueldoBruto * 0.03
                
                    obraSocial = sueldoBruto * 0.03
                    
                    
                    document.getElementById('MOSTRAR').innerHTML= `<div class="container d-flex align-items-center justify-content-center ">
                    <div class="card m-2" id="tablaaguinaldo"> 
                    <div class="card-body">
                      <h4 class="card-title text-center text-black"></h4>
                      <div class="table-responsive">
                        <table class="table table-striped table-light table-hover table-bordered border-black text-black" >
                            <thead>
                            <tr class="text-center ">
                              <th scope="col">Fuente</th>
                              <th scope="col">Datos/Paga</th>
                            </tr>
                            </thead>
                          <tbody>
                            <tr class="">
                              <td scope="row">Aguinaldo: </td>
                              <td>${aguinaldo.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div> </div>`    
                document.getElementById("carta").innerHTML=`<div class="recibo d-flex align-items-center justify-content-center ">
                        <div class="card m-2" id="recibo"> 
                            <div class="card-body">
                              <h4 class="card-title text-center text-black">Recibo</h4>
                              <div class="table-responsive">
                                <table class="table table-striped table-light table-hover table-bordered border-black text-black" id="tablita">
                                    <thead>
                                    <tr class="text-center ">
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
                                        <td>${sueldoBasico.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Horas extas (al 50% y 100%):</td>
                                        <td>+ ${(horaExtra100 + horaExtra50).toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Feriados de Lunes a Viernes:</td>
                                        <td>+ ${feriadosLV.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Feriados los Sabados:</td>
                                        <td>+ ${feriadosS.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Faltas de Lunes a Viernes:</td>
                                        <td>- ${valorFaltasLV.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Faltas de Luneas a Viernes, justificadas:</td>
                                        <td>+ ${faltasLVJustificado.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Faltas en Sabado:</td>
                                        <td>- ${valorFaltasS.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Faltas en Sabado, justificadas:</td>
                                        <td>+ ${faltasSJustificado.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Produccion (10%):</td>
                                        <td>+ ${produccion.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Presentismo (${presentismo.toFixed(2)*100})%</td>
                                        <td>+ ${presen.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Sueldo bruto:</td>
                                        <td>${(sueldoBruto+aguinaldo).toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Jubilacion: </td>
                                        <td>- ${jubilacion.toFixed(2)}</td>
                                    </tr>                
                                    <tr class="resta">
                                    <td scope="row">Obra social:</td>
                                    <td>- ${obraSocial.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Ley 19032: </td>
                                        <td>- ${ley19032.toFixed(2)}</td>
                                    </tr>
                        <tr class="resta">
                                        <td scope="row">Total de deducciones: </td>
                                        <td>- ${totalDeducciones.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Sueldo neto:</td>
                                        <td>${sueldoNeto.toFixed(2)}</td>
                                    </tr>                        
                                    <tr class="">
                                        <td scope="row">Aguinaldo:</td>
                                        <td>${aguinaldo.toFixed(2)}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div> `;
                }
                else if (aguiYVaca === 'vacaciones'){
                    document.getElementById('MOSTRAR').innerHTML= `<div class="container d-flex align-items-center justify-content-center ">
                    <div class="card m-2" id="tablaaguinaldo"> 
                    <div class="card-body">
                      <h4 class="card-title text-center text-black" ></h4>
                      <div class="table-responsive">
                        <table class="table table-striped table-light table-hover table-bordered border-black text-black">
                            <thead>
                            <tr class="text-center ">
                              <th scope="col">Fuente</th>
                              <th scope="col">Datos/Paga</th>
                            </tr>
                            </thead>
                          <tbody>
                            <tr class="">
                              <td scope="row">Vacaciones: </td>
                              <td>${vacaciones.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div> </div>`    
                document.getElementById("carta").innerHTML=`<div class="recibo d-flex align-items-center justify-content-center ">
                        <div class="card m-2" id="recibo"> 
                            <div class="card-body">
                              <h4 class="card-title text-center text-black">Recibo</h4>
                              <div class="table-responsive">
                                <table class="table table-striped table-light table-hover table-bordered border-black text-black" id="tablita">
                                    <thead>
                                    <tr class="text-center ">
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
                                        <td>${sueldoBasico.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Horas extas (al 50% y 100%):</td>
                                        <td>+ ${(horaExtra100 + horaExtra50).toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Feriados de Lunes a Viernes:</td>
                                        <td>+ ${feriadosLV.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Feriados los Sabados:</td>
                                        <td>+ ${feriadosS.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Faltas de Lunes a Viernes:</td>
                                        <td>- ${valorFaltasLV.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Faltas de Luneas a Viernes, justificadas:</td>
                                        <td>+ ${faltasLVJustificado.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Faltas en Sabado:</td>
                                        <td>- ${valorFaltasS.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Faltas en Sabado, justificadas:</td>
                                        <td>+ ${faltasSJustificado.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Produccion (10%):</td>
                                        <td>+ ${produccion.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Presentismo (${presentismo.toFixed(2)*100})%</td>
                                        <td>+ ${presen.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Sueldo bruto:</td>
                                        <td>${sueldoBruto.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Jubilacion: </td>
                                        <td>- ${jubilacion.toFixed(2)}</td>
                                    </tr>                
                                    <tr class="resta">
                                    <td scope="row">Obra social:</td>
                                    <td>- ${obraSocial.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Ley 19032: </td>
                                        <td>- ${ley19032.toFixed(2)}</td>
                                    </tr>
                        <tr class="resta">
                                        <td scope="row">Total de deducciones: </td>
                                        <td>- ${totalDeducciones.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Sueldo neto:</td>
                                        <td>${sueldoNeto.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Vacaciones:</td>
                                        <td>${vacaciones.toFixed(2)}</td>
                                    </tr>
                                
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div> `;
                }
                else if (aguiYVaca === 'ayv'){
                    sueldoBruto = sueldoBruto + aguinaldo
                    jubilacion = sueldoBruto * 0.11

                    ley19032 = sueldoBruto * 0.03
                
                    obraSocial = sueldoBruto * 0.03
                    
    
                    document.getElementById('MOSTRAR').innerHTML= `<div class="container d-flex align-items-center justify-content-center ">
                    <div class="card m-2" id="tablaaguinaldo"> 
                    <div class="card-body">
                      <h4 class="card-title text-center text-black"></h4>
                      <div class="table-responsive">
                        <table class="table table-striped table-light table-hover table-bordered border-black text-black">
                            <thead>
                            <tr class="text-center ">
                              <th scope="col">Fuente</th>
                              <th scope="col">Datos/Paga</th>
                            </tr>
                            </thead>
                          <tbody>
                            <tr class="">
                              <td scope="row">Aguinaldo: </td>
                              <td>${aguinaldo.toFixed(2)}</td>
                            </tr>
                            <tr class="">
                              <td scope="row">Vacaciones: </td>
                              <td>${vacaciones.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div> </div>`    
                document.getElementById("carta").innerHTML=`<div class="recibo d-flex align-items-center justify-content-center ">
                        <div class="card m-2" id="recibo"> 
                            <div class="card-body">
                              <h4 class="card-title text-center text-black">Recibo</h4>
                              <div class="table-responsive">
                                <table class="table table-striped table-light table-hover table-bordered border-black text-black" id="tablita">
                                    <thead>
                                    <tr class="text-center ">
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
                                        <td>${sueldoBasico.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Horas extas (al 50% y 100%):</td>
                                        <td>+ ${(horaExtra100 + horaExtra50).toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Feriados de Lunes a Viernes:</td>
                                        <td>+ ${feriadosLV.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Feriados los Sabados:</td>
                                        <td>+ ${feriadosS.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Faltas de Lunes a Viernes:</td>
                                        <td>- ${valorFaltasLV.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Faltas de Luneas a Viernes, justificadas:</td>
                                        <td>+ ${faltasLVJustificado.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Faltas en Sabado:</td>
                                        <td>- ${valorFaltasS.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Faltas en Sabado, justificadas:</td>
                                        <td>+ ${faltasSJustificado.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Produccion (10%):</td>
                                        <td>+ ${produccion.toFixed(2)}</td>
                                    </tr>
                                    <tr class="suma">
                                        <td scope="row">Presentismo (${presentismo.toFixed(2)*100})%</td>
                                        <td>+ ${presen.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Sueldo bruto:</td>
                                        <td>${sueldoBruto.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Jubilacion: </td>
                                        <td>- ${jubilacion.toFixed(2)}</td>
                                    </tr>                
                                    <tr class="resta">
                                    <td scope="row">Obra social:</td>
                                    <td>- ${obraSocial.toFixed(2)}</td>
                                    </tr>
                                    <tr class="resta">
                                        <td scope="row">Ley 19032: </td>
                                        <td>- ${ley19032.toFixed(2)}</td>
                                    </tr>
                        <tr class="resta">
                                        <td scope="row">Total de deducciones: </td>
                                        <td>- ${totalDeducciones.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Sueldo neto:</td>
                                        <td>${sueldoNeto.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Vacaciones:</td>
                                        <td>${vacaciones.toFixed(2)}</td>
                                    </tr>
                                    <tr class="">
                                        <td scope="row">Aguinaldo:</td>
                                        <td>${aguinaldo.toFixed(2)}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div> `;
                }
            
            
            }
            
}

	
form2.onsubmit = function(e){

    e.preventDefault();


    var nombreArchivo = document.getElementById('nombreArchivo').value
    var formato = document.getElementById('formato').value
    var orientacion = document.getElementById('orientacion').value
    
    var element = document.getElementById('carta'); 

    //easy
    //html2pdf().from(element).save();

    //custom file name
    //html2pdf().set({filename: 'code_with_mark_'+ js.AutoCode()+'.pdf'}).from(element).save();


    //more custom settings
    var opt = 
    {
        margin:       0,
        filename:     `${nombreArchivo}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: `${formato}`, orientation: `${orientacion}` }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
}




// </tr>
// 			<tr class="">
//                             <td scope="row">Vacaciones (tiene ${diasVacaciones} dias de vacaciones) :</td>
//                             <td>${vacaciones.toFixed(2)}</td>
//                         </tr>
//                         <tr class="">
//                             <td scope="row">Aguinaldo:</td>
//                             <td>${aguinaldo.toFixed(2)}</td>