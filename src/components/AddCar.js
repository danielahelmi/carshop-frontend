import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar(props) {
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
        setOpen(true);
        };
      
    const handleClose = () => {
        setOpen(false);
        };

    const inputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value})
    }

    const addCar = () => {
        props.saveCar(car);
        handleClose();
    }
      
    return (
          <div>
            <Button style={{margin: 15}} variant="contained" onClick={handleClickOpen}>
             Add car
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add new car</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Put your car up for sale!
                </DialogContentText>
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
                <Button onClick={addCar}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        );
}
