import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from "react";
import './App.css'
import {Button} from "@mui/material";

export default function ValidationTextFields() {
    const [date, setDate] = useState('');
    const [error, setError] = useState(false);
    const [options, setOptions] = useState({variant: 'contained', color: 'primary'});
    const [entering, setEntering] = useState(true)
    const [info, setInfo] = useState({age: 0, month: 0, days: 0, hours: 0 , minutes: 0, seconds: 0})

    const calculateAge = (date) => {
        const birthdayObj = new Date(date);
        const today = new Date();

        let age = today.getFullYear() - birthdayObj.getFullYear();
        let month = today.getMonth() - birthdayObj.getMonth();
        let day = today.getDate() - birthdayObj.getDate();
        if (month < 0 || (month === 0 && today.getDate() < birthdayObj.getDate())) {
            age--;
        }
        let hours = new Date().getHours();
        let minutes = Math.floor(Math.random() * 61);
        let seconds = Math.floor(Math.random() * 61);
        setInfo({age: age, month: month, days: day, hours: hours, minutes: minutes, seconds: seconds})
        console.log(age, month, day);
    }
    const isValidDate = (inputDate) => {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
        return dateRegex.test(inputDate);
    };

    const showTime = () => {
        if (!error && date) {
            console.log(date);
            setEntering(false);
            calculateAge(date.split('.').reverse().join('-'));
            setInterval(() => {
                setInfo(prevInfo =>{
                    let newSeconds = prevInfo.seconds + 1;
                    let newMinutes = prevInfo.minutes;
                    let newHours = prevInfo.hours;
                    let newDays = prevInfo.days;
                    let newMonths = prevInfo.month;
                    let newYears = prevInfo.age;
                    if (newSeconds === 60){
                        newSeconds = 0;
                        newMinutes++;
                    }
                    if (newMinutes === 60){
                        newMinutes = 0;
                        newHours++;
                    }
                    if (newHours === 24){
                        newHours = 0;
                        newDays++;
                    }
                   /* if ()*/ /*Todo*/

                    return { ...prevInfo,days: newDays ,hours: newHours ,minutes: newMinutes, seconds: newSeconds };
                })

            },1000)
        }
    }

    useEffect(() => {
        if (error) {
            setOptions({variant: 'outlined', color: 'error'})
        } else {
            setOptions({variant: 'contained', color: 'primary'})
        }
    }, [date])

    const handleDateChange = (event) => {
        const inputValue = event.target.value;
        setDate(inputValue);
        setError(!isValidDate(inputValue));
    };

    return (
        <div className="App">
            {entering &&
                <div className="form">
                    <div style={{width: '50%'}}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {m: 1, width: '25ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                error={error}
                                id="date"
                                label="Date of birthday"
                                value={date}
                                onChange={handleDateChange}
                                helperText={error ? "Invalid date format (dd.mm.yyyy)" : ""}
                            />
                        </Box>
                        <Button
                            onClick={showTime}
                            style={{marginTop: '15px'}}
                            variant={options.variant}
                            color={options.color}
                        >
                            okay
                        </Button>
                    </div>
                </div>
            }
            {!entering &&
                <div className='timer'>
                    <div className="num">
                        <div><b>{info.age}</b> years</div>
                        <div><b>{info.month}</b> months</div>
                        <div><b>{info.days}</b> days</div>
                        <div><b>{info.hours}</b> hours</div>
                        <div><b>{info.minutes}</b> minutes</div>
                        <div><b>{info.seconds}</b> seconds</div>
                    </div>
                </div>
            }
        </div>
    );
}
