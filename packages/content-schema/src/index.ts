import { z } from "zod";

export const portfolioProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  status: z.enum(["draft", "published"])
});

export type PortfolioProject = z.infer<typeof portfolioProjectSchema>;
