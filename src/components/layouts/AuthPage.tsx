"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm, RegisterForm } from "../context/auth/auth.main";
import { useAuthformContext } from "../providers/AuthformProvider";

const AuthPage = () => {
  const { formType } = useAuthformContext();

  return (
    <>
      <AnimatePresence mode="wait">
        {formType === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <LoginForm />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <RegisterForm />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthPage;
