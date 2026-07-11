import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'
import { signUp, signIn } from '../utils/auth-query';
import { ValidationError } from '../utils/validation-error';
import type { FormValidationError } from '../types';
import { useAuth } from '../context/auth';
import { FormButton } from '../components/FormSubmitBtn';
import { FormField } from '../components/FormField';

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
        <main className="min-h-screen flex justify-center items-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-[1.75rem] font-semibold text-text-primary tracking-tight">
                        Zype
                    </h1>
                    <p className="text-[0.8125rem] text-text-secondary mt-1.5">
                        A better way to message
                    </p>
                </div>

                <div className="bg-surface-secondary rounded-xl p-0.5 flex relative mb-8">
                    <div
                        className="absolute top-0.5 bottom-0.5 w-1/2 rounded-[18px] bg-accent transition-all duration-500 ease-spring z-0"
                        style={{
                            left: activeTab === 0 ? '2px' : 'calc(50% + 2px)',
                        }}
                    />
                    <button
                        className={`relative z-10 w-full py-2.5 text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-150 ${activeTab === 0 ? 'text-white' : 'text-text-secondary'}`}
                        onClick={() => setActiveTab(0)}
                    >
                        Sign Up
                    </button>
                    <button
                        className={`relative z-10 w-full py-2.5 text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-150 ${activeTab === 1 ? 'text-white' : 'text-text-secondary'}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Sign In
                    </button>
                </div>

                {activeTab === 0 && (
                    <form className="flex flex-col gap-5" onSubmit={submitSignUpForm}>
                        <FormField name="username" label="Username" type="text" required minLength={3} maxLength={10} placeholder="johndoe123" validationErrors={signUpValidationError} />
                        <FormField name="email" label="Email Address" type="email" required placeholder="johndoe@example.com" validationErrors={signUpValidationError} />
                        <FormField name="password" label="Password" type="password" placeholder='••••••••' required minLength={8} maxLength={20} validationErrors={signUpValidationError} />
                        <FormButton isPending={isSigningUp}>Get Started</FormButton>
                    </form>
                )}

                {activeTab === 1 && (
                    <form className="flex flex-col gap-5" onSubmit={submitSignInForm}>
                        <FormField name="email" label="Email Address" type="email" required placeholder="johndoe@example.com" validationErrors={signInValidationError} />
                        <FormField name="password" label="Password" type="password" required minLength={8} maxLength={20} placeholder='••••••••' validationErrors={signInValidationError} />
                        <FormButton isPending={isSigningIn}>Sign In</FormButton>
                    </form>
                )}
            </div>
        </main>
    );
}
