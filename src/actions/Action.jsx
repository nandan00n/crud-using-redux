import * as types from './ActionType'
import axios from 'axios'

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
})

const userDeleted = () => ({
    type: types.DELETE_USER,
});

const userAdded = () => ({
    type: types.ADD_USER,

});

const userUpdated = () => ({
    type: types.UPDATE_USER,

});

const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user,
});


export const loadUsers = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then((resp) => {
            // console.log(resp);
            dispatch(getUsers(resp.data));
        })
            .catch((error) => console.log(error));
    }
};

export const deleteUser = (id) => {

    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            console.log(resp);
            dispatch(userDeleted());
            dispatch(loadUsers());
        })
            .catch((error) => console.log(error));
    }
};

export const addUser = (user) => {

    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`,user).then((resp) => {
            console.log(resp);
            dispatch(userAdded());
            dispatch(loadUsers());

        })
            .catch((error) => console.log(error));
    }
};

export const getSingleUser = (id1) => {

    return function (dispatch) {
        console.log(id1)
        axios.get(`${process.env.REACT_APP_API}`).then((resp) => {
            // console.log(resp.data);
            const data = resp.data;
            const oneData = data.filter((ele) => {
                return ele.id === id1.id;
            })
            dispatch(getUser(oneData));
            // console.log(oneData)
            dispatch(loadUsers());
        })
            .catch((error) => console.log(error));
    }
};

export const updateUser = (user, id) => {
    console.log(user, id)
    return function (dispatch) {
        axios
        .put(`${process.env.REACT_APP_API}/${id}`, user).then((resp) => {
            console.log(resp)
            dispatch(userUpdated())
        })
            .catch((error) => console.log(error))
        };
};







// export const Updateuser = (user, id) => {
        
//     return function (dispatch) {
//         axios.put(`${process.env.REACT_APP_API}/${id}`, user).then((resp) => {
//             console.log(resp);
//             dispatch(userUpdated());
//             dispatch(loadUsers());

//         })
//             .catch((error) => console.log(error));
//     }
// };

// last one

// export const Updateuser = (user, id1) => {
//     console.log(user, id1)
//     return function (dispatch) {
//         axios.put(`${process.env.REACT_APP_API}/${id1}`, user).then((resp) => {
//             console.log(resp)
//             const data1= resp.data;
//             dispatch(userUpdated(data1))
//         })
//             .catch((error) => console.log(error))
//         };
// };