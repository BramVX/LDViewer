import * as React from 'react';
import DDashboard from './DynamicDashboard.tsx';
import CDemo from '../ContentDemo.tsx';
import { useEffect, useState } from 'react';
import Welcome from './Guide.tsx';

function PageContent({ pathname }: Readonly<{ pathname: string }>) {
    const storedCards = JSON.parse(localStorage.getItem("cards"));
    const [cards, setCards] = storedCards ? useState(storedCards) : useState([]);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
    }, [cards])

    //let content;
    switch(pathname) {
        case "/guide":
            return(<Welcome/>);
            break;
        case "/dashboard":
            return(<DDashboard cards={cards} setCards={setCards}/>);
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