import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'
import { signUp, signIn } from '../utils/auth-query';
import { ValidationError } from '../utils/validation-error';
import type { FormValidationError } from '../types';
import { EmailField } from '../components/EmailField';
import { PasswordField } from '../components/PasswordField';
import { useAuth } from '../context/auth';
import { FormButton } from '../components/FormSubmitBtn';
import { UsernameField } from '../components/UsernameField';

export const Route = createFileRoute('/auth')({
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const [activeTab, setActiveTab] = useState(0);
    const [signUpValidationError, setSignUpValidationError] = useState<
        null | FormValidationError[]>(null);

    const [signInValidationError, setSignInValidationError] =
        useState<null | FormValidationError[]>(null);

    const navigate = useNavigate();
    const { setUser } = useAuth()

    const { mutate: submitSignUp, isPending: isSigningUp } = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            setSignUpValidationError(null);
            setUser({ token: data.token, id: data.id });
            navigate({ to: "/", replace: true });
        },
        onError: (err) => {
            if (err instanceof ValidationError) {
                setSignUpValidationError(err.errors);
            }
        }
    });

    const { mutate: submitSignIn, isPending: isSigningIn } = useMutation({
        mutationFn: signIn,
        onSuccess: (data) => {
            setSignInValidationError(null);
            setUser({ token: data.token, id: data.id });
            navigate({ to: "/", replace: true });
        },
        onError: (err) => {
            if (err instanceof ValidationError) {
                setSignInValidationError(err.errors);
            }
        }
    });

    const submitSignUpForm = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitSignUp(new FormData(e.currentTarget));
    };

    const submitSignInForm = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitSignIn(new FormData(e.currentTarget));
    };

    return (
        <main className="min-h-screen flex justify-center items-center max-w-3xl mx-auto border-x dark:border-slate-800 dark:bg-slate-900/90">
            <div className=" px-4 w-full ">
                <div className="relative flex mb-3 border dark:border-slate-700 dark:bg-slate-800 rounded-4xl">
                    <div
                        className="absolute top-1 bottom-1 rounded-3xl w-[calc(50%-4px)] bg-blue-600 transition-transform duration-200"
                        style={{
                            transform: `translateX(${activeTab === 0 ? "4px" : "calc(100% + 4px)"})`,
                        }}
                    />
                    <button
                        className="relative z-10 w-full py-3 font-semibold text-lg"
                        onClick={() => setActiveTab(0)}
                    >
                        Sign Up
                    </button>
                    <button
                        className="relative z-10 w-full py-3 font-semibold text-lg"
                        onClick={() => setActiveTab(1)}
                    >
                        Sign In
                    </button>
                </div>

                {activeTab === 0 && (
                    <>
                        <p className="text-center text-2xl my-4">Create Account</p>
                        <form className="flex flex-col gap-5" onSubmit={submitSignUpForm}>
                            <UsernameField validationErrors={signUpValidationError} />
                            <EmailField validationErrors={signUpValidationError} />
                            <PasswordField validationErrors={signUpValidationError}>
                                Set A Password
                            </PasswordField>
                            <FormButton isPending={isSigningUp}>Get Started</FormButton>
                        </form>
                    </>
                )}

                {activeTab === 1 && (
                    <>
                        <p className="text-center text-2xl my-4">Welcome Back!</p>
                        <form className="flex flex-col gap-5" onSubmit={submitSignInForm}>
                            <EmailField validationErrors={signInValidationError} />
                            <PasswordField validationErrors={signInValidationError}>
                                Enter Password
                            </PasswordField>
                            <FormButton isPending={isSigningIn}>Sign In</FormButton>
                        </form>
                    </>
                )}
            </div>
        </main>
    );
}
