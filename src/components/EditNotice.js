import React from 'react';
import { useForm } from "react-hook-form";

const EditNotice = ({ elEdit, updateAnimal, showEdit }) => {
    console.log(elEdit);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleClick = (data) => {
        const editAnimal = {
            nameUser: localStorage.getItem("savedName"),
            type: data.type,
            race: data.race,
            age: data.age,
            phone: data.phone,
            city: data.city,
            description: data.description,
            urlImage: elEdit.urlImage,
            namePhoto: elEdit.namePhoto,
            id: elEdit.id
        }
        updateAnimal(editAnimal);
        // showEdit();
    }
    return (<div className='addNotice'>
        <form onSubmit={handleSubmit(handleClick)}>
            <h2>Edytuj ogłoszenie</h2>
            <input type="text" {...register("type", { required: true, minLength: 3 })} placeholder='Gatunek' defaultValue={elEdit.Type} />
            {errors.type?.type === 'required' && <p style={{ color: "red" }}>Gatunek jest wymagany</p>}
            {errors.type?.type === 'minLength' && <p style={{ color: "red" }}>Minimalna długość to 3 znaki</p>}
            <input type="text" {...register("race", { required: true, minLength: 3 })} placeholder='Rasa' defaultValue={elEdit.Race} />
            {errors.race?.type === 'required' && <p style={{ color: "red" }}>Rasa jest wymagana</p>}
            {errors.race?.type === 'minLength' && <p style={{ color: "red" }}>Minimalna długość to 3 znaki</p>}
            <input type="text" {...register("age", { required: true })} placeholder='Wiek' defaultValue={elEdit.Age} />
            {errors.age?.type === 'required' && <p style={{ color: "red" }}>Wiek jest wymagany</p>}
            <input type="text" {...register("phone", { required: true })} placeholder='Telefon' defaultValue={elEdit.Phone} />
            {errors.phone?.type === 'required' && <p style={{ color: "red" }}>Telefon jest wymagany</p>}
            <input type="text" {...register("city", { required: true, minLength: 3 })} placeholder='Miejscowość' defaultValue={elEdit.City} />
            {errors.city?.type === 'required' && <p style={{ color: "red" }}>Miejscowość jest wymagana</p>}
            {errors.city?.type === 'minLength' && <p style={{ color: "red" }}>Minimalna długość to 3 znaki</p>}
            <textarea className='textarea' {...register("description")} cols="30" rows="10" placeholder='Opis...' defaultValue={elEdit.description}></textarea>
            <button type="submit">Zapisz</button>
        </form>
    </div >);
}

export default EditNotice;