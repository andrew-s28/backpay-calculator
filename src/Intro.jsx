import './Intro.css';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Intro() {
    return (
        <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
            <p className="introTop">
                This calculator is used to calculate the expected backpay owed to Graduate Employees 
                following the ratification of the new <a href="https://www.cge6069.org/wp-content/uploads/2024/12/CGE_2024-2027_Successor_Agreement-Changes-Noted.pdf" target="_blank">Collective Bargaining Agreement</a>.
            </p>
            <p className="introBottom">
                Enter your monthly gross pay and FTE from the Spring 2024 semester,
                your current monthly gross pay and FTE, and the year you are in your program.
                If you have an FTE other than 0.40 or 0.49, please scale both salary numbers to an equivalent 0.49 FTE monthly salary before entry.
                The calculator will output the esimated gross pay you are owed by the March 10th deadline.
            </p>
        </Paper>
    )
}