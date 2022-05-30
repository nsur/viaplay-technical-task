import React, {useState} from 'react';
import Input from './Input';

const initialState = {
    title: '',
    image: '',
    comment: '',
};

const NewMovieForm = ({onSubmit}) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = ({target}) => {
        const {name, value} = target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData(initialState);
    };

    return (
        <div className="tools">
            <form className="form" onSubmit={handleSubmit}>
                <Input
                    formData={formData}
                    name="image"
                    label="IMAGE URL:"
                    onChange={handleChange}
                />
                <Input
                    formData={formData}
                    name="title"
                    label="TITLE:"
                    onChange={handleChange}
                />
                <Input
                    formData={formData}
                    name="comment"
                    label="COMMENT:"
                    onChange={handleChange}
                />

                <input type="submit" value="ADD MOVIE"/>
            </form>
        </div>
    );
};

export default NewMovieForm;