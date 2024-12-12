const SignOutButton = () => {
    // const {setIsLoggedIn} = useAppContext();
    // const history = useHistory();
    // const signOut = () => {
    //     localStorage.removeItem("token");
    //     setIsLoggedIn(false
    //     );
    //     history.push("/sign-in");
    // }
    return (
        <button  className="flex items-center text-tBase px-3 font-bold bg-slate-300 bg-opacity-50 hover:bg-yellow-400 rounded-lg ubuntu-family">
            Sign Out
        </button>
    )
}

export default SignOutButton;