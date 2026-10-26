import { useMemo } from 'react';
import { services, getServiceBySlug } from '../services';

export function useServices() {
  return useMemo(() => services, []);
}

export function useFeaturedServices() {
  return useMemo(() => services.filter((s) => s.featured), []);
}

export function useService(slug) {
  return useMemo(() => getServiceBySlug(slug), [slug]);
}
