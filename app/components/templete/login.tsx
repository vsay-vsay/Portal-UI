import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LoginAnimation, LoginLogo } from "~/image";
import LoginForm from "../molecule/login/loginForm";

const AnimatedBackground = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  if (windowWidth === undefined) return null; 

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
          initial={{ x: Math.random() * windowWidth, y: Math.random() * window.innerHeight }}
          animate={{
            x: [Math.random() * windowWidth, Math.random() * windowWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          style={{ filter: "blur(50px)" }}
        />
      ))}
    </div>
  );
};


const LoginImage = () => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="hidden lg:block w-1/2 p-12"
  >
    <div className="relative h-full w-full">
      <motion.img
        src={LoginAnimation}
        alt="Login Animation"
        className="rounded-2xl object-cover w-full h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute rounded-2xl"/>
    </div>
  </motion.div>
);
const LoginTemplate: React.FC = () => {

const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300 relative ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <AnimatedBackground />
      
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>

      <div className="container max-w-6xl mx-auto">
        <div className="flex rounded-2xl overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 p-8 md:p-12"
          >
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <img src={LoginLogo} alt="" height={50} width={50} className=" mb-8"/>
                <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Welcome Back</h2>
                <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Please enter your details to sign in</p>
              </div>
              < LoginForm />
            </div>
          </motion.div>

          <LoginImage />
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
