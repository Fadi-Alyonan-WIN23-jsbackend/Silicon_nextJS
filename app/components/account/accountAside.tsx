import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInfo {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
}
export default function AccountAside() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo>({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
    });

    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || null;
        }
        return null;
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = getCookie('Authorization');
            if (token) {
                const accessToken: any = jwtDecode(token);
                const userId = accessToken.nameid;
                if (userId) {
                    try {
                        const response = await fetch(`https://accountprovider--silicon.azurewebsites.net/api/GetUserInformation?code=aNTtpYLpi-kJwhT7UwxIh3Bg-d_wgAl7i9ZwkTB93ca9AzFucxov5g%3D%3D`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userId: userId }),
                        });
                        if (response.ok) {
                            const data = await response.json();
                            setUserInfo(data);
                        } else {
                            console.error('Failed to fetch user info:', response.statusText);
                        }
                    } catch (error) {
                        console.error('Error fetching user info:', error);
                    }
                } else {
                    console.error('User ID not found in token');
                }
            }
        };

        fetchUserInfo();
    }, []);
    const handleSignOut = () => {
        document.cookie = 'Authorization=; Max-Age=0; path=/; secure; sameSite=strict';
        router.push('/auth/signIn');
    };
    return (
        <aside className="aside">
            <div className="profileinfo">
                <img src="/images/profile_image.svg" alt="Profile" />
                <h5 className="profileinfo-h5">{userInfo.FirstName} {userInfo.LastName}</h5>
                <p className="profileinfo-p">{userInfo.Email}</p>
                <p className="profileinfo-p">{userInfo.PhoneNumber}</p>
            </div>
            <nav className="asideNav">
                <a className="btn-transparent aktive" href="/accountDetails"><i className="fa-regular fa-right-from-bracket"></i>Account Details</a>
                <a className="btn-transparent" href="/accountNotification"><i className="fa-regular fa-right-to-bracket"></i>Notification</a>
                <a className="btn-transparent" onClick={handleSignOut}><i className="fa-regular fa-right-to-bracket"></i>Sign Out</a>

            </nav>
        </aside>
    );
}
  