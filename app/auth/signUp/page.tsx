"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAndConditions: boolean;
}

export default function signUp() {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const [form, setForm] = useState<FormState>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false
    });
    const [fieldErrors, setFieldErrors] = useState<{ [key in keyof FormState]: string | null }>({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
        termsAndConditions: null
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue: string = type === 'checkbox' ? checked.toString() : value;
        setForm(prevState => ({
            ...prevState,
            [name as keyof FormState]: newValue
        }));
        if (name === 'confirmPassword') {
            validateField(name as keyof FormState, value);
        } else {
            validateField(name as keyof FormState, newValue);
        }
    }
    

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        try {
            const res = await fetch('https://accountprovider--silicon.azurewebsites.net/api/SignUp?code=xKmBjTNCOst-zcPnF056L0MEgc0TkUn4iAZO0xPU1ouVAzFurodsvw==', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (res.status === 200) {
                router.push("/auth/signIn");
            } else {
                const result = await res.json();
                setError(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    }

    const validateField = (fieldName: keyof FormState, value: string) => {
        const validator = fieldValidators[fieldName];
        if (validator) {
            const errorMessage = validator(value);
            setFieldErrors(prevState => ({
                ...prevState,
                [fieldName]: errorMessage
            }));
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;

        Object.entries(form).forEach(([fieldName, value]) => {
            const validator = fieldValidators[fieldName as keyof FormState];
            if (validator) {
                const errorMessage = validator(value as string);
                setFieldErrors(prevState => ({
                    ...prevState,
                    [fieldName as keyof FormState]: errorMessage
                }));
                if (errorMessage) {
                    isValid = false;
                }
            }
        });

        return isValid;
    };

    const fieldValidators: { [key in keyof FormState]: (value: string) => string | null } = {
        firstName: (value: string) => value.trim().length >= 2 ? null : 'First name must be at least 2 characters long',
        lastName: (value: string) => value.trim().length >= 2 ? null : 'Last name must be at least 2 characters long',
        email: (value: string) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) ? null : 'Invalid email address',
        password: (value: string) => /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value) ? null : 'Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character',
        confirmPassword: (value: string) => value === form.password ? null : 'Passwords do not match',
        termsAndConditions: (value: string) => form.termsAndConditions ? null : 'You must agree to the terms and conditions'
    };
    return (
        <section id="signup">
            <div className="container">
                
                <form onSubmit={handleSubmit} noValidate>
                    <div>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <h1>Create Account</h1>
                        <p>Already have an account? <a href="/auth/signIn"><a>Sign In</a></a></p>
                    </div>
                    <div className="content">
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={onChange} className={fieldErrors.firstName ? 'error' : ''} />
                            {fieldErrors.firstName && <span className="error-message">{fieldErrors.firstName}</span>}
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={onChange} className={fieldErrors.lastName ? 'error' : ''} />
                            {fieldErrors.lastName && <span className="error-message">{fieldErrors.lastName}</span>}
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={form.email} onChange={onChange} className={fieldErrors.email ? 'error' : ''} />
                            {fieldErrors.email && <span className="error-message">{fieldErrors.email}</span>}
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={form.password} onChange={onChange} className={fieldErrors.password ? 'error' : ''} />
                            {fieldErrors.password && <span className="error-message">{fieldErrors.password}</span>}
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={onChange} className={fieldErrors.confirmPassword ? 'error' : ''} />
                            {fieldErrors.confirmPassword && <span className="error-message">{fieldErrors.confirmPassword}</span>}
                        </div>
                        <div id="form-terms" >
                            <div className="checkbox-group">
                                <input type="checkbox" id="termsAndConditions" name="termsAndConditions" checked={form.termsAndConditions} onChange={onChange} className={fieldErrors.termsAndConditions ? 'error' : ''} />
                                <label htmlFor="termsAndConditions">I agree to the <a href="#">Terms</a> & <a href="#">Conditions</a>.</label>
                            </div>
                            {fieldErrors.termsAndConditions && <span className="error-message">{fieldErrors.termsAndConditions}</span>}
                        </div>
                    </div>
                    <button id="form-button" className="btn-theme-s" type="submit">Sign Up</button>
                </form>
            </div>
        </section>
    );
  }
  