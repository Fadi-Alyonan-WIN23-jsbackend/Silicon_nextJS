"use client"
import { useEffect, useState } from "react";
import AccountAside from "../components/account/accountAside";
import { jwtDecode } from "jwt-decode";
interface Subscriber {
    email: string;
}
export default function accountNotification() {
  const [subscriber, setSubscriber] = useState<Subscriber>({ email: "" });
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ error: '', success: '' });

  const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
          const cookieValue = parts.pop()?.split(';').shift() || null;
          return cookieValue;
      }
      return null;
  };

  useEffect(() => {
      const fetchUserEmail = async () => {
          try {
              const token = getCookie('Authorization');
              if (token) {
                  const decodedToken: any = jwtDecode(token);
                  const email = decodedToken.email;
                  if (email) {
                      setSubscriber({ email });
                  } else {
                      setStatus({ ...status, error: 'Email not found in token' });
                  }
              } else {
                  setStatus({ ...status, error: 'Authorization token not found in cookies' });
              }
          } catch (error) {
              console.error('Error fetching user email:', error);
              setStatus({ ...status, error: 'Failed to fetch user email' });
          }
      };

      fetchUserEmail();
  }, []);

  useEffect(() => {
      const checkSubscriptionStatus = async () => {
          try {
              const response = await fetch('https://subscriptionprovider--silicon.azurewebsites.net/api/GetOneSubscriber?code=SmSwryfTOd5iF1-uTcfg-HD55X-_CBuF_eBlCdtA2fdFAzFuP-QtUw%3D%3D', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(subscriber),
              });
              if (response.status === 200) {
                  setIsSubscribed(true);
              } else if (response.status === 404) {
                  setIsSubscribed(false);
              }
          } catch (error) {
              console.error('Error fetching subscription status:', error);
              setStatus({ ...status, error: 'Failed to fetch subscription status' });
          }
      };

      if (subscriber.email) {
          checkSubscriptionStatus();
      }
  }, [subscriber]);

  const handleSubscriptionChange = async () => {
      setLoading(true);
      setStatus({ error: '', success: '' });
      try {
          const response = await fetch(isSubscribed ? 'https://subscriptionprovider--silicon.azurewebsites.net/api/Unsubscribe?code=EqJJ2sEFas7vYLtEAhTiKFPqQXZEbW-d5PZS-qQWEL82AzFufxQg2Q%3D%3D' : 'https://subscriptionprovider--silicon.azurewebsites.net/api/Subscribe?code=BgEqgXIDxWfxcRWTUirUYMNQHf4vDVDKemfB4dd9Ir9gAzFuxO_zmg%3D%3D', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: subscriber.email }),
          });
          if (response.ok) {
              setIsSubscribed(!isSubscribed);
              setStatus({ error: '', success: isSubscribed ? 'Successfully unsubscribed' : 'Successfully subscribed' });
          } else {
              setStatus({ error: 'Failed to update subscription', success: '' });
          }
      } catch (error) {
          console.error('Error updating subscription:', error);
          setStatus({ error: 'Failed to update subscription', success: '' });
      } finally {
          setLoading(false);
      }
  };
    return (
        <div className="container">
            <section id="account-notification">
                <AccountAside />
                <div className="details">
                    <h1 className="mb-4">Notifications</h1>
                    {status.error && (
                    <div className="alert alert-danger" role="alert">
                        {status.error}
                    </div>
                    )}
                    {status.success && (
                    <div className="alert alert-success" role="alert">
                        {status.success}
                    </div>
                    )}
                    <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubscriptionChange();
                    }}
                    >
                    <p>Preferred email for notifications</p>
                    <input
                        type="email"
                        value={subscriber.email}
                        readOnly
                        required
                    />
                    <div className="form-check form-switch mt-4">
                        <input
                        className="form-check-input p-2"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={isSubscribed === true}
                        onChange={handleSubscriptionChange}
                        disabled={loading}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            Subscribe to Newsletter
                        </label>
                    </div>
                    <div className="form-buttons mt-4">
                        <button id="save" className="btn-theme-s p-1" type="submit" disabled={loading}>
                        Save Changes
                        </button>
                        <button id="cancel" className="btn-gray p-1" type="button">
                        Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
    );
}
