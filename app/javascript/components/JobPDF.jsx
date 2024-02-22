import React, {useState, useEffect} from "react";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import makeEstimate from "../utility/pdfgen";


export default function JobPDF() {
    const [pdfurl, setPdfUrl] = useState('');

    function createPDF(docdef) {
        const pdfGenerator = pdfMake.createPdf(docdef);
        pdfGenerator.getDataUrl((dataUrl) => {
            setPdfUrl(dataUrl);
        });
        console.log('created');
    }

    /*
    const docDefinition = {
        content: [
            {text: 'No doc provided', style: 'header'},
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
            },
        },
    }; 
    */


    
    
        

    useEffect(()=> {
        let jid = document.getElementById('jid').innerText;
        fetch(`/data/jobtrees?jid=` + jid)
            .then((response) => response.json())
            .then((data) => {
                const docDefinition = makeEstimate(data.job,data.property,data.trees);
                createPDF(docDefinition);
            });
    },[])
    
    return(
        <div className="">
            <iframe src={pdfurl} title="Work Estimate" className="w-full min-h-screen"></iframe>
        </div>
    )
}