import * as React from 'react';
import DDashboard from './DynamicDashboard.tsx';
import CDemo from '../ContentDemo.tsx';
import { useEffect, useState } from 'react';

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

    switch(pathname) {
        case "/dashboard":
            return(<DDashboard dataset={dataset} cards={cards} setCards={setCards}/>);
        case "/contentdemo":
            return(<CDemo/>)
        case "/ldwizard":
            window.location.href = window.location.href.split("/")[0] + "/1";
        default:
            break;
    };
}

export default PageContent;