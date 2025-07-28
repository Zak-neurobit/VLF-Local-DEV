# TypeScript `any` Type Fixes Summary

## Files Updated

### 1. `/src/types/pdf-parse.d.ts`
- **Fixed**: `_metadata?: any` → `_metadata?: Record<string, unknown>`
- **Fixed**: `metadata?: any` → `metadata?: Record<string, unknown>`
- **Fixed**: `pagerender?: (pageData: any) => Promise<string>` → Added proper `PDFPageData` interface with typed pageData parameter

### 2. `/src/types/next-extensions.d.ts`
- **Fixed**: `thisArg?: any` → `thisArg?: unknown`
- **Fixed**: `info: any` → `info: Record<string, unknown>`
- **Fixed**: `metadata: any` → `metadata: Record<string, unknown>`
- **Fixed**: `options?: any` → Added proper `PDFParseOptions` interface
- **Fixed**: `ComponentType<any>` → `ComponentType<unknown>`

### 3. `/src/types/jsonwebtoken.d.ts`
- **Fixed**: `[key: string]: any` → `[key: string]: string | number | boolean | string[] | undefined`
- **Fixed**: `{ [key: string]: any }` → `JwtPayload` (reused existing interface)

### 4. `/src/types/gtag.d.ts`
- **Fixed**: All index signatures `[key: string]: any` → `[key: string]: string | string[] | number | boolean | undefined`
  - In `fbq` params
  - In `ConfigParams`
  - In `EventParams`

### 5. `/src/app/sitemap-es.xml/route.ts`
- **Fixed**: `const spanishPages: any[]` → `const spanishPages: DiscoveredPage[]`
- **Added**: Import for `DiscoveredPage` type from page-discovery module

### 6. `/src/app/sitemap-pages.xml/route.ts`
- **Fixed**: `const staticPages: any[]` → `const staticPages: DiscoveredPage[]`
- **Added**: Import for `DiscoveredPage` type from page-discovery module

### 7. `/src/app/calculators/page.tsx`
- **Fixed**: `useState<any>(null)` → `useState<CalculatorResult | null>(null)`
- **Fixed**: `handleResultGenerated = (result: any)` → `handleResultGenerated = (result: CalculatorResult)`
- **Added**: Proper `CalculatorResult` interface definition

### 8. `/src/components/calculators/calculator-results.tsx`
- **Fixed**: `result: any` → `result: CalculatorResult`
- **Added**: Proper `CalculatorResult` interface definition

### 9. `/src/components/calculators/calculator-form.tsx`
- **Updated**: `CalculatorResult` interface to match the actual data structure
- **Fixed**: `await response.json()` → Added proper type annotation for the response

## Type Safety Improvements

1. **Record<string, unknown>**: Used for objects with unknown structure but known that they are objects
2. **Union Types**: Used specific union types for index signatures (e.g., `string | number | boolean | string[] | undefined`)
3. **Proper Interfaces**: Created specific interfaces for complex types (PDFPageData, PDFParseOptions, CalculatorResult)
4. **Type Imports**: Added proper type imports where needed
5. **Type Narrowing**: Used more specific types instead of generic `any`

## Benefits

- ✅ Improved type safety across the codebase
- ✅ Better IntelliSense and autocomplete support
- ✅ Catches potential runtime errors at compile time
- ✅ Makes the code more maintainable and self-documenting
- ✅ Follows TypeScript best practices (no `any` types)