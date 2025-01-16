import SPARQLBuilder from './SPARQLBuilder';
import chartStrategies from '../ChartTypes/ChartStrategies';
import DataService from './DataService';
import pako from 'pako';

class DashboardService  {
    private cards: any;
    private setCards: Function;
    private dataService: any;
    public dataset: String;

    constructor(cards, setCards, dataService = new DataService()) {
        this.cards = cards;
        this.setCards = setCards;
        this.dataService = dataService;
    }

    setDataset(dataset){
        this.dataset = dataset;
    }

    getDataset(){
        return this.dataset;
    }
    
    async addChart({title, chartOptions, chartStrategy, source}){
        const chartType = chartStrategy.getChartType();
        const query = chartStrategy.buildQuery(chartOptions);
        const queryresult = await this.dataService.fetchChartData( query, source,  chartStrategy);
        const subject1 = chartOptions[0][0].split("/").pop();
        const subject2 = chartOptions[1]?.[0]?.split("/").pop() || null;
        const subject3 = chartOptions[2]?.[0]?.split("/").pop() || null;
        const subject4 = chartOptions[3]?.[0]?.split("/").pop() || null;

        const id = this.cards ? JSON.parse(localStorage.getItem("cards")).length : 0;

        console.log(chartType, queryresult, subject1, subject2, subject3, subject4, query, id, source);
  
        const newCard = { title, chartType, queryresult, subject1, subject2, subject3, subject4, query, id, source};

        console.log(...this.cards);
  
        const updatedCards = [...this.cards, newCard];
        this.cards = updatedCards;
        this.setCards(updatedCards);

        console.log("cards", this.cards);
        console.log("updatedCards", updatedCards);
    }

    async editChart({title, chartOptions, chartStrategy, source, id}){
        const chartType = chartStrategy.getChartType();
        const query = chartStrategy.buildQuery(chartOptions);
        console.log("query", query);
        const queryresult = await this.dataService.fetchChartData( query, source,  chartStrategy);
        const subject1 = chartOptions[0][0].split("/").pop();
        const subject2 = chartOptions[1]?.[0]?.split("/").pop() || null;
        const subject3 = chartOptions[2]?.[0]?.split("/").pop() || null;
        const subject4 = chartOptions[3]?.[0]?.split("/").pop() || null;
        const editedCard = { title, chartType, queryresult, subject1, subject2, subject3, subject4, query, id, source};
  
        if(~id){
          const updatedCards = [...this.cards];
          updatedCards[id] = editedCard;
          this.setCards(updatedCards);
        }
    }

    async editChartWithQuery({newQuery, id}){
        const updatedCards = [...this.cards];
        const chartStrategy = chartStrategies[updatedCards[id].chartType];
        const queryresult = await this.dataService.fetchChartData( newQuery, updatedCards[id].source,  chartStrategy);
        updatedCards[id].query = newQuery;
        updatedCards[id].queryresult = queryresult;
        this.setCards(updatedCards);
    }

    deleteChart({id}){
        if(id!=null){
          const updatedCards = [...this.cards];
          for (let i = id; i < updatedCards.length - 1; i++){
            updatedCards[i + 1].id = i;
            updatedCards[i] = updatedCards[i + 1];
          }
          updatedCards.pop();
          this.setCards(updatedCards);
        }
    }

    importDashboard(file){
        const reader = new FileReader();
        reader.onload = function(e){
            const content = e.target.result;
            if (typeof content === 'string') {
                localStorage.setItem("cards", content);
                location.reload();
            }
        }
        reader.readAsText(file[0]);
    }

    exportDashboardAsFile() {
        try {
            const file = new Blob([localStorage.getItem('cards')], {type: 'application/json'});
            const blobUrl = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'cards.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return true;
        } catch(error){
            return false;
        }
    }
}

export default DashboardService;