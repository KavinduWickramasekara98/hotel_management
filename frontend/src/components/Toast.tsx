import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
};

const Toast = ({ message, type,onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);
    const styles = 
      type === "SUCCESS"
       ? "fixed bg-green-500 text-white p-3 rounded-md top-3 right-3 z-50 max-w-md"
      
        :"bg-red-500 fixed text-white p-3 rounded-md top-3 right-3 z-50 max-w-md"
    ;
    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">
                    {message}
                </span>
            </div>
        </div>
    );
}
export default Toast;