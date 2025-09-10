import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
    const history = useHistory();

    const notify = () => toast.success("I direct you! ☺️");

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen font-montserrat ">
            <div className="bg-gray-100 p-10 rounded-lg shadow-lg flex flex-col items-center gap-5 border border-gray-300">
                <h1 className="text-2xl">Welcome to the Home Page!</h1>
                <p>Please press one of the buttons.</p>
                <button
                    className="border rounded-md border-blue-400 border-solid bg-blue-400 font-bold text-white px-4 py-2 hover:bg-blue-500 transition"
                    onClick={() => {
                        notify();
                        history.push("/users");
                    }}
                >Users</button>

                <button
                    className="border rounded-md border-blue-400 border-solid bg-blue-400 font-bold text-white px-4 py-2 hover:bg-blue-500 transition"
                    onClick={() => {
                        notify();
                        history.push("/posts");
                    }}
                >Posts</button>
            </div>
        </div>
    );
}

export default HomePage;