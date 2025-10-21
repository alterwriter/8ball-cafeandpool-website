import { useEffect, useState } from 'react';
import { fetchHomeContent } from '../services/api.js';

export function useHomeContent() {
  const [data, setData] = useState({ hero: null, story: null, values: [], staffHighlights: [], services: [], menuSections: [], hours: [], contact: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetchHomeContent()
      .then((response) => {
        if (!ignore) {
          setData(response);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) {
          setError('Gagal memuat konten.');
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { data, loading, error };
}
