"use client"
import { useState, useEffect } from "react";
import AccountAside from '@/app/components/account/accountAside'
import { jwtDecode } from "jwt-decode";
import { Props } from "@/app/interfaces/accountTyps";


interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    bio: string;
}

interface AddressInfo {
    AddressLine1: string;
    AddressLine2: string;
    PostalCode: string;
    City: string;
}



const getUserInformationUrl = 'https://accountprovider--silicon.azurewebsites.net/api/GetUserInformation?code=aNTtpYLpi-kJwhT7UwxIh3Bg-d_wgAl7i9ZwkTB93ca9AzFucxov5g%3D%3D';
const updateUserInformationUrl = 'https://accountprovider--silicon.azurewebsites.net/api/UpdateUserInformation?code=5qeaYssH-26LfFNyO3KApmRHWQQVDbgMOywfZ-xgDHDSAzFu-XqzmQ%3D%3D';
const getAddressInfoUrl = 'https://accountprovider--silicon.azurewebsites.net/api/GetUserAddressInfo?code=6cfnRqXK6Gi1L5msrQC5PxW4n8RF1ojt9eorln6zmcjLAzFubG8-pQ%3D%3D';
const updateAddressUrl = 'https://accountprovider--silicon.azurewebsites.net/api/UpdateAddress?code=KJF8bVQuYjpOP2TTvU-05IQqPw02GhkVigR_LigalStJAzFuKAttKg%3D%3D';




const validateEmail = (email: string): boolean => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};

const validateNotEmpty = (input: string): boolean => {
    return input.trim().length > 0;
};


    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    export default function accountDetails() {
        const [userInfo, setUserInfo] = useState<UserInfo>({ firstName: '', lastName: '', email: '', phoneNumber: '', bio: '' });
        const [addressInfo, setAddressInfo] = useState<AddressInfo>({ AddressLine1: '', AddressLine2: '', PostalCode: '', City: '' });

        useEffect(() => {
            const fetchUserInfo = async () => {
                const token = getCookie('Authorization');
                if (token) {
                    const accessToken: any = jwtDecode(token);
                    const userId = accessToken.nameid;
                    if (userId) {
                        try {
                            const response = await fetch(getUserInformationUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ userId: userId }),
                            });

                            if (response.ok) {  
                                const data = await response.json();
                                console.log(data);
                                setUserInfo(data);
                            }else if (response.status == 404) {
                                setUserInfo({
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    phoneNumber: "",
                                    bio: ""
                                }); 
                            
                            } else {
                                console.error('Failed to fetch user info', response.statusText);
                            }
                        }   catch (error) {
                            console.error('Error fetching user info:', error);
                        }
                    } else {
                        console.error('User ID not found in token');
                    }
                }
            };




            const fetchAddressInfo = async () => {
                const token = getCookie('Authorization');
                if (token) {
                    const accessToken: any = jwtDecode(token);
                    const userId = accessToken.nameid;
                    if (userId) {
                        try {
                            const response = await fetch(getAddressInfoUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ userId: userId }),
                            });
                            if (response.ok) {
                                const data = await response.json();
                                console.log(data)
                                setAddressInfo(data);
                              } else if (response.status == 404) {
                                setAddressInfo({
                                  AddressLine1: "",
                                  AddressLine2: "",
                                  PostalCode: "",
                                  City: ""
                                });
                            } else {
                                console.error("Failed to fetch user address information:", response.statusText);
                              }
                            } catch (error) {
                              console.error("Error fetching user address information:", error);
                            }
                        };
                }
            };





            // const fetchAddressInfo = async () => {
            //     const token = getCookie('Authorization');
            //     if (token) {
            //         const accessToken: any = jwtDecode(token);
            //         const userId = accessToken.nameId;
            //         if (userId) {
            //             try {
            //                 const response = await fetch(getAddressInfoUrl, {
            //                     method: 'POST',
            //                     headers: {
            //                         'Content-Type': 'application/json',
            //                     },
            //                     body: JSON.stringify({ userId: userId }),
            //                 });
            //                 if (response.ok) {
            //                     const data = await response.json();
            //                     console.log(data)
            //                     setAddressInfo(data);
            //                 } else {
            //                     console.error('Failed to feth address info:', response.statusText);
            //                 }
            //             } catch (error) {
            //                 console.error('Error fetching addressinfo', error);
            //             }
            //         } else {
            //             console.error('User ID not found in token');
            //         }
            //     }
            // };

            fetchUserInfo();
            fetchAddressInfo();
        }, []);


        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setUserInfo((prev) => ({ ...prev, [name]: value }));
        };
    
        const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setAddressInfo((prev) => ({ ...prev, [name]: value }));
        };
    



        // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //     const { name, value } = e.target;
        // if (userInfo) {
        //   setUserInfo({ ...userInfo, [name]: value });
        // }
        // };

        // const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //     const { name, value } = e.target;
        //     if (addressInfo) {
        //       setAddressInfo({ ...addressInfo, [name]: value });
        //     }
        // };

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;

            if (form.className.includes('first-form')) {
                try {
                    const response = await fetch(updateUserInformationUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userInfo),
                    });
                    if (response.ok) {
                        console.log('User information updated successfully');
                    } else {
                        console.error('Failed to update user info:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error updating user info', error);
                }
            } else if (form.className.includes('second-form')) {
                try {
                    const response = await fetch(updateAddressUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(addressInfo),
                    });
                    if (response.ok) {
                        console.log('Address information updated sucessfully');
                    } else {
                        console.error('Failed to update address info:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error updating address info:', error);
                }
            }
        };
    
    

        return (
            <div className="container">
                <section id="account-details">
                    
                    {<AccountAside  />}
                    
                
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
                                value={userInfo.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="last">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleChange}
                            />
                            
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="phone">
                            <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={userInfo.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="bio">
                            <label htmlFor="biography">Biography (Optional)</label>
                            <textarea
                                name="bio"
                                value={userInfo.bio}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => console.log('Cancel')}>Cancel</button>
                    </form>
                    
                    <h5 className="address-info">Address info</h5>
                    <form className="second-form" onSubmit={handleSubmit}>

                    

                        <div className="first-address">
                            <label htmlFor="addressLine1">Address Line 1</label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={addressInfo.AddressLine1}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="second-address">
                            <label htmlFor="addressLine2">Address Line 2</label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={addressInfo.AddressLine2 || ''}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="postal">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={addressInfo.PostalCode}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="city">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                value={addressInfo.City}
                                onChange={handleAddressChange}
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
    };
    
    // export default UserComponent;