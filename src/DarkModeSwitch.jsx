/* eslint-disable react/prop-types */
import Sun from './assets/Sun.jsx';
import Moon from './assets/Moon.jsx';

import './css/DarkModeSwitch.scss';

export default function DarkModeSwitch ({
    mode = 'dark',
    onChange,
}) {
    const color = mode === 'dark' ? '#ffffff' : '#24292f';
    return (
        <div id="dark-mode-switch" data-checked={mode === 'light'} data-transition-disabled={false}>
            <button
                onClick={() => {
                    onChange?.(mode === 'light' ? 'dark' : 'light');
                }}
                aria-label="Light/Dark Mode Toggle"
            >
                { mode === "light" ? <Sun color={color} width={"30px"} height={"30px"} /> : <Moon color={color} width={"30px"} height={"30px"} /> }
            </button>
        </div>
    );
}