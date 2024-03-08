import mapboxgl from "mapbox-gl";

export default function makeInvoice(job, property, trees, token, work) {
    function treeRows(trees, work, pageindex) {
        function makeRow(tree, workdescrip, index) {
            return [
                    {
                        text: `${index})`,
                        style: 'header',
                        fillColor:'#e7e5e4',
                    },
                    {
                        text: tree.species,
                    },
                    {
                        text: tree.dbh,
                    },
                    {
                        text: tree.crown,
                    },
                    {
                        text: workdescrip,
                    },
            ]
        }

        let outlist = 
            {   
                table:{
                    widths: [40,150,40,100,100],
                    heights: 30,
                    body: [
                        [
                            {
                                text: '',
                            },
                            {
                                text: 'Species',
                            },
                            {
                                text: 'DBH',
                            },
                            {
                                text: 'Crown',
                            },
                            {
                                text: 'Work',
                            },
                        ],
                    ]
                },
                layout:'lightHorizontalLines',
                margin: [5,20],
                pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {return true;}
                
            };
        trees.forEach((tree, i) => {
            outlist.table.body.push(makeRow(tree, work[tree.id], (i+1)+parseInt(pageindex)*9));
        });

        return outlist;
    }
    function getEntries(list) {
        let these = list;
        let bodyout = [];
        if(these.length == 0) {
            bodyout.push(['none listed',{}]);
        }
        while(these.length >= 2) {
            let a = these.shift();
            let b = these.shift();
            bodyout.push([a,b]);
        }
        if(these.length > 0) {
            bodyout.push([these.shift(),{}]);
        }

        let output = {
            layout: 'lightHorizontalLines',
            table: {
                widths:[75,75],
                body: bodyout,
            }
        };
        return output;
    }
    function formatDate(date) {
        let fulldate = date.split('T')[0].split('-');
        let fulltime = date.split('T')[1].split('.000');
        let time = fulltime[0].split(':');

        const options = {weekday:'long',year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'numeric'};

        let thisdate = new Date(fulldate[0],fulldate[1],fulldate[2],time[0],time[1]);
        return thisdate.toLocaleDateString('en-US',options);
    }
    function infoPane(property,job) {
        return {
            columns: [
                {   
                    width: 250,
                    layout: 'lightHorizontalLines',
                    table: {
                        widths:['auto','auto','auto'],
                        body: [
                            [{text:'Client: '},{text:property.contact_name, colSpan: 2},{}],
                            [{text:'Address: '},{text:property.address, colSpan: 2, style:'bolded'},{}],
                            [{text:'Start: '},{text:formatDate(job.start), colSpan: 2},{}],
                            [{text:'Finish: '},{text:formatDate(job.end), colSpan: 2},{}],
                            [{text:'Estimator: '},{text:job.estimator, colSpan: 2},{}],
                            [{text:'Foreman: '},{text:job.foreman, colSpan: 2},{}],
                            [{text:'Price: '},{text:"$"+job.price, colSpan: 2},{}],
                        ],
                    },
                },
                {
                    width: 230,
                    layout: 'lightHorizontalLines',
                    table: {
                        widths:[230],
                        body: [
                            [{text:'Vehicles', style:'header'}],
                            [getEntries(job.vehicles)],
                            [{text:'Equipment', style:'header'}],
                            [getEntries(job.equipment)],
                        ],
                    },
                },
            ],
            columnGap: 20,
        }
    }

    let docDefinition = {
        content: [
            infoPane(property,job),
            {text:job.notes},
        ],
        styles: {
            header: {
                bold: true,
                alignment: 'center',
            },
            bolded: {
                bold: true,
            },
        },
    };
    
    const rowsonpage = 20;

    let pagecount = Math.ceil(trees.length / rowsonpage);
    let thesetrees = [];
    for(let i = 0; i < pagecount; i++) {
        if(i<pagecount-1) {
            thesetrees = trees.slice(i*rowsonpage,i*rowsonpage+rowsonpage);
        } else {
            thesetrees = trees.slice(i*rowsonpage);
        }

        docDefinition.content.push(treeRows(thesetrees, work, i));
    }

    return docDefinition;
}