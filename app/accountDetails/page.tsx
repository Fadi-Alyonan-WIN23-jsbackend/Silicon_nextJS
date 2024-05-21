"use client"
import { useState, useEffect } from "react";
import AccountAside from '@/app/components/account/accountAside'
import { Props } from "@/app/interfaces/accountTyps";

const getUserInformationUrl = 'https://accountprovider--silicon.azurewebsites.net/api/GetUserInformation?code=aNTtpYLpi-kJwhT7UwxIh3Bg-d_wgAl7i9ZwkTB93ca9AzFucxov5g%3D%3D';
const updateUserInformationUrl = 'https://accountprovider--silicon.azurewebsites.net/api/UpdateUserInformation?code=5qeaYssH-26LfFNyO3KApmRHWQQVDbgMOywfZ-xgDHDSAzFu-XqzmQ%3D%3D';
const getAddressInfoUrl = 'https://accountprovider--silicon.azurewebsites.net/api/GetUserAddressInfo?code=6cfnRqXK6Gi1L5msrQC5PxW4n8RF1ojt9eorln6zmcjLAzFubG8-pQ%3D%3D';
const updateAddressUrl = 'https://accountprovider--silicon.azurewebsites.net/api/UpdateAddress?code=KJF8bVQuYjpOP2TTvU-05IQqPw02GhkVigR_LigalStJAzFuKAttKg%3D%3D ';


const validateEmail = (email: string): boolean => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};

const validateNotEmpty = (input: string): boolean => {
    return input.trim().length > 0;
};

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; &{Authorization}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
};  

export default function Home() {
    const [formData, setFormData] = useState<any>(null);
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    
    useEffect(() => {
        async function fetchData() {
            try {
                const userInfoResponse = await fetch(getUserInformationUrl);
                if (!userInfoResponse.ok) throw new Error("Failed to fetch user information")
                const userInfoData = await userInfoResponse.json();
                console.log (userInfoResponse)


                const addressInfoResponse = await fetch(getAddressInfoUrl);
                if (!addressInfoResponse.ok) throw new Error("Failed to fetch address information")
                const addressInfoData = await addressInfoResponse.json();
                setFormData({ basic: userInfoData, address: addressInfoData});
            } catch (error) {
                console.error('Error Fetching data:', error)
            }
        }
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newFormData = { ...formData };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(errors).some(err => err !== null)) {
            alert('Please fix the errors before submitting.');
            return;
        }
        try {
            await fetch(updateUserInformationUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData.basic)
            });
            await fetch(updateAddressUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData.address)
            });
            alert('Data updated successfully');
        }catch (error) {
            console.error('Error updating data:', error);
            alert('Failed to update data')
        }
        console.log('Form Data Submitted:', formData);
    };
    


    return (
        <div className="container">
            <section id="account-details">
                
                {<AccountAside />}
                
               
                <div className="account-details-forms">
                <form className="first-form" onSubmit={handleSubmit}>
                <div className="account-titles">
                    <h2 className="account-title">Account Details</h2>
                    <h5 className="subtitle">Account info</h5>
                </div>
                    <div className="first">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData?.basic.FirstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="last">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData?.basic.LastName}
                            onChange={handleChange}
                        />
                        
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData?.basic.Email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="phone">
                        <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData?.basic.PhoneNumber || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="bio">
                        <label htmlFor="biography">Biography (Optional)</label>
                        <textarea
                            name="biography"
                            value={formData?.basic.Biography || ''}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {/* <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => console.log('Cancel')}>Cancel</button> */}
                </form>
                
                <h5 className="address-info">Address info</h5>
                <form className="second-form" onSubmit={handleSubmit}>

                

                    <div className="first-address">
                        <label htmlFor="addressLine1">Address Line 1</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={formData?.address.AddressLine1}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="second-address">
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={formData?.address.AddressLine2 || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="postal">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData?.address.PostalCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="city">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData?.address.City}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-buttons">
                        <button id="save" className="btn-theme-s" type="submit">Save Changes</button>
                        <button id="cancel" className="cancel" type="button" onClick={() => console.log('Cancel')}>Cancel</button>
                    </div>
                </form>
                </div>
                
            </section>
        </div>
    );
  }
  