import React, { useContext } from 'react';
import { FilterContext } from './filter';

export function FilterView() {
    const filtered = useContext(FilterContext);
    
    return <div style={{backgroundColor: "whitesmoke"}}> 
        {filtered.map((filterCar: any) => <div style={{padding: "50px", margin: "20px", backgroundColor: "white"}}>{filterCar.model}</div>)}
    </div>
}