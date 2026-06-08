import type { Language } from "@prisma/client";

export type AdminConfigurationColumn = {
  id: number;
  webname: string;
  language: Language;
  tagline: string | null;
  website: string | null;
  email: string | null;
  description: string | null;
  address: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  date: Date;
};

export type AdminConfigurationFormData = AdminConfigurationColumn | null;

