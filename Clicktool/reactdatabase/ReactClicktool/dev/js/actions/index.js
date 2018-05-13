export const addUser = (user) => {
    return {
        type: 'USER_ADD',
        payload: user
    }
};

export const deleteUser = (userIndex) => {
    return {
        type: 'USER_DELETE',
        payload: userIndex
    }
};

