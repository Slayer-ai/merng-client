import { useState } from "react";

export const useForm = (callBack, initialState) => {
    const [values, setValues] = useState(initialState);
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        callBack();
    };

    return {
        handleChange,
        handleSubmit,
        values,
    };
};
