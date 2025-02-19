import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../../Firebase/firebase.init';
import useAxiosUser from '../../Hooks/useAxiosUser';




export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // State
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionId, setSessionId] = useState('');

    const axiosUser = useAxiosUser();



    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Sign in with GitHub
    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);

            if(currentUser){
                const userInfo = {
                    email: currentUser?.email
                }

                try{
                    
                    const res = await axiosUser.post('/create-token', userInfo);
                    const data = await res.data;
                   
                    setLoading(false);
                }
                catch(error){console.error(error)}
            }
            else{
                
                try{
                    const res = await axiosUser.post('/logout');
                    const data = await res.data;
                   
                    setLoading(false);  
                }
                catch(error){console.error(error)}
            }
        });

        return unsubscribe;
    }, []);


    const authInfo = {
        user,
        loading,
        createNewUser,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        logOut,
        updateUserProfile,
        sessionId,
        setSessionId

    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
