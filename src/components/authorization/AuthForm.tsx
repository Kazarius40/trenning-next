'use client';


import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {IAuthForm} from "@/models/authorization/IAuthForm";
import {joiResolver} from "@hookform/resolvers/joi";
import userAuthValidator from "@/validators/userAuthValidator";
import {loginWithToken} from "@/services/auth.service";
import Form from "next/form";
import {setCookie} from "cookies-next";

export const AuthForm = () => {
    const router = useRouter();
    const {register, formState: {errors, isValid}} = useForm<IAuthForm>({
        mode: 'all',
        resolver: joiResolver(userAuthValidator)
    });
    const loginHandler = async (formData: FormData): Promise<void> => {
        const response = await loginWithToken(formData);

        if (response) {
            const accessToken = response.headers.get("Authorization");
            const refreshToken = response.headers.get("Refresh-Token");
            const userData = response.headers.get("User-Data");

            if (accessToken && refreshToken && userData) {
                setCookie('accessToken', accessToken);
                setCookie('refreshToken', refreshToken);
                setCookie('userData', userData);
            }

            router.push('/');
        }
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