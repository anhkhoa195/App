import React from 'react';
import { router } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

function User() {
    const pathName = window.location.pathname.split('/');
    const id = pathName[2];
    // useEffect(() => {
    //     getDataProductId(id);
    // }, []);

    // const [dataRes, setDataRes] = useState([]);

    // const getDataProductId = async () => {
    //     const resData = await fetch(
    //         "http://localhost:3000/products/:id"
    //     );
    //     const items = await resData.json();
    //     console.table(items.data.map(item => {
    //         return item;
    //     }));
    //     setDataRes(items.data);
    // }
    return (
        <div className='wrapAll'>
            <h2>Update User</h2>
            <form name="form">
                <div>
                    <label>ID</label>
                    <TextField
                        required
                        id="outlined-required"
                        defaultValue={id}
                        variant="outlined"
                    />
                </div>
            </form>
        </div>
    );
}

export default User;