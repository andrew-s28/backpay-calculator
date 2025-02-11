import { useState } from 'react';
import './Entry.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid2 } from '@mui/material';

import Intro from './Intro';

export default function Entry() {
    const [isSpringFocused, setSpringFocused] = useState(false);
    const [isFallFocused, setFallFocused] = useState(false);
    const [springValue, setSpringValue] = useState("");
    const [fallValue, setFallValue] = useState("");
    const [springFTE, setSpringFTE] = useState("0.40");
    const [fallFTE, setFallFTE] = useState("0.40");
    const [yearValue, setYearValue] = useState("");
    const [backpayText, setBackpayText] = useState(
        "Please enter your spring 2024 monthly pay, your current monthly pay, and your year in your program to calculate your estimated backpay."
    );

    const springAdornment = (isSpringFocused || springValue !== "")
        ? <InputAdornment position="start">$</InputAdornment>
        : null;

    const fallAdornment = (isFallFocused || fallValue !== "")
        ? <InputAdornment position="start">$</InputAdornment>
        : null;
    const onSpringChange = (e) => {
        e.preventDefault();
        var string = e.target.value;
        if (string === "") {
            setSpringValue("");
            return;
        }
        string = string.replace(/[^0-9]+/g, '');
        setSpringValue(string);
    }
    const onFallChange = (e) => {
        e.preventDefault();
        var string = e.target.value;
        if (string === "") {
            setFallValue("");
            return;
        }
        string = string.replace(/[^0-9]+/g, '');
        setFallValue(string);
    }

    const onYearChange = (e) => {
        e.preventDefault();
        var string = e.target.value;
        if (string === "") {
            setYearValue("");
            return;
        }
        string = string.replace(/[^0-9]+/g, '');
        setYearValue(string);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const springPay = formData.get('springPay');
        const fallPay = formData.get('fallPay');
        const yearInProgram = formData.get('yearInProgram');
        const springPayInt = parseInt(springPay);
        const fallPayInt = parseInt(fallPay);
        const yearInProgramInt = parseInt(yearInProgram);
        const springFTEFloat = parseFloat(springFTE);
        const fallFTEFloat = parseFloat(fallFTE);
        const newBaseSalary = 4977.0;
        var receivedRaise = 0;
        var newSalary = 0;
        var backpay = 0;
        console.log(springFTEFloat);
        console.log(fallFTEFloat);
        if (isNaN(springPayInt) || isNaN(fallPayInt) || isNaN(yearInProgramInt)) {
            setBackpayText(
                "Please enter your spring 2024 monthly pay, your current monthly pay, and your year in your program to calculate your estimated backpay."
            );
            return;
        };
        newSalary = newBaseSalary * fallFTEFloat;
        if (newSalary < fallPayInt) {
            receivedRaise = (fallPayInt * springFTE / fallFTE - springPayInt) / springPayInt;
            if (receivedRaise < 0) {
                receivedRaise = 0;
            };
            if (receivedRaise >= 0.03) {
                setBackpayText(
                    `You can expect roughly $0 in backpay, covering 6 months from September to February. Since it appears you already received a raise equal to or greater than 3%, you are not eligible for backpay.`
                );
                return;
            };
            const raise = 0.03 - receivedRaise;
            backpay = Math.round(raise * fallPayInt * 6);
            if (isNaN(backpay) || backpay < 0) {
                setBackpayText(
                    "Please enter your Spring 2024 monthly pay, your current monthly pay, and your year in your program to calculate your estimated backpay."
                );
                return;
            };
            if (yearInProgramInt < 2) {
                setBackpayText(
                    `You can expect roughly $0 in backpay, covering 6 months from September to February. Unfortunately, only graduate employees returning to the same employing unit are eligible for the 3% raise this year.`
                );
                return;
            } else {
                setBackpayText(
                    `You can expect roughly $${backpay} in backpay, covering 6 months from September to February. OSU has until March 10th to provide this backpay.`
                );
                return;
            };         
        } else {
            if (yearInProgramInt < 2) {
                backpay = Math.round(newSalary * 6 - fallPayInt * 6)
            } else {
                backpay = Math.round(newSalary * 6 * 1.03 - fallPayInt * 6)
            };
            setBackpayText(
                `You can expect roughly $${backpay} in backpay, covering 6 months from September to February. OSU has until March 10th to provide this backpay.`
            );
            return;
        }
    };

    return (
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} minWidth={{ xs: null, md: 800}} sx={{ justifyContent: 'center'}}>
            <Grid2 size={12}>
                <Intro />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6}}>
            <Box
                component="form"
                display="flex"
                flexDirection={"column"}
                justifyContent={"space-between"}
                sx={{ '& .MuiTextField-root': { m: 0} }}
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <Grid2 container spacing={{xs: 1}} sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
                    <Grid2 size={{xs: 12, sm: 7}} sx={{ pb: { xs: 0, sm: 2}, }}>
                        <TextField
                            fullWidth
                            value={springValue}
                            id="springPay"
                            name="springPay"
                            label="Spring 2024 Monthly Pay"
                            onFocus={() => setSpringFocused(true)}
                            onBlur={() => setSpringFocused(false)}
                            onChange={onSpringChange}
                            slotProps={{
                                input: {
                                    startAdornment: springAdornment,
                                },  
                            }}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{xs: 12, sm: 5}} sx={{ display: 'flex', alignItems: 'left', pb: { xs: 2, sm: 2},}}>
                        <FormControl sx={{ margin: {xs: 0, sm:'auto'}, paddingLeft: {xs: 2, sm: 0}}}>
                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ textAlign: 'left !important' }}>Spring 2024 FTE</FormLabel>
                        <RadioGroup
                            row
                            label="Spring 2024 FTE"
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={springFTE}
                            onChange={(e) => setSpringFTE(e.target.value)}
                        >
                            <FormControlLabel value="0.40" control={<Radio />} label="0.40" sx={{ m: '0'}} />
                            <FormControlLabel value="0.49" control={<Radio />} label="0.49" sx={{ m: '0'}} />
                        </RadioGroup>
                        </FormControl>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={{xs: 1}} sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
                    <Grid2 size={{xs: 12, sm: 7}} sx={{ pb: { xs: 0, sm: 2}, }}>
                        <TextField
                            fullWidth
                            value={fallValue}
                            id="fallPay"
                            name="fallPay"
                            label="Current Monthly Pay"
                            onFocus={() => setFallFocused(true)}
                            onBlur={() => setFallFocused(false)}
                            onChange={onFallChange}
                            slotProps={{
                                input: {
                                    startAdornment: fallAdornment,
                                }
                            }}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{xs: 12, sm: 5}} sx={{ display: 'flex', alignItems: 'left', pb: { xs: 2, sm: 2},}} >
                        <FormControl sx={{ margin: {xs: 0, sm:'auto'}, paddingLeft: {xs: 2, sm: 0}}}>
                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ textAlign: 'left !important' }}>Current FTE</FormLabel>
                        <RadioGroup
                            row
                            label="Fall 2024 FTE"
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={fallFTE}
                            onChange={(e) => setFallFTE(e.target.value)}
                        >
                            <FormControlLabel value="0.40" control={<Radio />} label="0.40" sx={{ m: '0'}} />
                            <FormControlLabel value="0.49" control={<Radio />} label="0.49" sx={{ m: '0'}} />
                        </RadioGroup>
                        </FormControl>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={{xs: 1}} sx={{ justifyContent: 'space-between', alignItems: 'center', pb: 2, }}>
                    <Grid2 size={{xs: 12}}>
                        <TextField
                            fullWidth
                            value={yearValue}
                            id="yearInProgram"
                            name="yearInProgram"
                            label="Year in Program"
                            onChange={onYearChange}
                        >
                        </TextField>
                    </Grid2>
                </Grid2>
                <Button type="submit" fullWidth size="large">Submit</Button>
        </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6}}>
        <Paper elevation={3} sx={{ p: 2, height: '100%'}}>
        <h2>Estimated Backpay:</h2>
            <p className="backpayText">{backpayText}</p>
            <p className="disclaimer">
                This is a rough estimate of backpay and your actual backpay received is likely to be <i>slightly</i> different based on how exactly OSU calculates pay for different months.
                However, if your backpay received is significantly different, please <a href="https://www.cge6069.org/leadership/2019-2020/" target="_blank">contact your union steward</a>. 
            </p>
        </Paper>
        </Grid2>
      </Grid2>
    );
}
  