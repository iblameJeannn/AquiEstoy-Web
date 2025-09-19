// components/feed/CaseCard.tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";
import { DonationCase } from "@/types/case";

interface CaseCardProps {
  case: DonationCase;
  onDonate: (caseId: string) => void;
  onViewDetails: (caseId: string) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  case: donationCase,
  onDonate,
  onViewDetails,
}) => {
  const urgencyColors = {
    low: "success",
    medium: "warning",
    high: "danger",
  } as const;

  const categoryColors = {
    Salud: "bg-red-500",
    Educación: "bg-blue-500",
    Emergencia: "bg-orange-500",
    Comunidad: "bg-green-500",
    "Medio Ambiente": "bg-emerald-500",
  } as const;

  return (
    <Card
      variant="elevated"
      className="hover:shadow-xl transition-all duration-300 group"
    >
      {/* Header Image */}
      <div className="relative -m-4 mb-4 h-48 overflow-hidden rounded-t-lg">
        <img
          src={donationCase.images[0] || "/placeholder-case.jpg"}
          alt={donationCase.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={urgencyColors[donationCase.urgency]} size="sm">
            {donationCase.urgency === "high"
              ? "Urgente"
              : donationCase.urgency === "medium"
              ? "Moderado"
              : "Normal"}
          </Badge>
          {donationCase.verified && (
            <Badge variant="success" size="sm">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verificado
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <div
            className={`w-3 h-3 rounded-full ${
              categoryColors[
                donationCase.category as keyof typeof categoryColors
              ] || "bg-gray-500"
            }`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Category and Location */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            {donationCase.category}
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {donationCase.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
          {donationCase.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {donationCase.description}
        </p>

        {/* Beneficiary */}
        <div className="flex items-center space-x-2">
          <Avatar size="sm" alt={donationCase.beneficiaryName} />
          <span className="text-sm text-gray-700">
            {donationCase.beneficiaryName}
          </span>
        </div>

        {/* Progress */}
        <ProgressBar
          value={donationCase.currentAmount}
          max={donationCase.targetAmount}
          showPercentage
          color={donationCase.urgency === "high" ? "red" : "blue"}
        />

        {/* Days Left */}
        <div className="flex items-center text-sm text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {donationCase.daysLeft > 0
            ? `${donationCase.daysLeft} días restantes`
            : "Campaña finalizada"}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onDonate(donationCase.id)}
            className="flex-1"
            disabled={donationCase.daysLeft <= 0}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Donar
          </Button>
          <Button
            variant="outline"
            onClick={() => onViewDetails(donationCase.id)}
            className="px-3"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  );
};
