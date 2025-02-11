import { useState } from 'react';
import './Entry.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid2 } from '@mui/material';


export default function Entry() {
    const [isSpringFocused, setSpringFocused] = useState(false);
    const [isFallFocused, setFallFocused] = useState(false);
    const [springValue, setSpringValue] = useState("");
    const [fallValue, setFallValue] = useState("");
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
        if (isNaN(springPayInt) || isNaN(fallPayInt) || isNaN(yearInProgramInt)) {
            setBackpayText(
                "Please enter your Spring 2024 monthly pay, your current monthly pay, and your year in your program to calculate your estimated backpay."
            )
        }
        var receivedRaise = (fallPayInt - springPayInt) / springPayInt;
        if (receivedRaise < 0) {
            receivedRaise = 0;
        }
        if (receivedRaise >= 0.03) {
            setBackpayText(
                `You can expect roughly $0 in backpay, covering 6 months from September to February. Since it appears you already received a raise equal to or greater than 3%, you are not eligible for backpay.`
            );
            return;
        }
        console.log(receivedRaise);
        const raise = 0.03 - receivedRaise;
        var backpay = Math.round(raise * fallPayInt * 6);
        if (isNaN(backpay) || backpay < 0) {
            setBackpayText(
                "Please enter your Spring 2024 monthly pay, your current monthly pay, and your year in your program to calculate your estimated backpay."
            )
            return;
        }
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
        }                
    }

    return (
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} minWidth={{ xs: null, md: 900}} justifyContent="space-evenly">
            <Grid2 size={{ xs: 12, md: 6}}>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1} }}
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <div className="entry">
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
                </div>
                <div className="entry">
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
                </div>
                <div className="entry">
                    <TextField
                        fullWidth
                        value={yearValue}
                        id="yearInProgram"
                        name="yearInProgram"
                        label="Year in Program"
                        onChange={onYearChange}
                    >
                    </TextField>
                </div>
                <div className="entry">
                    <Button type="submit" fullWidth size="large">Submit</Button>
                </div>
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
  