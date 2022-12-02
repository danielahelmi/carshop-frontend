import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: '',
    });
      
    const handleClickOpen = () => {
        setCar({
          brand: props.car.brand, 
          model: props.car.model,
          color: props.car.color,
          fuel: props.car.fuel,
          year: props.car.year,
          price: props.car.price,})
        setOpen(true);
        };
      
    const handleClose = () => {
        setOpen(false);
        };

    const inputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value})
    }

    const updateCar = () => {
        props.editCar(car, props.car._links.car.href);
        handleClose();
    }
      
    return (
          <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>
             Edit car
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit car</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="brand"
                  value={car.brand}
                  label="Brand"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  name="model"
                  value={car.model}
                  label="Model"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  name="color"
                  value={car.color}
                  label="Color"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  name="fuel"
                  value={car.fuel}
                  label="Fuel"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  name="year"
                  value={car.year}
                  label="Year"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  name="price"
                  value={car.price}
                  label="Price"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={updateCar}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        );
}
