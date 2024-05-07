import { Props } from "@/app/interfaces/accountTyps";
import { useState } from "react";
import AccountAside from '@/app/components/account/accountAside'

const validateEmail = (email: string): boolean => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};

const validateNotEmpty = (input: string): boolean => {
    return input.trim().length > 0;
};

export default function Home() {
    const [formData, setFormData] = useState<Props>();
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        
        
        if (formData != null) {
            const newFormData = { ...formData };
            if (name in formData.basic) {
                newFormData.basic[name as keyof typeof formData.basic] = value;
            } else if (name in formData.address) {
                newFormData.address[name as keyof typeof formData.address] = value;
            }
            setFormData(newFormData);
        }
        
        
        let error: string | null = null;
        if (name === 'email' && !validateEmail(value)) {
            error = 'Invalid email address';
        } else if (['firstName', 'lastName', 'addressLine1', 'city'].includes(name) && !validateNotEmpty(value)) {
            error = 'This field cannot be empty';
        }
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(errors).some(err => err !== null)) {
            alert('Please fix the errors before submitting.');
            return;
        }
        console.log('Form Data Submitted:', formData);
    };

    return (
        <div className="container">
            <section id="account-details">
              
                {/* <AccountAside {}/> */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData?.basic.FirstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData?.basic.LastName}
                            onChange={handleChange}
                        />
                        
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData?.basic.Email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData?.basic.PhoneNumber || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="biography">Biography</label>
                        <textarea
                            name="biography"
                            value={formData?.basic.Biography || ''}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => console.log('Cancel')}>Cancel</button>
                </form>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="addressLine1">Address Line 1</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={formData?.address.AddressLine1}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={formData?.address.AddressLine2 || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData?.address.PostalCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData?.address.City}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => console.log('Cancel')}>Cancel</button>
                </form>
            </section>
        </div>
    );
  }
  