import { useState } from "react";
import { Form } from "react-hook-form";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleSignIn = async () => {
        try {
            const {data} = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
        localStorage.setItem('token', data.token);
        } catch (error) {
        console.error(error);
        }
    };
    
    return (
       <Form>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={handleSignIn}>
                Sign In
              </button>
        </Form>
    );
    };
