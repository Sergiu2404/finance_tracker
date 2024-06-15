//Clerk imports
import {
    SignedIn, SignedOut, SignInButton, SignUpButton, UserButton
} from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';



export const Auth = () => {
    return (
    <div className='sign-in-container'>
        <SignedOut>
            <SignUpButton mode='modal'/>
            <SignInButton mode='modal' />
        </SignedOut>

        automatically redirect to main page if logged in
        <SignedIn>
            <Navigate to="/" /> 
        </SignedIn>
    </div>
    );
}