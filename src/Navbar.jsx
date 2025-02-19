/* eslint-disable react/prop-types */
import DarkModeSwitch from './DarkModeSwitch';
import GitHub from './assets/GitHubMark';
import Paper from '@mui/material/Paper';

import './css/Navbar.scss';

export default function Navbar({ mode, onChange, height }) {
    const color = mode == "dark" ? "#ffffff" : "#24292f"
    console.log(color)
    return (
            <Paper className="navbarContainer" elevation={3} sx={{ p: 2, height: height}}>
                <nav className="navbar">
                <ul className="left">
                </ul>
                <ul className="right">
                    <li>
                        <GitHub color={color} githubLink={"https://github.com/andrew-s28/backpay-calculator"} height={"30px"} width={"30px"} />
                    </li>
                    <li>
                        <DarkModeSwitch mode={mode} onChange={onChange} />
                    </li>
                </ul>
            </nav> 
        </Paper>
    );
}