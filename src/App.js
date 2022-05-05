import React, { useState } from 'react';
import { jsPDF } from "jspdf";

import './App.css';

const App = () => {

  let [ hiddeForm, setHideForm ] = useState( false );
  
  const handleSubmit = ( event ) => {
    
    event.preventDefault();

    document.querySelector("button[type=submit]").textContent = "Cargando...";
    
    const data = new URLSearchParams( new FormData( event.currentTarget ) );

    fetch( 'http://localhost:4000/pdf/', {
      // body: formData,
      body: data,
      method: "post"
    } )
      .then( res => {
        if( res.ok ) return res.text(); //format response to String
      } )
      .then((resParsed) => {
        // console.log(resParsed);
        setHideForm( true );
        document.querySelector(".response-container div").innerHTML = resParsed;
      })
      .catch( (error) => {
        console.log(error);
      } );

  } //end-handleSubmit

  const printResponse = () => {

    let doc = new jsPDF( { 
      orientation: 'landscape',
      unit: 'pt',
      format: 'A4',
      putOnlyUsedFonts:true 
    } );

    // doc.mar

    doc.html( document.querySelector(".response-container div"), {
      callback: function (doc) {
        // doc.output( "pdfobjectnewwindow", { filename: "prueba" } );
        doc.save();
      }
    });

  } //end-printResponse

  return (
    <div className="App-header">

      <div className="form-container" style={{ display: hiddeForm ? "none": "block" }} >

        <form id="form" onSubmit={ handleSubmit } >

          <div className={ "is-flex-dir-column" } >

            <label htmlFor="fecha"> Fecha de firma </label>
            <input id="fecha" type="text" name="fecha" required />
            
            <label htmlFor="operacion"> Operación </label>
            <input id="operacion" type="text" name="operacion" required />
            
            <label htmlFor="escritura"> Escritura </label>
            <input id="escritura" type="text" name="escritura" required />

            <label htmlFor="libro"> Escritura </label>
            <input id="libro" type="text" name="libro" required />

            <label htmlFor="notas"> Notas </label>
            <input id="notas" type="text" name="notas" required />

            <label htmlFor="revision"> Revisión </label>
            <input id="revision" type="text" name="revision" required />

            <label htmlFor="elaboro"> Elaboró </label>
            <input id="elaboro" type="text" name="elaboro" required />

            <label htmlFor="rpp"> RPP </label>
            <input id="rpp" type="text" name="rpp" required />

            <label htmlFor="nombre"> Nombre </label>
            <input id="nombre" type="text" name="nombre" required />

            <button type="submit" htmlFor="form" > Generar PDF </button>

          </div>

        </form>

      </div>

      <div className="response-container is-flex-dir-column" style={{ display: hiddeForm ? "flex": "none" }} >

        <div>

        </div>

        <button onClick={ printResponse } > Imprimir </button>

      </div>

    </div>

  );  //return

} //end-App 

export default App;
