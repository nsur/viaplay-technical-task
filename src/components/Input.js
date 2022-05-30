import React from 'react';

const Input = ({formData, name, label, onChange}) => (
    <label className="input">
        <b>{label} </b>
        <input type="text" value={formData[name]} name={name} onChange={onChange}/>
    </label>
);

export default Input;