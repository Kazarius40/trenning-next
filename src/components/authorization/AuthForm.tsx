'use client';

import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {IAuthForm} from "@/models/authorization/IAuthForm";
import {joiResolver} from "@hookform/resolvers/joi";
import userAuthValidator from "@/validators/userAuthValidator";
import {loginWithToken} from "@/services/auth.service";
import Form from "next/form";

export const AuthForm = () => {
    const router = useRouter();
    const {register, formState: {errors, isValid}} = useForm<IAuthForm>({
        mode: 'all',
        resolver: joiResolver(userAuthValidator)
    });
    const loginHandler = async (formData: FormData): Promise<void> => {
        await loginWithToken(formData);
        router.push('/');
    }


    return (
        <>
            <Form action={loginHandler}>

                <label>
                    <input type="text" placeholder="username" {...register("username")} />
                    {errors.username && <div>{errors.username.message}</div>}
                </label>

                <label>
                    <input type="password" placeholder="password" {...register("password")} />
                    {errors.password && <div>{errors.password.message}</div>}
                </label>

                <button disabled={!isValid}>Увійти</button>
            </Form>
        </>
    )
}