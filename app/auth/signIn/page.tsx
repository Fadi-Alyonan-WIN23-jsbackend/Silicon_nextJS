"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import signInAction from "./signInAction";

export default function signIn() {
  const router = useRouter();
  const [form, setForm] = useFormState(signInAction, {success:false})
  useEffect(()=>{
    if (form.success){
      router.push('/courses')
    }
    
  },[form])
  

  return (
    <section id="signin">
          <div className="container">
              <form action={setForm} noValidate>
                  {form.error && (
                      <div className="alert alert-danger" role="alert">
                          {form.error}
                      </div>
                  )}
                  <h1>Welcome Back</h1>
                  <p>Don't have an account? <a href="/auth/signup">Sign up here</a></p>
                  <div className="content">
                      <div className="input-group">
                          <label htmlFor="email">Email</label>
                          <input type="email" id="email" name="email"  />
                      </div>
                      <div className="input-group">
                          <label htmlFor="password">Password</label>
                          <input type="password" id="password" name="password" />
                      </div>
                      <div id="form-remember">
                      <div className="checkbox-group">
                          <input type="checkbox" name="RememberMe" />
                          <label>Remember Me</label>
                      </div>
                  </div>
                  </div>
                  <button className="btn-theme-s" type="submit">Sign In</button>
              </form>
          </div>
      </section>
  );
}

