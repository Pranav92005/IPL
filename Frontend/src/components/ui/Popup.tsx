import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPL } from "@/pages/home";

const SignupSuccessPopup = ({ team,name ,email}:{team:string,name:string,email:string}) => {
    const [showPopup, setShowPopup] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false);
            const teamcode=IPL.find((t) => t.name === team)?.code;
            navigate(`/home?team=${teamcode}&name=${name}&email=${email}`);
        }, 4000); // Show popup for 3 seconds

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [navigate, team, name]);

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <img src={`${team}.png`} alt={`${team} logo`} className="w-24 mx-auto mb-4" />
                <h2 className="text-xl font-bold"> {name},Welcome to {team} Fan Club!</h2>
                <p className="mt-2 text-gray-700">We are glad to have you onboard!</p>
            </div>
        </div>
    );
};

export default SignupSuccessPopup;
