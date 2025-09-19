// components/feed/DonationModal.tsx
"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { DonationCase } from "@/types/case";
import { caseService } from "@/lib/cases";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  case: DonationCase | null;
  onSuccess: (amount: number) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  case: donationCase,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predefinedAmounts = [100, 250, 500, 1000, 2500];

  const handleDonate = async () => {
    if (!donationCase || !amount) return;

    const donationAmount = parseFloat(amount);
    if (donationAmount <= 0) {
      setError("El monto debe ser mayor a 0");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await caseService.createDonation(
        donationCase.id,
        donationAmount,
        message
      );
      onSuccess(donationAmount);
      onClose();
      setAmount("");
      setMessage("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar la donación"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setMessage("");
    setError(null);
    onClose();
  };

  if (!donationCase) return null;

  const remaining = donationCase.targetAmount - donationCase.currentAmount;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Hacer Donación</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Case Info */}
        <Card className="mb-6">
          <div className="flex items-start space-x-4">
            <img
              src={donationCase.images[0]}
              alt={donationCase.title}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {donationCase.title}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <Avatar size="sm" alt={donationCase.beneficiaryName} />
                <span className="text-sm text-gray-600">
                  {donationCase.beneficiaryName}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  ${donationCase.currentAmount.toLocaleString()} de $
                  {donationCase.targetAmount.toLocaleString()}
                </span>
                <span className="text-blue-600 font-medium">
                  {Math.round(
                    (donationCase.currentAmount / donationCase.targetAmount) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Amount Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Monto a donar
          </label>

          {/* Predefined amounts */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {predefinedAmounts.map((preAmount) => (
              <button
                key={preAmount}
                onClick={() => setAmount(preAmount.toString())}
                className={cn(
                  "p-3 text-center border rounded-lg font-medium transition-all",
                  amount === preAmount.toString()
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                )}
              >
                ${preAmount}
              </button>
            ))}
          </div>

          <Input
            type="number"
            placeholder="Monto personalizado"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            }
          />

          {amount && parseFloat(amount) > remaining && (
            <p className="mt-2 text-sm text-orange-600">
              ⚠️ Tu donación excede el monto restante de $
              {remaining.toLocaleString()}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje de apoyo (opcional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Envía un mensaje de aliento al beneficiario..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {message.length}/500 caracteres
          </p>
        </div>

        {/* Payment Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium text-blue-800">
              Transacción Segura
            </span>
          </div>
          <p className="text-sm text-blue-700">
            Tu donación será procesada de forma segura. Recibirás una
            confirmación por email.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDonate}
            loading={loading}
            className="flex-1"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Donar ${amount ? parseFloat(amount).toLocaleString() : "0"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
