
import { QueryFormat } from "rdf-js";

var barquery =  `
    PREFIX sdo: <https://schema.org/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?koper (count(?adres) as ?totaalAantalAdressen) WHERE {
  ?person sdo:buyer ?koper .
  ?person sdo:address ?adres .
} 
GROUP BY(?koper)
ORDER BY DESC(?totaalAantalAdressen)
LIMIT 5`;

var geoquery = `
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>
PREFIX sdo: <https://schema.org/>
prefix bif: <http://www.openlinksw.com/schemas/bif#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX bag: <http://bag.basisregistraties.overheid.nl/def/bag#>

SELECT ?point (strdt(concat('<h4><a href="',str(?adres),'" target="_blank">', str(?adresNaam), '</a></h4><ul><li>',concat('Naam slachtoffer: ',?naam, '</li>'),' ','</ul>'),rdf:HTML) as ?pointLabel) WHERE {

?sub sdo:name ?naam .
?sub sdo:addresslink ?adres .
?sub sdo:address ?adresNaam .
?sub sdo:geo ?point .
  FILTER (?adresNaam != "Adres niet bekend")
}`;

var geosource = "https://api.data.pldn.nl/datasets/GeoDataWizard/stolpersteinenijmegen/services/stolpersteinenijmegen/sparql";

//Datanames and datatypes required
//For now for testing only charttype name
export default function buildQuery(chartType) : String{
    if(chartType == "BarChart"){
        return barquery;
    }
    if(chartType == "GeoChart"){
        return geoquery;
    }

    return barquery;
}