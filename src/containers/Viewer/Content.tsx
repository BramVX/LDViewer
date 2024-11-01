import * as React from 'react';
import Demo from './Demo.tsx';
import DDashboard from './DynamicDashboard.tsx';

export default function PageContent({ pathname }: { pathname: string }) {
    switch(pathname) {
        case "/demo":
            return(<Demo />);
        case "/dashboard":
            return(<DDashboard />);
        default:
            break;
    };
}
