import { useState, useEffect, useRef } from "react";
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {
const [cars, setCars] = useState([]);
const gridRef = useRef();
const [open, setOpen] = React.useState(false);

useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err=>console.error(err))
}

const deleteCar = (link) => {
    if(window.confirm('Are you sure you want to delete this car?')){
        fetch(link, { method: 'DELETE' })
            .then(response => fetchData())
            .catch(err => console.error(err));
     setOpen(true);}
}

const editCar = (car, link) => {
    fetch(link, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' }, 
        body: JSON.stringify(car) })
        .then(data => fetchData())
        .catch(err => console.error(err));
}

const saveCar = (car) => {
    fetch('https://carstockrest.herokuapp.com/cars', { 
        method: 'POST', 
        headers: { 'Content-type': 'application/json' }, 
        body: JSON.stringify(car) })
        .then(response => response.json())
        .then(data => fetchData())
        .catch(err => console.error(err))
}

const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

const columns = [
    {headerName: 'Brand', field: 'brand', sortable: true, filter: true},
    {headerName: 'Model', field: 'model', sortable: true, filter: true},
    {headerName: 'Color', field: 'color', sortable: true, filter: true},
    {headerName: 'Fuel', field: 'fuel', sortable: true, filter: true},
    {headerName: 'Year', field: 'year', sortable: true, filter: true},
    {headerName: 'Price', field: 'price', sortable: true, filter: true},
    {field: 'edit', cellRenderer: function (params) {
        return (
            <div>
                <EditCar car={params.data} editCar={editCar}/>
            </div>
        );}, width: 100
    },
    {field: 'delete', cellRenderer: function (params) {
            return (
                <div>
                    <Button onClick={() => deleteCar(params.data._links.self.href)} color="error" size="small">Delete car</Button>
                    </div>
            );}, width: 150
    }
]

const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
      </Button>
    </React.Fragment>
  );

    return (
        <div>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Car deleted"
            action={action} /> 

            <div className="ag-theme-material" style={{ height: 600, margin: '20 auto' }}>
            <AddCar saveCar={saveCar}/>
                <AgGridReact
                    rowData={cars}
                    animateRows={true}
                    onGridReady={params => gridRef.current = params.api}
                    ref={gridRef}
                    rowSelection="single"
                    columnDefs={columns}>
                </AgGridReact>
            </div>
        </div>
    );
}