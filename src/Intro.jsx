import Paper from '@mui/material/Paper';

import './css/Intro.scss';

export default function Intro() {
    return (
        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
            <p className="introTop">
                This calculator is used to calculate the expected backpay owed to Graduate Employees 
                following the ratification of the new <a href="https://www.cge6069.org/wp-content/uploads/2024/12/CGE_2024-2027_Successor_Agreement-Changes-Noted.pdf" target="_blank">Collective Bargaining Agreement</a>.
            </p>
            <p className="introBottom">
                Enter your monthly gross pay and FTE from the spring 2024 semester,
                your current monthly gross pay and FTE, and the year you are in your program.
                The calculator will output the esimated gross pay you are owed by the <b>March 10th deadline</b>.
            </p>
        </Paper>
    )
}