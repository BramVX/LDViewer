import * as React from 'react';
import DDashboard from './DynamicDashboard.tsx';
import CDemo from '../ContentDemo.tsx';
import { useEffect, useState } from 'react';
import Welcome from './Guide.tsx';
import ContentContainer from '../components/ContentContainer.tsx';
import DashboardToolbar from '../components/DashboardToolbar.tsx';

function PageContent({ pathname }: Readonly<{ pathname: string }>) {
    const storedCards = JSON.parse(localStorage.getItem("cards"));
    const [cards, setCards] = useState(storedCards);
    const dataset = localStorage.getItem("dataset");
    console.log(dataset);

    const getDataFromUrl = () => { 
        const queryParameters = new URLSearchParams(window.location.search);
        let data = queryParameters.get("data");

        if(data){
            data = window.atob(data);
            localStorage.setItem("cards", data);
            location.reload();
        }
    };

    useEffect(() => {
        getDataFromUrl();
    }, []);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
    }, [cards])

    //let content;
    switch(pathname) {
        case "/guide":
            return(<Welcome dataset={dataset}/>);
            break;
        case "/dashboard":
            return(<DDashboard dataset={dataset} cards={cards} setCards={setCards}/>);
            break;
        case "/contentdemo":
            return(<CDemo/>);
            break;
        case "/ldwizard":
            window.location.href = window.location.href.split("/")[0] + "/1";
            break;
        default:
            break;
    };
}

export default PageContent;