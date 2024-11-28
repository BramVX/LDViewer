import * as React from 'react';
import Demo from './Demo.tsx';
import DDashboard from './DynamicDashboard.tsx';
import CDemo from './ContentDemo.tsx';
import { useEffect, useState } from 'react';

export default function PageContent({ pathname }: { pathname: string }) {
    const storedCards = JSON.parse(localStorage.getItem("cards"));
    const [cards, setCards] = useState(storedCards);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
        console.log("localstorage updated!");
        console.log(JSON.parse(localStorage.getItem("cards")))
    }, [cards])

    switch(pathname) {
        case "/demo":
            return(<Demo />);
        case "/dashboard":
            return(<DDashboard cards={cards} setCards={setCards}/>);
        case "/contentdemo":
            return(<CDemo/>)
        default:
            break;
    };
}
