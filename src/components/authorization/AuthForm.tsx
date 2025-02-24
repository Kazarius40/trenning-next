'use client';
import Form from "next/form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import userAuthValidator from "@/app/validators/userAuthValidator";
import {IAuthForm} from "@/app/models/authorization/IAuthForm";
import {loginWithToken} from "@/app/services/auth.service";
import {useRouter} from "next/navigation";

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
    );
};