import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosUser from "../../Hooks/useAxiosUser";
import Swal from "sweetalert2";

const Social = () => {
    const { signInWithGoogle, signInWithGithub } = useAuth();
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

                console.log("User Info:", userInfo);

                axiosUser
                    .post("/signup", userInfo)
                    .then((response) => {

                        if (response.data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Logged in successfully!',
                                text: 'Welcome back!',
                                timer: 2000,
                                showConfirmButton: false,
                            }).then(() => {
                                navigate("/");
                            });
                        } else {

                            Swal.fire({
                                icon: 'info',
                                title: 'User already exists!',
                                text: 'Welcome back!',
                            }).then(() => {
                                navigate("/");  // Redirect to home page
                            });
                        }
                    })
                    .catch((err) => {
                        console.error("Google Sign-In Error:", err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Something went wrong with Google Sign-In!',
                        });
                    });
            })
            .catch((err) => {
                console.error("Google Authentication Error:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error',
                    text: 'Google authentication failed!',
                });
            });
    };


    const handleGithubSignIn = () => {
        signInWithGithub()
            .then((result) => {
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                };

                console.log("User Info:", userInfo);


                axiosUser
                    .post("/signup", userInfo)
                    .then((response) => {

                        if (response.data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Logged in successfully!',
                                text: 'Welcome back!',
                                timer: 2000,
                                showConfirmButton: false,
                            }).then(() => {
                                navigate("/");
                            });
                        } else {
                            // User already exists logic
                            Swal.fire({
                                icon: 'info',
                                title: 'User already exists!',
                                text: 'Welcome back!',
                            }).then(() => {
                                navigate("/");
                            });
                        }
                    })
                    .catch((err) => {
                        console.error("GitHub Sign-In Error:", err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Something went wrong with GitHub Sign-In!',
                        });
                    });
            })
            .catch((err) => {
                console.error("GitHub Authentication Error:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error',
                    text: 'GitHub authentication failed!',
                });
            });
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
                <button
                    onClick={handleGoogleSignIn}
                    className="bg-[#3B9DF8] text-white rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200"
                >
                    <div className="py-2 px-2.5 rounded-l-md bg-white">
                        <img
                            src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                            alt="Google logo"
                            className="w-[23px]"
                        />
                    </div>
                    Sign in with Google
                </button>

                <button
                    onClick={handleGithubSignIn}
                    className="bg-black text-white rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] hover:bg-gray-800 transition-all duration-200"
                >
                    <img
                        src="https://i.ibb.co/w4xtRf9/download-10-removebg-preview.png"
                        alt="GitHub logo"
                        className="w-[35px]"
                    />
                    Continue with GitHub
                </button>
            </div>
        </div>
    );
};

export default Social;
