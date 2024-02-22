/*
    two even columns, 
        1st is a picturemap
        2nd is a table
            name
            address
            start       end
            estimator   foreman
            price       ppl/hrs
            parking     access
            equipment
                dyn*
            vehicles
                dyn*
    
    8 rows
        picturemap  species dbh crown   work
        ...
*/

export default function makeEstimate(job, property, trees) {
    function treeRows(trees) {
        function makeRow(tree) {
            return {
                columns: [
                    {
                        width: 150,
                        text: tree.species,
                    },
                    {
                        width: 40,
                        text: tree.dbh,
                    },
                    {
                        width: 100,
                        text: tree.crown,
                    },
                ],
                columnGap: 10,
            }
        }

        let outlist = [
            {   
                columns: [
                    {
                        width: 150,
                        text: 'Species',
                    },
                    {
                        width: 40,
                        text: 'DBH',
                    },
                    {
                        width: 100,
                        text: 'Crown',
                    },
                ],
                columnGap: 10,
                margin: [0,20,0,5],
            }
        ];
        trees.forEach((tree) => {
            outlist.push(makeRow(tree));
        });

        return outlist;
    }

    function getEntries(list) {
        let these = list;
        console.log('these');
        console.log(these);

        let bodyout = [];
        if(these.length == 0) {
            bodyout.push(['none','listed']);
        }
        while(these.length > 2) {
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
        console.log(bodyout);
        return output;
    }

    let docDefinition = {
        content: [
            {   
                columns: [
                    {
                        layout: 'lightHorizontalLines',
                        table: {
                            widths:['auto','auto','auto'],
                            body: [
                                [{text:'Client: '},{text:property.contact_name, colSpan: 2},{}],
                                [{text:'Address: '},{text:property.address, colSpan: 2, style:'bolded'},{}],
                                [{text:'Start: '},{text:job.start, colSpan: 2},{}],
                                [{text:'Finish: '},{text:job.end, colSpan: 2},{}],
                                [{text:'Estimator: '},{text:job.estimator, colSpan: 2},{}],
                                [{text:'Foreman: '},{text:job.foreman, colSpan: 2},{}],
                                [{text:'Price: '},{text:"$"+job.price, colSpan: 2},{}],
                            ],
                        },
                    },
                    {
                        layout: 'lightHorizontalLines',
                        table: {
                            widths:[150],
                            body: [
                                [{text:'Vehicles', style:'header'}],
                                [getEntries(job.vehicles)],
                                [{text:'Equipment', style:'header'}],
                                [getEntries(job.equipment)],
                            ],
                        },
                    },
                ],
            },
            treeRows(trees),
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                alignment: 'center',
            },
            bolded: {
                bold: true,
            },
        }
    };
    

    console.log(docDefinition);
    return docDefinition;
}