
class SPARQLBuilder {
    buildQuery(values: any) : String{
        console.log("this", this);

        values = values.filter(function (e) {
            return e; 
        });
        let query = "";

        let prefixes = [];
        let selectObjects = [];
        let whereObjects = [];
  
        for(let i = 0; i < values.length; i++){
            //Check if it has a # inside
            if (values[i].includes("#")){
                const split = values[i].split("#");
                const prefixIndex = prefixes.indexOf(split[0] + "#");
                if (prefixIndex !== -1) {
                    //prefix exists already
                    const existingValue = prefixes[prefixIndex] || [];
                    whereObjects.push(`pre${prefixIndex}:${split[1]} ?${split[1]};
                        `);
                    selectObjects.push(`?${split[1]} `);
                } else{
                    prefixes.push(split[0] + "#");
                    whereObjects.push(`pre${prefixes.length-1}:${split[1]} ?${split[1]};
                        `);
                    selectObjects.push(`?${split[1]} `);
                }
            } else {
                const title = values[i].split("/").pop();
                selectObjects.push(`?${title} `);
                whereObjects.push(`<${values[i]}> ?${title};
                    `);
            }
        }

        for (const [i, pr] of prefixes.entries()) {
            query += `PREFIX pre${i}: <${pr}>
            `;
        }
  
        query += "SELECT ";

        for (const so of selectObjects){
            query += so;
        }

        query += `
        WHERE {
            ?o `;

        for(const wo of whereObjects){
           query += wo;
        }

        query +=`
        }
        `;
        if(selectObjects.length > 1){
            query += `ORDER BY ASC(?${selectObjects[1].split("?")[1]})`;
        }
        query += `
        limit 5`;

        console.log("Query that was made: ", query);

        return query;
    }
}

export default SPARQLBuilder;