import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosUser from "../../Hooks/useAxiosUser";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Social = () => {
    const { signInWithGoogle } = useAuth();
    const axiosUser = useAxiosUser();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                };

                axiosUser.post("/signup", userInfo).then((response) => {
                    if (response.data.insertedId) {
                        toast.success(`Welcome, ${userInfo.name}!`);
                    } else {
                        toast.success("Welcome back!");
                    }
                    navigate("/");
                });
            })
            .catch((err) => {
                console.error("Google Authentication Error:", err);
                toast.error("Google sign-in failed.");
            });
    };

    return (
        <div className="w-full flex items-center justify-center">
            <button
                onClick={handleGoogleSignIn}
                className="w-full md:w-auto bg-white/80 backdrop-blur-md text-gray-800 border border-gray-300 hover:border-gray-400 rounded-xl px-6 py-3 flex items-center justify-center gap-3 text-base font-medium shadow-md hover:shadow-lg hover:bg-white transition-all duration-200"
            >
                <FcGoogle className="text-2xl" />
                <span className="whitespace-nowrap">Sign in with Google</span>
            </button>
        </div>
    );
};

export default Social;
