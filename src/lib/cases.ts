// lib/cases.ts
import { DonationCase } from "@/types/case";
import { authService } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

class CaseService {
  async getCases(params?: {
    category?: string;
    urgency?: string;
    verified?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<DonationCase[]> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE_URL}/cases?${queryParams}`, {
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Error al obtener casos");
    }

    return response.json();
  }

  async getCaseById(id: string): Promise<DonationCase> {
    const response = await fetch(`${API_BASE_URL}/cases/${id}`, {
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Error al obtener el caso");
    }

    return response.json();
  }

  async createDonation(caseId: string, amount: number, message?: string) {
    const response = await fetch(`${API_BASE_URL}/donations`, {
      method: "POST",
      headers: authService.getAuthHeaders(),
      body: JSON.stringify({
        caseId,
        amount,
        message,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al procesar la donación");
    }

    return response.json();
  }

  async toggleFavorite(caseId: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/cases/${caseId}/favorite`, {
      method: "POST",
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar favoritos");
    }

    const data = await response.json();
    return data.isFavorite;
  }
}

export const caseService = new CaseService();
