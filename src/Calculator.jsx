import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid2 } from '@mui/material';
import Paper from '@mui/material/Paper';

import Intro from './Intro';
import Entry from './Entry';

import './css/Calculator.scss';

export default function Calculator() {
    const [formData, setFormData] = useState({});
    const [backpayText, setBackpayText] = useState(
        "Please enter your Spring 2024 monthly pay, your Fall 2024 monthly pay, and your year in your program to calculate your estimated backpay."
    );

    const handleChildData = (childId, data) => {
        setFormData({
            ...formData,
            [childId]: data
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const { springPay, springFTE, fallPay, fallFTE, year } = formData;
        const springPayInt = parseInt(springPay);
        const fallPayInt = parseInt(fallPay);
        const yearInt = parseInt(year);
        const springFTEFloat = parseFloat(springFTE);
        const fallFTEFloat = parseFloat(fallFTE);
        const newBaseSalary = 4977.0;
        var receivedRaise = 0;
        var newSalary = 0;
        var backpay = 0;
        if (isNaN(springPayInt) || isNaN(fallPayInt) || isNaN(yearInt)) {
            setBackpayText(
                "Please enter your Spring 2024 monthly pay, your Fall 2024 monthly pay, and your year in your program to calculate your estimated backpay."
            );
            return;
        };
        newSalary = newBaseSalary * fallFTEFloat;
        if (newSalary < fallPayInt) {
            receivedRaise = (fallPayInt * springFTEFloat / fallFTEFloat - springPayInt) / springPayInt;
            if (receivedRaise < 0) {
                receivedRaise = 0;
            };
            if (receivedRaise >= 0.03) {
                setBackpayText(
                    `You can expect roughly $0 in backpay, covering 5 months from September to February. Since it appears you already received a raise equal to or greater than 3%, you are not eligible for backpay.`
                );
                return;
            };
            const raise = 0.03 - receivedRaise;
            backpay = Math.round(raise * fallPayInt * 5);
            if (isNaN(backpay) || backpay < 0) {
                setBackpayText(
                    "Please enter your Spring 2024 monthly pay, your Fall 2024 monthly pay, and your year in your program to calculate your estimated backpay."
                );
                return;
            };
            if (yearInt < 2) {
                setBackpayText(
                    `You can expect roughly $0 in backpay, covering 5 months from September to February. Unfortunately, only graduate employees returning to the same employing unit are eligible for the 3% raise this year.`
                );
                return;
            } else {
                setBackpayText(
                    `You can expect roughly $${backpay} in backpay, covering 5 months from September to February. OSU has until April 10th to provide this backpay.`
                );
                return;
            };         
        } else {
            if (yearInt < 2) {
                backpay = Math.round(newSalary * 5 - fallPayInt * 5)
            } else {
                backpay = Math.round(newSalary * 5 * 1.03 - fallPayInt * 5)
            };
            setBackpayText(
                `You can expect roughly $${backpay} in backpay, covering 5 months from September to February. OSU has until April 10th to provide this backpay.`
            );
            return;
        }
    };

    return (
        <Grid2 container spacing={{ xs: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} minWidth={{ xs: null, md: 800}} sx={{ justifyContent: 'center'}}>
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
                aria-label="Calculator Entry Form"
            >
                <Grid2 container columnSpacing={1} rowSpacing={0} sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
                    <Grid2 size={{xs: 12, sm: 7}} sx={{ pb: 2}}>
                        <Entry id="springPay" name="springPay" label="Spring 2024 Monthly Pay" onChildDataChange={handleChildData} currencyAdornment={true} minValue={0} maxValue={10000} />
                    </Grid2>
                    <Grid2 size={{xs: 12, sm: 5}} sx={{ display: 'flex', alignItems: 'left', pb: 2}}>
                        <Entry id="springFTE" name="springFTE" label="Spring 2024 FTE" onChildDataChange={handleChildData} minValue={0} maxValue={0.49} />
                    </Grid2>
                </Grid2>
                <Grid2 container columnSpacing={1} rowSpacing={0} sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
                    <Grid2 size={{xs: 12, sm: 7}} sx={{ pb: 2}}>
                        <Entry id="fallPay" name="fallPay" label="Fall 2024 Monthly Pay" onChildDataChange={handleChildData} currencyAdornment={true} minValue={0} maxValue={10000} />
                    </Grid2>
                    <Grid2 size={{xs: 12, sm: 5}} sx={{ display: 'flex', alignItems: 'left', pb: 2}}>
                        <Entry id="fallFTE" name="fallFTE" label="Fall 2024 FTE" onChildDataChange={handleChildData} minValue={0} maxValue={0.49} />
                    </Grid2>
                </Grid2>
                <Grid2 container columnSpacing={1} rowSpacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                    <Grid2 size={{xs: 12}}>
                        <Entry id="year" name="year" label="Year in Program" onChildDataChange={handleChildData} minValue={0} maxValue={10} />
                    </Grid2>
                </Grid2>
                <Button type="submit" fullWidth size="large" focusVisibleClassName="submit">Submit</Button>
        </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6}}>
        <Paper elevation={3} sx={{ p: 2, height: '100%'}}>
        <h2>Estimated Backpay:</h2>
            <p className="backpayText">{backpayText}</p>
            <p className="disclaimer">
                This is a rough estimate of backpay and your actual backpay received is likely to be <i>slightly</i> different based on how exactly OSU calculates pay for different months.
                However, if your backpay received is significantly different, please <a href="https://www.cge6069.org/leadership/2019-2020/" target="_blank">contact your union steward</a> or
                send a message to <a href="mailto:solidarity@cge6069.org" target="_blank">solidarity@cge6069.org</a>. 
            </p>
        </Paper>
        </Grid2>
      </Grid2>
    );
}
  


