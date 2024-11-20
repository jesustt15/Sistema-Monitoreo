/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState} from "react";
import { createUsersRequest, deleteUsersRequest, getOneUsersRequest, getUsersRequest, updateUsersRequest } from '../api'


const UsersContext = createContext();

export const useUser = () =>{
    

    const context = useContext(UsersContext);

    if (!context){
        throw new Error('useUsers debe estar en el contexto')
    }
     return context;

} 


export function UsersProvider ({children}) {
    const [users, setUsers] = useState([]);

    const createUsers = async(user) => {

        try {

         await createUsersRequest(user);
         getUsers();
            
        } catch (error) {
            console.error(error)
        }

    }
    const getUsers = async() =>{

        try {
            const res = await getUsersRequest();
            setUsers(res.data);   
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const updateUsers = async(id, user) =>{
        try {
            await updateUsersRequest(id, user);
            getUsers();
          } catch (error) {
            console.error(error);
          }
    }

    const deleteUsers = async(id) => {

        try {
            const res = await deleteUsersRequest(id);
            if (res.status === 204) setUsers(users.filter((user) => user._id !== id));
            getUsers();
            
          } catch (error) {
            console.log(error);
          }
    }

    const getOneUsers = async(id) =>{

        try {

            const res = await getOneUsersRequest(id);
            return res.data;
            
        } catch (error) {
            console.log(error);
            
        }

    }



    return (
        <UsersContext.Provider value={{ users , 
        createUsers,
        getUsers,
        deleteUsers,
        updateUsers,
        getOneUsers
        }}>
            {children}
        </UsersContext.Provider>
    )
}
