
import { useForm } from "react-hook-form";
export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn: React.FC = () => {
    const { register, formState: { errors } } = useForm<SignInFormData>();
    
    const handleSignIn = async () => {
        try {
            // const response = await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email, password }),
            // });
           // const data = await response.json();
        //localStorage.setItem('token', data.token);
        } catch (error) {
        console.error(error);
        }
    };
    
    return (
      <form className="flex flex-col gap-5" onSubmit={handleSignIn}>
        <h2 className="text-3xl font-bold">Sign In</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
          email
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="email"
            {...register("email", { required: "email is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold">
          Password
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </label>
        <button className="bg-bgPrimary text-tBase p-2 font-bold hover:bg-yellow-200 text-xl" type="submit">
          Sign In</button>
      </form>
    );
    };
export default SignIn;