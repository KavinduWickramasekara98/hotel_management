import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContexts";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
const SignOutButton = () => {
    const queryClient = useQueryClient();
     const { showToast } = useAppContext();
      const navigate = useNavigate();
      const mutation = useMutation(apiClient.logout, {
        onSuccess:async () => {
           await queryClient.invalidateQueries("validate-token");
          showToast({ message: "Sign out Success", type: "SUCCESS" });
          navigate("/");
          window.location.reload(); 
        },
        onError: (error: Error) => {
          showToast({ message: error.message, type: "ERROR" });
        },
      });
    // const history = useHistory();
    const signOut = () => {
       
         mutation.mutate();
    }
    return (
        <button  
        onClick={signOut}
        className="flex items-center text-tBase px-3 font-bold bg-slate-300 bg-opacity-50 hover:bg-yellow-400 rounded-lg ubuntu-family">
            Sign Out
        </button>
    )
}

export default SignOutButton;