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
            {...register("firstName", { required: "First Name is required" })}
          />
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
          />
        </label>

      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
          email
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="email"
            {...register("email", { required: "email is required" })}
          />
        </label>
      <label className="text-gray-700 text-sm font-bold">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
        />  
      </label>
      <button type="submit">Register</button>
    </form>
  );
    };
    export default Register;
