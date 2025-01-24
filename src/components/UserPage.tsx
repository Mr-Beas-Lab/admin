import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-config'; // Adjust the import path for your Firebase setup
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import UserList from './UserList'; // Adjust the import path if necessary

interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    balance: number;
}

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch users from Firestore
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'users')); // 'users' is the Firestore collection name
            const userList: User[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as User[];
            setUsers(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete user from Firestore
    const deleteUser = async (userId: string) => {
        try {
            await deleteDoc(doc(db, 'users', userId)); // Deletes user from Firestore
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Update state
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (users.length === 0) {
        return <p>No users available.</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <p className="mb-4">
                There are <b>{users.length}</b> users.
            </p>
            <UserList users={users} onDeleteUser={deleteUser} />
        </div>
    );
};

export default UserPage;
