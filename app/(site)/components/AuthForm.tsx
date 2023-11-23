'use client';
import axios from "axios";
import {signIn, useSession} from "next-auth/react";
import {toast} from "react-hot-toast"
import { useCallback, useEffect, useReducer, useState } from "react";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle, BsTwitter } from 'react-icons/bs';
import { useRouter } from "next/navigation";


type Variant = 'LOGIN' | 'REGISTER';
const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [Variant, setVariant]= useState<Variant>('LOGIN');
    const [isLoading, setIsLoading]= useState(false);

    useEffect(() =>{
        if (session?. status == 'authenticated'){
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant =  useCallback(() => {
        if(Variant == 'LOGIN'){
            setVariant('REGISTER');
        }
        else {
            setVariant('LOGIN');
        }

    }, [Variant]);

    const {
register,
handleSubmit,
formState:{
    errors
}
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email:'',
            password:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
       setIsLoading(true);
       if(Variant== 'REGISTER'){
        axios.post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something Went Wrong!'))
        .finally(() => setIsLoading(false));
       }
       if(Variant=='LOGIN'){
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback)=>{
            if(callback?.error){
            toast.error('Invalid Credentials');
            }

            if (callback?.ok && !callback?.error){
                toast.success('Logging in...')
                router.push('/users')
            }
        })
        .finally(() => setIsLoading(false));
        
       }
    }

    const socialAction = (action: string) =>{
        setIsLoading(true);
        signIn(action, {redirect:false})
        .then((callback) => {
            if(callback?.error){
                toast.error('Invalid Credentials');
            }
            if(callback?.ok && !callback?.error){
                toast.success('Logging in...');
            }
        })
        .finally(() => setIsLoading(false));
    }
    return (
        <div className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
        ">
            <div className="
            bg-stone-100
            px-4
            py-8
            shadow-xl
            sm:rounded-lg
            sm:px-10
            ">
              <form className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              >
                {Variant =="REGISTER" &&(
                <Input 
                id="name" 
                label="Name" 
                register={register} 
                errors={errors} 
                disabled={isLoading}
                />
                )}
                <Input
                id="email"
                label="Email Address"
                type="email"
                register={register}
                errors={errors}
                disabled={isLoading}
                />
                <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                disabled={isLoading}
                />
                <div>
                    <Button
                    disabled={isLoading}
                    fullwidth
                    type="submit"
                    >
                        {Variant=='LOGIN' ? 'Sign in' : 'Register'}
                    </Button>
                </div>
                </form>  
                <div className="mt-6">
                    <div className="relative">
                        <div className="
                        absolute
                        inset-0
                        flex
                        items-center"
                        >
                            <div className="w-full border-t border-gray-300" />

                        </div>
                        <div className=" relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                    <AuthSocialButton 
                    icon={BsGithub}
                    onClick={() => socialAction('github')}
                    />
                    <AuthSocialButton 
                    icon={BsGoogle}
                    onClick={() => socialAction('github')}
                    />
                    </div>
                </div>

                <div className ="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-stone-600
                ">
                    <div>
                        {Variant=="LOGIN"? 'New Here?' : "Already with us?"}
                    </div>
                    <div
                    onClick={toggleVariant}
                    className="underline cursor-pointer"
                    >
                        {Variant=='LOGIN'? 'Create an account' : 'Log in'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;