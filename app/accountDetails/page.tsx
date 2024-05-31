"use client"
import { useState, useEffect } from "react";
import AccountAside from '@/app/components/account/accountAside'
import { jwtDecode } from "jwt-decode";
import { Props } from "@/app/interfaces/accountTyps";


interface UserInfo {
    UserId: string,
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Bio: string;
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
        const [error, setError] = useState<string>("")
        const [userInfo, setUserInfo] = useState<UserInfo>({ 
            UserId: '',
            FirstName: '', 
            LastName: '', 
            Email: '', 
            PhoneNumber: '', 
            Bio: '' 
        });

        const [addressInfo, setAddressInfo] = useState<AddressInfo>({ 
            AddressLine1: '', 
            AddressLine2: '', 
            PostalCode: '', 
            City: '' 
        });

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
                                console.log(data)
                                setUserInfo(data);
                            }else if (response.status == 404) {
                                setUserInfo({
                                    UserId: userId,
                                    FirstName: "",
                                    LastName: "",
                                    Email: "",
                                    PhoneNumber: "",
                                    Bio: ""
                                }); 
                            
                            } else {
                                console.error('Failed to fetch user info', response.statusText);
                            }
                        }   catch (error) {
                            console.error('Error fetching user info:', error);
                        }
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
                        }
                    }
                };


                fetchUserInfo();
                fetchAddressInfo();
            }, []);


        


        const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
          setUserInfo({ ...userInfo, [name]: value });
        };


        const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
              setAddressInfo({ ...addressInfo, [name]: value });
        };


        const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const token = getCookie('Authorization');
            if (token){
                const accessToken: any = jwtDecode(token);
                const userId = accessToken.nameid;

                try {
                    const res = await fetch(updateUserInformationUrl, {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            UserId: userId,
                            FirstName: userInfo.FirstName,
                            LastName: userInfo.LastName,
                            Email: userInfo.Email,
                            PhoneNumber: userInfo.PhoneNumber,
                            Biography: userInfo.Bio})
                    });
                    if(res.status === 200) {
                        const result = await res.json();
                        setUserInfo(result)
                    } else {
                        setError('Something went wrong. Try again later')
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setError('Something went wrong. Try again later')
                }
            }
            
            
        }

        const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const res = await fetch(updateAddressUrl, {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(addressInfo)
                });
                if(res.status === 200) {
                    const result = await res.json();
                    setAddressInfo(result)
                } else {
                    
                    setError('Something went wrong. Try again later');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Something went wrong. Try again later')
            }
        }
    

        return (
            <div className="container">
                <section id="account-details">
                    
                    {<AccountAside  />}
                    
                
                    <div className="account-details-forms">
                    <form className="first-form" onSubmit={handleUserSubmit}>
                    <div className="account-titles">
                        <h2 className="account-title">Account Details</h2>
                        <h5 className="subtitle">Account info</h5>
                    </div>
                        <div className="first">
                            <label htmlFor="FirstName">First Name</label>
                            <input 
                                type="text"
                                name="FirstName"
                                value={userInfo.FirstName}
                                onChange={handleUserChange}
                            />
                        </div>
                        <div className="last">
                            <label htmlFor="LastName">Last Name</label>
                            <input
                                type="text"
                                name="LastName"
                                value={userInfo.LastName}
                                onChange={handleUserChange}
                            />
                            
                        </div>
                        <div className="email">
                            <label htmlFor="Email">Email</label>
                            <input
                                type="email"
                                name="Email"
                                value={userInfo.Email}
                                onChange={handleUserChange}
                            />
                        </div>
                        <div className="phone">
                            <label htmlFor="PhoneNumber">Phone Number (Optional)</label>
                            <input
                                type="text"
                                name="PhoneNumber"
                                value={userInfo.PhoneNumber}
                                onChange={handleUserChange}
                            />
                        </div>
                        <div className="bio">
                            <label htmlFor="Bio">Biography (Optional)</label>
                            <textarea
                                name="Bio"
                                value={userInfo.Bio}
                                onChange={handleUserChange}
                            ></textarea>
                        </div>
                        <div className="from-buttons1">
                            <button id="save1" className="btn-theme-s" type="submit">Save Changes</button>
                            <button id="cancel1" className="cancel1" type="button" onClick={() => console.log('Cancel')}>Cancel</button>
                        </div>
                    </form>
                    
                    <h5 className="address-info">Address info</h5>
                    <form className="second-form" onSubmit={handleAddressSubmit}>

                        <div className="first-address">
                            <label htmlFor="AddressLine1">Address Line 1</label>
                            <input
                                type="text"
                                name="AddressLine1"
                                value={addressInfo.AddressLine1}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="second-address">
                            <label htmlFor="AddressLine2">Address Line 2</label>
                            <input
                                type="text"
                                name="AddressLine2"
                                value={addressInfo.AddressLine2}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="postal">
                            <label htmlFor="PostalCode">Postal Code</label>
                            <input
                                type="text"
                                name="PostalCode"
                                value={addressInfo.PostalCode}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="city">
                            <label htmlFor="City">City</label>
                            <input
                                type="text"
                                name="City"
                                value={addressInfo.City}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="form-buttons2">
                            <button id="save2" className="btn-theme-s" type="submit">Save Changes</button>
                            <button id="cancel2" className="cancel2" type="button" onClick={() => console.log('Cancel')}>Cancel</button>
                        </div>
                    </form>
                    </div>
                    
                </section>
            </div>
        );
    };