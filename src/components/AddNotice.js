import React from 'react';
import { useForm } from "react-hook-form";
import "../scss/addNotice.scss";

const AddNotice = ({ createAnimal, showAdd }) => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleClick = (data) => {
        const newAnimal = {
            nameUser: localStorage.getItem("savedName"),
            type: data.type,
            race: data.race,
            age: data.age,
            phone: data.phone,
            city: data.city
        }
        createAnimal(newAnimal);
        showAdd();
    }

    return (<div className='addNotice'>
        <form onSubmit={handleSubmit(handleClick)}>
            <input type="text" {...register("type", { required: true, minLength: 3 })} placeholder='Gatunek' />
            {errors.type?.type === 'required' && <p style={{ color: "red" }}>Type is required</p>}
            {errors.type?.type === 'minLength' && <p style={{ color: "red" }}>minLength = 3</p>}
            <input type="text" {...register("race", { required: true, minLength: 3 })} placeholder='Rasa' />
            {errors.race?.type === 'required' && <p style={{ color: "red" }}>Type is required</p>}
            {errors.race?.type === 'minLength' && <p style={{ color: "red" }}>minLength = 3</p>}
            <input type="text" {...register("age", { required: true })} placeholder='wiek' />
            {errors.age?.type === 'required' && <p style={{ color: "red" }}>Type is required</p>}
            <input type="text" {...register("phone", { required: true })} placeholder='Telefon' />
            {errors.phone?.type === 'required' && <p style={{ color: "red" }}>Type is required</p>}
            <input type="text" {...register("city", { required: true, minLength: 3 })} placeholder='Miejscowość' />
            {errors.city?.type === 'required' && <p style={{ color: "red" }}>Type is required</p>}
            {errors.city?.type === 'minLength' && <p style={{ color: "red" }}>minLength = 3</p>}
            <button type="submit">Zapisz</button>
        </form>
    </div >);
}

export default AddNotice;