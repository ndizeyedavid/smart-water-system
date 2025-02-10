import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import pb from '../utils/pocketbase';

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = pb.authStore.isValid;

        if (loggedIn) {
            navigate("/dashboard");
        }
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, reset } = useForm();

    const login = async (data) => {
        setIsLoading(true);
        setError('');
        console.log(data)
        try {
            // Add your authentication logic here
            await pb.collection('_superusers').authWithPassword(
                data.email,
                data.password
            );

            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
            console.error(err)
        } finally {
            setIsLoading(false);
            reset();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-cyan-100 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-2xl">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-600">
                        Sign in to monitor your water usage
                    </p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-500 rounded-lg bg-red-50">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(login)}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email"
                                {...register("email")}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password"
                                {...register("password")}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div></div>

                        <div className="text-sm">
                            <Link to="/forget-password" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader id='spin' />
                        ) : (
                            'Sign in'
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
