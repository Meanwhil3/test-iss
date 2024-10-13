'use client';

import { authenticate } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
            <Card className="w-full max-w-sm">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md">Welcome back</p>
                        <p className="text-small text-default-500">Login to your account</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <form action={dispatch} className="space-y-4">
                        <Input
                            isRequired
                            label="Email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <Input
                            isRequired
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                        />
                        {errorMessage && (
                            <p className="text-tiny text-danger" role="alert">{errorMessage}</p>
                        )}
                        <Button color="primary" type="submit" className="w-full">
                            Log In
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}