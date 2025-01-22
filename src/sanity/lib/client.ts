import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl: process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}/studio` // Deployed environment
      : 'http://localhost:3000/studio', // Local development fallback
  },
});
