// components/auth/AuthLayout.tsx
"use client";

import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Left side - Image and branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white h-full w-full">
          <div className="max-w-md  w-full text-center">
            <div className="mb-8">
              <Image
                src="/logo.png" // Cambia esto por la ruta de tu imagen
                alt="Logo"
                width={160}
                height={160}
                className="object-cover mx-auto mb-4"
              />
              <p className="text-xl opacity-90">
                Conectando corazones generosos
              </p>
            </div>

            <blockquote className="text-lg italic mb-6">
              "Cada donación es una semilla de esperanza que florece en vidas
              transformadas"
            </blockquote>

            <div className="flex items-center justify-center space-x-8 text-sm opacity-75">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div>Donadores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$2M+</div>
                <div>Recaudado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div>Proyectos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
