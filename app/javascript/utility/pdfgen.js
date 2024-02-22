import mapboxgl from "mapbox-gl";

export default function makeEstimate(job, property, trees, token) {
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

        let bodyout = [];
        if(these.length == 0) {
            bodyout.push(['none listed',{}]);
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
        return output;
    }
    function getURI(trees) {
        let output = {
            'type':'FeatureCollection',
            'features': [],
        }
        let index = 1;
        for(let tree of trees) {
            output.features.push({
                'geometry':{
                    'type':'Point',
                    'coordinates': [
                        tree.longitude,
                        tree.latitude,
                    ]
                },
                'type':'Feature',
                'properties':{
                    'marker-size':'small',
                    'marker-label':index,
                },
            });
            index++;
        }
        let uri = encodeURI(JSON.stringify(output));
        return uri;
    }
    function formatDate(date) {
        let fulldate = date.split('T')[0].split('-');
        let fulltime = date.split('T')[1].split('.000');
        let time = fulltime[0].split(':');

        const options = {weekday:'long',year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'numeric'};

        let thisdate = new Date(fulldate[0],fulldate[1],fulldate[2],time[0],time[1]);
        return thisdate.toLocaleDateString('en-US',options);
    }

    let docDefinition = {
        content: [
            {   
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
            },
            {
                image: 'property',
                margin: [5,20],
            },
            treeRows(trees),
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
        images: {
            property: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/geojson(${getURI(trees)})/auto/500x400?access_token=${token}`,
        }
    };
    
    formatDate(job.start);
    return docDefinition;
}