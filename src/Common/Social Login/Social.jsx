import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosUser from "../../Hooks/useAxiosUser";
import { toast } from "react-hot-toast";

const Social = () => {
    const { signInWithGoogle, signInWithFacebook } = useAuth();
    const axiosUser = useAxiosUser();
    const navigate = useNavigate();

    // Handle Google Sign-In
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                };
                
                axiosUser.post("/signup", userInfo).then((response) => {
                    if (response.data.insertedId) {
                        toast.success("Logged in successfully! Welcome back!");
                    } else {
                        toast.info("User already exists! Welcome back!");
                    }
                    navigate("/");
                });
            })
            .catch((err) => {
                console.error("Google Authentication Error:", err);
                toast.error("Google authentication failed!");
            });
    };

    // Handle Facebook Sign-In
    const handleFacebookSignIn = () => {
        signInWithFacebook()
            .then((result) => {
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                };
                
                axiosUser.post("/signup", userInfo).then((response) => {
                    if (response.data.insertedId) {
                        toast.success("Logged in successfully! Welcome back!");
                    } else {
                        toast.info("User already exists! Welcome back!");
                    }
                    navigate("/");
                });
            })
            .catch((err) => {
                console.error("Facebook Authentication Error:", err);
                toast.error("Facebook authentication failed!");
            });
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleSignIn}
                    className="bg-[#4285F4] text-white rounded-lg py-3 px-5 flex items-center gap-3 text-lg shadow-md hover:bg-[#357ae8] transition-all duration-200"
                >
                    <img
                        src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                        alt="Google logo"
                        className="w-6"
                    />
                    Sign in with Google
                </button>
                
                {/* Facebook Sign-In Button */}
                <button
                    onClick={handleFacebookSignIn}
                    className="bg-[#1877F2] text-white rounded-lg py-3 px-5 flex items-center gap-3 text-lg shadow-md hover:bg-[#166fe5] transition-all duration-200"
                >
                    <img
                        src="https://i.ibb.co/ykV1b9V/facebook-icon.png"
                        alt="Facebook logo"
                        className="w-6"
                    />
                    Continue with Facebook
                </button>
            </div>
        </div>
    );
};

export default Social;
