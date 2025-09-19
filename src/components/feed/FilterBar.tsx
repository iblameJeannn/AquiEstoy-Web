// components/feed/FilterBar.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  category?: string;
  urgency?: string;
  sortBy?: "newest" | "ending_soon" | "most_funded" | "least_funded";
  verified?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "salud", name: "Salud", color: "bg-red-500" },
    { id: "educacion", name: "Educación", color: "bg-blue-500" },
    { id: "emergencia", name: "Emergencia", color: "bg-orange-500" },
    { id: "comunidad", name: "Comunidad", color: "bg-green-500" },
    { id: "ambiente", name: "Medio Ambiente", color: "bg-emerald-500" },
  ];

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    if (value === "" || value === null) {
      delete newFilters[key];
    }
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
            Filtros
            {activeFilterCount > 0 && (
              <Badge variant="info" size="sm" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <select
            value={activeFilters.sortBy || ""}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Ordenar por</option>
            <option value="newest">Más recientes</option>
            <option value="ending_soon">Próximos a vencer</option>
            <option value="most_funded">Más financiados</option>
            <option value="least_funded">Menos financiados</option>
          </select>
        </div>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Quick Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              updateFilter(
                "category",
                activeFilters.category === category.id ? "" : category.id
              )
            }
            className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFilters.category === category.id
                ? "bg-blue-100 text-blue-800 ring-2 ring-blue-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${category.color}`} />
            {category.name}
          </button>
        ))}
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgencia
            </label>
            <select
              value={activeFilters.urgency || ""}
              onChange={(e) => updateFilter("urgency", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeFilters.verified || false}
                  onChange={(e) => updateFilter("verified", e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Solo verificados
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Progreso
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todos</option>
              <option value="0-25">0% - 25%</option>
              <option value="25-50">25% - 50%</option>
              <option value="50-75">50% - 75%</option>
              <option value="75-100">75% - 100%</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
