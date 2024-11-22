/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createUsersRequest, deleteUsersRequest, getOneUsersRequest, getUsersRequest, updateUsersRequest } from '../api';

const UsersContext = createContext();

export const useUser = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsers debe estar en el contexto');
    }
    return context;
};

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const createUsers = async (user) => {
        try {
            const existingUser = users.find(u => u.email === user.email);
            if (existingUser) {
                throw new Error('User with this email already exists.');
            }
            await createUsersRequest(user);
            getUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error creating user:", error);
            throw error; // Re-throw the error to be caught in the component
        }
    };

    const updateUsers = async (id, user) => {
        try {
            await updateUsersRequest(id, user);
            getUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const deleteUsers = async (id) => {
        try {
            const res = await deleteUsersRequest(id);
            if (res.status === 204) setUsers(users.filter((user) => user._id !== id));
            getUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const getOneUsers = async (id) => {
        try {
            const res = await getOneUsersRequest(id);
            return res.data;
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return (
        <UsersContext.Provider value={{
            users,
            createUsers,
            getUsers,
            deleteUsers,
            updateUsers,
            getOneUsers
        }}>
            {children}
        </UsersContext.Provider>
    );
}
