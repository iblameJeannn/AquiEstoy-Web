// components/auth/RegisterForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/hooks/useAuth";
import { RegisterCredentials } from "@/types/auth";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { register: registerUser, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterCredentials>();

  const password = watch("password");

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      await registerUser(data);
      router.push("/dashboard");
    } catch (err) {
      // Error handled by useAuth hook
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
        <p className="mt-2 text-gray-600">
          Únete a nuestra comunidad de donadores
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Nombre (s)"
            placeholder="Juan"
            {...register("firstName", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 2,
                message: "Mínimo 2 caracteres",
              },
            })}
            error={errors.firstName?.message}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Apellido Paterno"
            placeholder="Pérez"
            {...register("lastName", {
              required: "El apellido paterno es obligatorio",
              minLength: {
                value: 2,
                message: "Mínimo 2 caracteres",
              },
            })}
            error={errors.lastName?.message}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />

          <Input
            label="Apellido Materno"
            placeholder="Pérez"
            {...register("lastName", {
              required: "El apellido materno es obligatorio",
              minLength: {
                value: 2,
                message: "Mínimo 2 caracteres",
              },
            })}
            error={errors.lastName?.message}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            }
          />
        </div>

        <Input
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Ingresa un correo válido",
            },
          })}
          error={errors.email?.message}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          }
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: "Debe contener mayúsculas, minúsculas y números",
            },
          })}
          error={errors.password?.message}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
        />

        <Input
          label="Confirmar contraseña"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "Confirma tu contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
          error={errors.confirmPassword?.message}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
        />

        <Checkbox
          {...register("acceptTerms", {
            required: "Debes aceptar los términos y condiciones",
          })}
          error={errors.acceptTerms?.message}
          label={
            <span>
              Acepto los{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500"
              >
                política de privacidad
              </Link>
            </span>
          }
        />

        <Button type="submit" loading={loading} className="w-full" size="lg">
          Crear Cuenta
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
