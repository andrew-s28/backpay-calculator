/* eslint-disable react/prop-types */
import { useState, useImperativeHandle } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';


export default function NumericalEntry(
    { 
        id,
        name,
        label,
        onChildDataChange,
        ref,
        currencyAdornment = false,
        minValue = Number.MIN_SAFE_INTEGER,
        maxValue = Number.MAX_SAFE_INTEGER,
    }) {
    const [isFocused, setFocused] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [value, setValue] = useState("");
    const [helperText, setHelperText] = useState("");

    const startAdornment = (isFocused || value !== "")
    ? <InputAdornment position="start">$</InputAdornment>
    : null;

    const onChange = (e) => {
        e.preventDefault();
        var string = e.target.value;
        string = string.replace(/[^0-9.-]/g, "");
        setValue(string);
        if (validate(string)) {
            onChildDataChange(id, string);
        }
    }

    const validate = (data) => {
        if (data == "-" || data == "." || data == "-." || data === "") {
            setInvalid(false);
            setHelperText("");
            return true;
        }
        if (!(/^-?\d*\.?\d*$/).test(data)) {
            setInvalid(true);
            setHelperText("Value must be a number");
            return false;
        }
        data = parseFloat(data);
        if (isNaN(data)) {
            setInvalid(true);
            setHelperText("Value must be a number");
            return false;
        } 
        if (data < minValue || data > maxValue) {
            setInvalid(true);
            setHelperText(`Value must be between ${minValue} and ${maxValue}`);
            return false;
        } 
        setInvalid(false);
        setHelperText("");
        return true;
    }

    useImperativeHandle(ref, () => ({
        validate: () => validate(value),
    }));

    return (
        <TextField
            fullWidth
            value={ value }
            id={ id }
            name={ name }
            label={ label }
            aria-label={ label}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={ onChange }
            error={ isInvalid || helperText !== "" }
            helperText={ isInvalid && helperText }
            slotProps={{
                input: {
                    startAdornment: currencyAdornment ? startAdornment : null,
                },  
            }}
        >
        </TextField>
    );
}