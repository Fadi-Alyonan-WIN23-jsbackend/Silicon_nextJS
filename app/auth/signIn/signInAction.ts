"use server"

import { cookies } from "next/headers";


type ActionTypes = {
    success : boolean,
    error?: string | undefined;
    
}
export default async function signInAction(currentState: any, formdata: FormData) : Promise<ActionTypes> {
    const email = formdata.get('email')
    const password = formdata.get('password')
    const rememberme = formdata.get('RememberMe')

    const SignInFormData = {email, password, rememberme:rememberme?rememberme:false}
    try {
        const res = await fetch('', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(SignInFormData)
        });
        if (res.status === 200) {
            const result = await res.json()

            cookies().set('Authorization', result,{
                secure: true,
                httpOnly:true,
                expires: Date.now() + 24 * 60 * 60 * 1000 * 1,
                path:'/',
                sameSite: 'strict'
            })
            return {success: true}
        } else {
            return {success:false, error:'Invalid e-mail or password. Please try again.'}
        }
    } catch {
        return {success: false, error: "unable to sign in. please try again later"}
    }
}


