
import * as React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { carsSelector, updateCars } from "./slices/cars";
import { useHistory } from "react-router-dom";

export interface IModel {
    model: string;
    color: string;
    year: string;
    insurence: string;
    kms: string;
    location: string;
    owners: string;
    transmission: string;
    fitments: string;
    photo: string;
}

const Fields = [
    {
        name: "Model",
        value: "model",
        type: "text"
    },
    {
        name: "Location",
        value: "location",
        type: "text"
    },
    {
        name: "Color",
        value: "color",
        type: "text"
    },
    {
        name: "Number of Owners",
        value: "owners",
        type: "text"
    },
    {
        name: "Manufacture Year",
        value: "year",
        type: "text"
    },
    {
        name: "Transmission",
        value: "transmission",
        type: "text"
    },
    {
        name: "Insurence Valid Upto",
        value: "insurence",
        type: "text"
    },
    {
        name: "External Fitments",
        value: "fitments",
        type: "text"
    },
    {
        name: "KMS",
        value: "kms",
        type: "text"
    },
    {
        name: "Photo",
        value: "photo",
        type: "button"
    },
];

const Models = [
    {name: 'Maruti Suzuki'},
    {name: 'Hyundai'},
    {name: 'Renault'},
    {name: 'Honda'},
    {name: 'Tata'},
    {name: 'Ford'},
    {name: 'Volkswagon'},
    {name: 'Mahendra'},
    {name: 'Toyota'},
    {name: 'BMW'},
    {name: 'Benz'},
]

export default function MainPage() {
    let [formValues, setFormValues] = React.useState({} as any)
    let [choosedModel, setChoosedModel] = React.useState({} as any)
    let [showForm, setShowForm] = React.useState(false)
    const navigate = useHistory();

    const dispatch = useDispatch()
    const { cars, loading, hasErrors } = useSelector(carsSelector)

    const chooseModel = (model: any) => {
        setChoosedModel(model);
        setFormValues({model: model.name})
        setShowForm(true);
    }

    const onChange = (field: string, value: string) => {
        setFormValues({...formValues, [field]: value})
    }

    const onSubmit = () => {
        dispatch(updateCars(formValues))
        setFormValues({
            model: "",
            color: "",
            year: "",
            insurence: "",
            kms: "",
            location: "",
            owners: "",
            transmission: "",
            fitments: "",
        })
        setShowForm(false)
    }

    const chooseFilter = () => {
        navigate.push("/filter")
    }

    console.log(formValues)
    return <div>
        <div style={{display: "flex"}}>
            <div className="menu">Logo</div>
            <div className="menu">Home</div>
            <div className="menu">Services</div>
            <div className="menu">Gallery</div>
            <div className="menu">Contact Us</div>
        </div>
        <div style={{display: "flex", width: "100%", flexWrap: "wrap"}}>
            {Models.map((field) => <div key={field.name} style={{padding: "20px", margin: "10px"}}>
                <button type={"button"} onClick={() => chooseModel(field)} style={{padding: "20px"}}>{field.name}</button>
            </div>)}
        </div>
        {showForm && <div style={{display: "flex", width: "100%", flexWrap: "wrap"}}>
            {Fields.map((field) => {
                return <div key={field.name} style={{width: "50%", padding: "20px", boxSizing: "border-box"}}>{field.type === "text" ? <div key={field.name}>
                    <input type={field.type} value={formValues[field.value]} placeholder={field.name} onChange={(event) => onChange(field.value, event?.target.value)}/>
                </div>: <button type="submit" style={{width: "50%"}}><i className="fa fa-search"></i></button>}</div>
            })}
        </div>}
        <div style={{padding: "10px"}}>
            <button type="submit" style={{padding: "10px"}} onClick={onSubmit}>Submit</button>
        </div>
        <div style={{padding: "10px"}}>
            <a href="#" style={{padding: "10px"}} onClick={chooseFilter}>Go to Filter Page</a>
        </div>
        {cars.length > 0 && <div>{JSON.stringify(cars)}</div>}
    </div>;
}