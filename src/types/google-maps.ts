// Google Maps TypeScript type definitions
// This provides type safety for Google Maps API using @types/google.maps

/// <reference types="google.maps" />

// Type-safe Google Maps instances
export type GoogleMap = google.maps.Map;
export type GoogleMarker = google.maps.Marker;
export type GoogleInfoWindow = google.maps.InfoWindow;
export type GoogleLatLngBounds = google.maps.LatLngBounds;
export type GoogleLatLng = google.maps.LatLng;

// Event handler types
export type MarkerClickHandler = () => void;
export type MapEventHandler = (event: google.maps.MapMouseEvent) => void;

// Script loading states
export type GoogleMapsLoadState = 'loading' | 'loaded' | 'error';

// Google Places API types
export interface PlacesService {
  getDetails: (
    request: google.maps.places.PlaceDetailsRequest,
    callback: (
      result: google.maps.places.PlaceResult | null,
      status: google.maps.places.PlacesServiceStatus
    ) => void
  ) => void;
}

// Google My Business types
export interface GoogleMyBusinessData {
  placeId: string;
  name: string;
  rating?: number;
  reviewCount?: number;
  photos?: google.maps.places.PlacePhoto[];
  reviews?: google.maps.places.PlaceReview[];
  openingHours?: google.maps.places.OpeningHours;
}

// A/B Testing types
export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
}

export interface ABTestConfig {
  testId: string;
  variants: ABTestVariant[];
  defaultVariant: string;
  isActive: boolean;
}

export interface ABTestContent {
  [key: string]: string | string[] | number | boolean;
}

export interface ABTestHook {
  variant: string | null;
  isLoading: boolean;
  trackEvent: (eventName: string, value?: number, metadata?: Record<string, unknown>) => void;
}

export interface ABTestContentHook {
  content: ABTestContent;
  variant: string | null;
  trackEvent: (eventName: string, value?: number, metadata?: Record<string, unknown>) => void;
}

// Form event types
export type FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type ButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type TextareaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

// Script loading types
export type ScriptLoadHandler = () => void;
export type ScriptErrorHandler = () => void;
