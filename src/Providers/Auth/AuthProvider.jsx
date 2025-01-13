import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../../Firebase/firebase.init';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    // State
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



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

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    };

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);

    //         if (currentUser) {

    //             const userInfo = { email: currentUser.email };
    //             axiosPublic.post('jwt', userInfo)
    //                 .then(res => {
    //                     if (res.data.token) {
    //                         localStorage.setItem('access-token', res.data.token);
    //                         setLoading(false);
    //                     }
    //                 })
    //         }
    //         else {
    //             localStorage.removeItem('access-token');
    //             setLoading(false);
    //         }

    //     });

    //     return unsubscribe;
    // }, [axiosPublic]);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const authInfo = {
        user,
        loading,
        createNewUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
