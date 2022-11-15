import { useEffect, useRef, useState } from "react";

const UserForm = ({ show = false, setShowForm, getListUser, infoUpdate = {} }) => {

    const firstName = useRef();
    const lastName = useRef('');
    const email = useRef('');
    const password = useRef('');
    const birthday = useRef('');
    
    const saveNewUser = async (info) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }
        const request =  await fetch('https://users-crud1.herokuapp.com/users/', options);
        const data = await request.json();

        if(data.id) {
            alert('Información almacenada correctamente.');
            setShowForm(false);
            getListUser();
            clearform();
        }
    }

    const updateUser = async (info, id) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }
        const request =  await fetch(`https://users-crud1.herokuapp.com/users/${id}/`, options);
        const data = await request.json();

        if(data.id) {
            alert('Información actualizada correctamente.');
            setShowForm(false);
            getListUser();
            clearform();
        }
    }

    const onSave = () => {
        const info = {
            first_name: firstName.current.value,
            last_name: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
            birthday: birthday.current.value
        }
        saveNewUser(info);
    }

    const onUpdate = () => {
        const info = {
            first_name: firstName.current.value,
            last_name: lastName.current.value,
            email: email.current.value,
            password: password.current.value,
            birthday: birthday.current.value
        }
        updateUser(info, infoUpdate.id);
    }

    const clearform = () => {
        firstName.current.value = '';
        lastName.current.value = '';
        email.current.value = '';
        password.current.value = '';
        birthday.current.value = '';
    }

   

    useEffect(() => {

        if(infoUpdate.id) {
            firstName.current.value = infoUpdate.first_name;
            lastName.current.value = infoUpdate.last_name;
            email.current.value = infoUpdate.email;
            password.current.value = infoUpdate.password;
            birthday.current.value = infoUpdate.birthday;
        } else {
            clearform()
        }

    }, [infoUpdate])

    return <div className={'container-form ' + (show ? '' : 'display-none')}>
        <div className="user-form">
            <div className="user-header">
                {
                    infoUpdate.id 
                    ? <h2>Editar Usuario</h2>
                    : <h2>Nuevo Usuario</h2>
                }
                <button onClick={() => {
                    setShowForm(false)
                }}>X</button>
            </div>
            <div className="form">

                <div className="input-group">
                    <label htmlFor="first_name">Nombre</label>
                    <input ref={firstName} type="text" id="first_name" name="first_name" />
                </div>

                <div className="input-group">
                    <label htmlFor="last_name">Apellido</label>
                    <input ref={lastName} type="text" id="last_name" name="last_name" />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Correo</label>
                    <input ref={email} type="email" id="email" name="email" />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input ref={password} type="password" id="password" name="password" />
                </div>

                <div className="input-group">
                    <label htmlFor="birthday">Cumpleaños</label>
                    <input ref={birthday} type="date" id="birthday" name="birthday" />
                </div>


                {
                    infoUpdate.id 
                    ? <button className="btn" onClick={onUpdate}>
                        Guardar cambios
                    </button>
                    : <button className="btn" onClick={onSave}>
                        Agregar nuevo usuario
                    </button>
                }
                
            </div>
        </div>
    </div>
}

export default UserForm;