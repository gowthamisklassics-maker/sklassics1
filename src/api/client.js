const API_BASE = import.meta.env.VITE_API_BASE || 'https://easyfindtrip.com/api/v1';

async function get(path, params) {
  const url = new URL(API_BASE + path);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
    });
  }
  const res = await fetch(url.toString(), { method: 'GET' });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export const api = {
  listCourses: (params) => get('/courses', params),
  getCourse: (slug) => get(`/courses/${slug}`),
  recCourses: (slug, k=3) => get(`/courses/${slug}/recommendations`, { k }),

  listWorkshops: (params) => get('/workshops', params),
  getWorkshop: (slug) => get(`/workshops/${slug}`),
  recWorkshops: (slug, k=3) => get(`/workshops/${slug}/recommendations`, { k }),

  listOffers: (params) => get('/offers', params),
};
