import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const [editingData, setEditingData] = useState<
        { name: string; username: string; email: string }>({ name: "", username: "", email: "" }
        );
    const [newUser, setNewUser] = useState(
        { name: "", username: "", email: "" }
    );

    const startEdit = (user: User) => {
        setEditingId(user.id);
        setEditingData({ name: user.name, username: user.username, email: user.email });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditingData(user => ({ ...user, [name]: value }));
    };

    const saveEdit = (id: number) => {
        handleEdit(id, editingData);
        setEditingId(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser(user => ({ ...user, [name]: value }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    };

    const notify = () => toast.warning("Please fill in all fields! ⚠️", { position: "top-center" });

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                console.log('Request completed');
            });
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().startsWith(searchName.toLowerCase())
    );

    const handleDelete = (id: number) => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            })
            .finally(() => { console.log('Delete request completed') });
    };

    const handleEdit = (id: number, updatedData:
        {
            name: string;
            username: string;
            email: string
        }) => {
        axios
            .patch(`https://jsonplaceholder.typicode.com/users/${id}`, updatedData)
            .then(response => {
                setUsers(users.map(user =>
                    user.id === id ? { ...user, ...updatedData } : user
                ));
                console.log('User updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            })
            .finally(() => {
                console.log('Edit request completed');
            });
    }

    const handleSave = () => {

        axios
            .post("https://jsonplaceholder.typicode.com/users", newUser)
            .then(() => {
                if (!newUser.name || !newUser.username || !newUser.email) {
                    notify();
                    return;
                }

                const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
                const userToAdd = { ...newUser, id: maxId + 1 };
                setUsers([...users, userToAdd]);
                setShowForm(false);
                setNewUser({ name: "", username: "", email: "" });
            })
            .catch(err => console.error(err))
            .finally(() => { console.log('Add user request completed') });
    };


    return (
        <div className="flex flex-col justify-between py-20 px-20 gap-10">
            <button 
            onClick={() => history.back()}
            className="w-32 h-100 border rounded-md border-blue-400 border-solid bg-white 
                                    font-bold text-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-white transition">Go Back</button>
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-10">
                    <h2 className="font-montserrat text-2xl text-gray-500">Users</h2>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                        }}
                        type="button"
                        className="border rounded-md border-blue-400 border-solid bg-white 
                                    font-bold text-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-white transition">Add User</button>

                    {showForm && (
                        <div className="mt-4 flex gap-2 border p-4 rounded-md">
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={handleChange}
                                className="border px-2 py-1"
                                required
                            />
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={newUser.username}
                                onChange={handleChange}
                                className="border px-2 py-1"
                                required
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={handleChange}
                                className="border px-2 py-1"
                                required
                            />
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-700"
                            >
                                SAVE
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-700"
                            >
                                EXIT
                            </button>
                        </div>
                    )}

                </div>
                {!showForm &&
                    <div className="flex items-center">
                        <Search className="w-5 h-5 text-blue-400" />
                        <input
                            type="text"
                            placeholder="Search users by name"
                            value={searchName}
                            onChange={handleSearch}
                            className="border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1" />
                    </div>}

            </div>
            <div className="flex flex-col gap-2">

                <div className="flex font-semibold border-b border-gray-300 py-2 text-gray-500">
                    <div className="flex-1">Id</div>
                    <div className="flex-1">Name</div>
                    <div className="flex-1">Username</div>
                    <div className="flex-1">Email</div>
                    <div className="flex-1 text-center">Actions</div>
                </div>


                {filteredUsers.map(user => (
                    <div key={user.id} className="flex items-center py-2 border-b border-gray-200 text-gray-700">
                        <div className="flex-1 font-bold">{user.id}</div>

                        <div className="flex-1">
                            {editingId === user.id ? (
                                <input
                                    name="name"
                                    value={editingData.name}
                                    onChange={handleEditChange}
                                    className="border px-2 py-1 w-full"
                                />
                            ) : (
                                user.name
                            )}
                        </div>
                        <div className="flex-1">
                            {editingId === user.id ? (
                                <input
                                    name="username"
                                    value={editingData.username}
                                    onChange={handleEditChange}
                                    className="border px-2 py-1 w-full"
                                />
                            ) : (
                                user.username
                            )}
                        </div>
                        <div className="flex-1">
                            {editingId === user.id ? (
                                <input
                                    name="email"
                                    value={editingData.email}
                                    onChange={handleEditChange}
                                    className="border px-2 py-1 w-full"
                                />
                            ) : (
                                user.email
                            )}
                        </div>

                        <div className="flex-1 flex justify-center gap-2">
                            {editingId === user.id ? (
                                <button onClick={() => saveEdit(user.id)} className="focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-md text-sm px-3 py-1.5">SAVE</button>
                            ) : (
                                <button onClick={() => startEdit(user)} className="focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-3 py-1.5">EDIT</button>
                            )}
                            <button onClick={() => handleDelete(user.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-md text-sm px-3 py-1.5">DELETE</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Users;