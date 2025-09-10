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

type Posts = {
    id: number;
    userId: number;
    title: string;
};

function Posts() {

    const [posts, setPosts] = useState<Posts[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [showForm, setShowForm] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const [editingData, setEditingData] = useState<
        { userId: number; title: string }>({ userId: 0, title: "" });

    const [newPost, setNewPost] = useState(
        { userId: "", title: "" }
    );

    const startEdit = (posts: Posts) => {
        setEditingId(posts.id);
        setEditingData({ userId: posts.userId, title: posts.title });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditingData(post => ({ ...post, [name]: value }));
    };

    const saveEdit = (id: number) => {
        handleEdit(id, editingData);
        setEditingId(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPost(post => ({ ...post, [name]: value }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value);
    };

    const notify = () => toast.warning("Please fill in all fields! ⚠️", { position: "top-center" });

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                console.log(response.data);
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                console.log('Request completed');
            });
    }, []);

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

    const filteredPosts = posts.filter(post =>
        users.some(user =>
            user.id === post.userId &&
            user.name.toLowerCase().includes(searchName.toLowerCase())
        )
    );

    const handleDelete = (id: number) => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== id));
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            })
            .finally(() => { console.log('Delete request completed') });
    };

    const handleEdit = (id: number, updatedData:
        {
            userId: number;
            title: string;
        }) => {
        axios
            .patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData)
            .then(response => {
                setPosts(posts.map(post =>
                    post.id === id ? { ...post, ...updatedData } : post
                ));
                console.log('Post updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating post:', error);
            })
            .finally(() => {
                console.log('Edit request completed');
            });
    }

    const handleSave = () => {
        if (!newPost.userId || !newPost.title) {
            notify();
            return;
        }

        const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;

        const postToAdd = {
            ...newPost,
            id: maxId + 1,
            userId: Number(newPost.userId)
        };

        axios
            .post("https://jsonplaceholder.typicode.com/posts", postToAdd)
            .then(() => {
                setPosts([...posts, postToAdd]);
                setShowForm(false);
                setNewPost({ userId: "", title: "" });
            })
            .catch(err => console.error(err))
            .finally(() => { console.log('Add post request completed') });
    };


    return (
        <div className="flex flex-col justify-between py-20 px-20 gap-10">
            <button 
            onClick={() => history.back()}
            className="w-32 h-100 border rounded-md border-blue-400 border-solid bg-white 
                                    font-bold text-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-white transition">Go Back</button>
            <div className="flex justify-between w-full">
                <div className="flex items-center gap-10">
                    <h2 className="font-montserrat text-2xl text-gray-500">Posts</h2>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                        }}
                        type="button"
                        className="border rounded-md border-blue-400 border-solid bg-white 
                                    font-bold text-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-white transition">Add Post</button>

                    {showForm && (
                        <div className="mt-4 flex gap-2 border p-4 rounded-md">
                            <input
                                name="userId"
                                type="number"
                                placeholder="User ID"
                                value={newPost.userId}
                                onChange={handleChange}
                                className="border px-2 py-1"
                                required
                            />
                            <input
                                name="title"
                                placeholder="Title"
                                value={newPost.title}
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
                    <div className="flex-1">Post Id</div>
                    <div className="flex-1">Name</div>
                    <div className="flex-1">Username</div>
                    <div className="flex-1">Email</div>
                    <div className="flex-1">Title</div>
                    <div className="flex-1 text-center">Actions</div>
                </div>



                {filteredPosts.map(post => {
                    const user = users.find(u => u.id === post.userId);

                    return (
                        <div key={post.id} className="flex items-center py-2 border-b border-gray-200 text-gray-700">
                            {/* Post Id */}
                            <div className="flex-1 font-bold">{post.id}</div>

                            {/* Kullanıcı bilgileri */}
                            <div className="flex-1">{user ? user.name : "Unknown"}</div>
                            <div className="flex-1">{user ? user.username : "-"}</div>
                            <div className="flex-1">{user ? user.email : "-"}</div>

                            {/* Post Title */}
                            <div className="flex-1">
                                {editingId === post.id ? (
                                    <input
                                        name="title"
                                        value={editingData.title}
                                        onChange={handleEditChange}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    post.title
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex-1 flex justify-center gap-2">
                                {editingId === post.id ? (
                                    <button
                                        onClick={() => saveEdit(post.id)}
                                        className="focus:outline-none text-white bg-green-500 hover:bg-green-700 rounded-md text-sm px-3 py-1.5"
                                    >
                                        SAVE
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => startEdit(post)}
                                        className="focus:outline-none text-white bg-blue-500 hover:bg-blue-700 rounded-md text-sm px-3 py-1.5"
                                    >
                                        EDIT
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 rounded-md text-sm px-3 py-1.5"
                                >
                                    DELETE
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Posts;