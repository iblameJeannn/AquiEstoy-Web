// app/feed/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/layout/SideBar";
import { Header } from "@/components/layout/Header";
import { FilterBar, FilterOptions } from "@/components/feed/FilterBar";
import { CaseCard } from "@/components/feed/CaseCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DonationCase } from "@/types/case";

// Mock data - En producción vendría de tu API
const mockCases: DonationCase[] = [
  {
    id: "1",
    title: "Ayuda para cirugía de corazón urgente",
    description:
      "María necesita una cirugía cardíaca urgente. Es una madre soltera de dos hijos que trabaja como empleada doméstica. Sin esta operación, su vida corre peligro.",
    category: "Salud",
    location: "Ciudad de México, MX",
    targetAmount: 50000,
    currentAmount: 15000,
    daysLeft: 15,
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"],
    beneficiaryName: "María González",
    verified: true,
    urgency: "high",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Reconstrucción de escuela dañada por sismo",
    description:
      'La escuela primaria "Benito Juárez" necesita reconstruir sus aulas después del sismo. 200 niños se han quedado sin lugar donde estudiar.',
    category: "Educación",
    location: "Puebla, MX",
    targetAmount: 75000,
    currentAmount: 45000,
    daysLeft: 30,
    images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400",
    ],
    beneficiaryName: "Escuela Benito Juárez",
    verified: true,
    urgency: "medium",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-19",
  },
  {
    id: "3",
    title: "Familia afectada por inundación necesita ayuda",
    description:
      "La familia Ramírez perdió su casa y todas sus pertenencias en las recientes inundaciones. Necesitan ayuda urgente para reconstruir su hogar.",
    category: "Emergencia",
    location: "Tabasco, MX",
    targetAmount: 30000,
    currentAmount: 8000,
    daysLeft: 45,
    images: ["https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400"],
    beneficiaryName: "Familia Ramírez",
    verified: false,
    urgency: "high",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-18",
  },
  {
    id: "4",
    title: "Centro comunitario para adultos mayores",
    description:
      "Construcción de un centro comunitario donde los adultos mayores puedan realizar actividades recreativas y recibir atención médica básica.",
    category: "Comunidad",
    location: "Guadalajara, MX",
    targetAmount: 100000,
    currentAmount: 65000,
    daysLeft: 60,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    ],
    beneficiaryName: "Asociación de Adultos Mayores",
    verified: true,
    urgency: "low",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-17",
  },
  {
    id: "5",
    title: "Reforestación de área natural protegida",
    description:
      "Proyecto para plantar 1000 árboles nativos en el área natural protegida después de los incendios forestales del año pasado.",
    category: "Medio Ambiente",
    location: "Michoacán, MX",
    targetAmount: 25000,
    currentAmount: 12000,
    daysLeft: 90,
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    ],
    beneficiaryName: "Fundación Verde México",
    verified: true,
    urgency: "medium",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
  },
  {
    id: "6",
    title: "Tratamiento de cáncer para niña de 8 años",
    description:
      "Sofía tiene 8 años y necesita quimioterapia urgente. Su familia no cuenta con seguro médico y los costos del tratamiento superan sus posibilidades.",
    category: "Salud",
    location: "Monterrey, MX",
    targetAmount: 80000,
    currentAmount: 25000,
    daysLeft: 20,
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
    ],
    beneficiaryName: "Sofía Mendoza",
    verified: true,
    urgency: "high",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-19",
  },
];

export default function FeedPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cases, setCases] = useState<DonationCase[]>(mockCases);
  const [filteredCases, setFilteredCases] = useState<DonationCase[]>(mockCases);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...cases];

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((c) =>
        c.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    // Filter by urgency
    if (filters.urgency) {
      filtered = filtered.filter((c) => c.urgency === filters.urgency);
    }

    // Filter by verified status
    if (filters.verified) {
      filtered = filtered.filter((c) => c.verified);
    }

    // Sort cases
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "newest":
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "ending_soon":
          filtered.sort((a, b) => a.daysLeft - b.daysLeft);
          break;
        case "most_funded":
          filtered.sort(
            (a, b) =>
              b.currentAmount / b.targetAmount -
              a.currentAmount / a.targetAmount
          );
          break;
        case "least_funded":
          filtered.sort(
            (a, b) =>
              a.currentAmount / a.targetAmount -
              b.currentAmount / b.targetAmount
          );
          break;
      }
    }

    setFilteredCases(filtered);
  };

  const handleDonate = (caseId: string) => {
    // Aquí implementarías la lógica de donación
    console.log("Donate to case:", caseId);
    // Redirigir a página de donación o abrir modal
  };

  const handleViewDetails = (caseId: string) => {
    // Aquí implementarías la navegación a detalles del caso
    console.log("View case details:", caseId);
    // Redirigir a página de detalles
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simular carga de más casos
    setTimeout(() => {
      // En producción, aquí cargarías más datos de la API
      setLoading(false);
    }, 1000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="lg:pl-64">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1">
            <FilterBar onFilterChange={handleFilterChange} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {cases.length}
                  </div>
                  <div className="text-sm text-gray-600">Casos Activos</div>
                </Card>
                <Card className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    $
                    {cases
                      .reduce((sum, c) => sum + c.currentAmount, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Recaudado</div>
                </Card>
                <Card className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {cases.filter((c) => c.verified).length}
                  </div>
                  <div className="text-sm text-gray-600">Casos Verificados</div>
                </Card>
                <Card className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {cases.filter((c) => c.urgency === "high").length}
                  </div>
                  <div className="text-sm text-gray-600">Casos Urgentes</div>
                </Card>
              </div>

              {/* Cases Grid */}
              {filteredCases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredCases.map((donationCase) => (
                    <CaseCard
                      key={donationCase.id}
                      case={donationCase}
                      onDonate={handleDonate}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <div className="text-gray-500 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8c0 1.508-.424 2.921-1.159 4.133"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron casos
                  </h3>
                  <p className="text-gray-500">
                    Intenta ajustar los filtros para ver más resultados
                  </p>
                </Card>
              )}

              {/* Load More */}
              {filteredCases.length > 0 && (
                <div className="text-center">
                  <Button
                    onClick={handleLoadMore}
                    loading={loading}
                    variant="outline"
                    size="lg"
                  >
                    Cargar más casos
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
