import {useForm} from "react-hook-form";

type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    };
const Register = () => {
  const {register} = useForm<RegisterFormData>();
  return (
    <form
      className="flex flex-col gap=5"
      onSubmit={async (e) => {
        e.preventDefault();
        // const response = await registerUser({
        //   variables: {
        //     email: "   ", // invalid email
        //     password: "123456",
        //     },
        // });
        //console.log(response);
      }}
    >
      <h1 className="text-3xl font-bold">Register</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("firstName")}
          />
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("lastName")}
          />
        </label>
      </div>
      <label>Email</label>
      <input type="email" />
      <label>Password</label>
      <input type="password" />
      <button type="submit">Register</button>
    </form>
  );
    };
    export default Register;
