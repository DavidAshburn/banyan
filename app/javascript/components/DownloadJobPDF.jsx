import React, {useState, useEffect} from "react";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import makeEstimate from "../utility/pdfgen";


export default function JobPDF() {
    const [pdfurl, setPdfUrl] = useState('');

    function createPDF(docdef) {
        pdfMake.createPdf(docdef).download();
    }        

    useEffect(()=> {
        let jid = document.getElementById('jid').innerText;
        let token = document.getElementById('mapboxpub').innerText;
        fetch(`/data/jobtrees?jid=` + jid)
            .then((response) => response.json())
            .then((data) => {
                const docDefinition = makeEstimate(data.job,data.property,data.trees, token, data.work);
                createPDF(docDefinition);
            });
    },[])
    
    return(
        <div>
        </div>
    )
}