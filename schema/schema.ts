import { z } from "zod"

export const userGithubData = z.object({
  projectName: z.string(),
  repoUrl: z.string(),
  githubToken: z.string().optional(),
})
