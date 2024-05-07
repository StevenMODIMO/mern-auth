import { useAuth } from "../context/AuthContext";
//import { motion, AnimatePresence } from "framer-motion"
import { FaTimes } from "react-icons/fa6"

export default function Modal() {
    const { user } = useAuth()
  return (
    <main className="absolute top-0 left-0 bg-black/25 flex justify-center items-center w-full h-full">
        <div>
            <header><FaTimes /></header>
        <section className="bg-black/80 h-[60%] w-[60%] flex  rounded-xl shadow-2xl shadow-black/25 flex-col items-center justify-center gap-4">
            <h1 className="text-white font-bold text-2xl">Email: {user?.email}</h1>
            <p className="text-white font-bold text-xl">UserID: {user?.id}</p>
            <button className="text-white mx-auto bg-red-800 rounded p-1">Delete Account</button>
        </section>
        </div>
    </main>
  );
}
