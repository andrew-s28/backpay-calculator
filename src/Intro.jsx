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
                Enter your monthly gross pay and FTE from the Spring 2024 term,
                your monthly gross pay and FTE from the Fall 2024 term, and the year you are in your program.
                The calculator will estimate the gross pay you are owed assuming five months of backpay from September to February.
                You are owed this backpay by the <b>April 10th deadline</b>, which you should see reflected on your March paycheck.
                
            </p>
            <p>
            Do note that this does not consider lost hours due to strike time, so your actual backpay may be less.
            </p>
        </Paper>
    )
}