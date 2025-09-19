// hooks/useCases.ts
import { useState, useEffect } from "react";
import { DonationCase } from "@/types/case";
import { caseService } from "@/lib/cases";

export const useCases = () => {
  const [cases, setCases] = useState<DonationCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await caseService.getCases();
      setCases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar casos");
    } finally {
      setLoading(false);
    }
  };

  const refreshCases = () => {
    fetchCases();
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return {
    cases,
    loading,
    error,
    refreshCases,
    setCases,
  };
};
