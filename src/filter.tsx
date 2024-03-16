import React, { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { carsSelector } from './slices/cars';
import { IModel } from './main';
import { FilterView } from './filterview';

export const FilterContext = createContext([])

export function Filters () {
    let [filtered, setFiltered] = React.useState([])
    let [choosen, setChoosen] = React.useState({field: "", value: ""})

    const { cars } = useSelector(carsSelector)
    let uniqueObj: any = {location: {}, owners: {}, transmission: {}, color: {}};
    cars.forEach((car: IModel) => {
        uniqueObj.location[car.location] = uniqueObj.location[car.location] ? uniqueObj.location[car.location] + 1 : 0;       
        uniqueObj.owners[car.owners] = uniqueObj.owners[car.owners] ? uniqueObj.owners[car.owners] + 1 : 0;       
        uniqueObj.transmission[car.transmission] = uniqueObj.transmission[car.transmission] ? uniqueObj.transmission[car.transmission] + 1 : 0;       
        uniqueObj.color[car.color] = uniqueObj.color[car.color] ? uniqueObj.color[car.color] + 1 : 0;      
    });

    useEffect(() => {
        onFilter(choosen.field, choosen.value);
    }, [choosen])

    const onFilter = (field: string, value: string) => {
        setFiltered(cars.filter((car: any) => car[field] === value))
    }

    return <div style={{display: "flex"}}>
        <div style={{width: "30%"}}>
            <div>Filters</div>
            <div style={{paddingTop: "50px"}}>
                <div style={{padding: "10px"}}>
                    <label style={{padding: "10px"}}>Location</label>
                    <select onChange={(event) => setChoosen({field: "location", value: event.target.value})} value={choosen.value}>
                    <option >Select</option>
                        {Object.keys(uniqueObj.location).map(val => <option value={val}>{val}</option>)}
                    </select>
                </div>
                <div style={{padding: "10px"}}>
                    <label style={{padding: "10px"}}>Color</label>
                    <select onChange={(event) => setChoosen({field: "color", value: event.target.value})} value={choosen.value}>
                    <option>Select</option>
                        {Object.keys(uniqueObj.color).map(val => <option value={val}>{val}</option>)}
                    </select>
                </div>
            </div>
        </div>
        <FilterContext.Provider value={filtered}>
            <FilterView/>
        </FilterContext.Provider>
    </div>;
}