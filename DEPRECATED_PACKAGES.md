# Deprecated Package Documentation

This document tracks deprecated packages that cannot be directly updated because they are dependencies of other packages.

## Deprecated Packages (as of 2025-07-19)

### 1. rimraf (v3.0.2)

- **Used by**: eslint@8.57.1 → file-entry-cache → flat-cache
- **Reason**: Deprecated in favor of Node.js built-in `fs.rm()` and `fs.rmSync()`
- **Action**: Will be resolved when ESLint v9 is adopted (breaking changes prevent immediate upgrade)

### 2. glob@7.2.3

- **Used by**:
  - eslint@8.57.1 (via rimraf)
  - jest@29.7.0 (multiple paths)
- **Reason**: Deprecated in favor of glob@11 which we have as a direct dependency
- **Action**: Will be resolved when Jest v30 and ESLint v9 are adopted

### 3. inflight

- **Used by**: glob@7.2.3
- **Reason**: Deprecated, no longer maintained
- **Action**: Transitive dependency, will be resolved with glob@7 update

### 4. @humanwhocodes/config-array and @humanwhocodes/object-schema

- **Used by**: eslint@8.57.1
- **Reason**: Moving to a new package structure
- **Action**: Will be resolved with ESLint v9 upgrade

### 5. node-domexception

- **Used by**: web-streams-polyfill (transitive)
- **Reason**: Deprecated in favor of native DOMException
- **Action**: Transitive dependency, minimal impact

### 6. three-mesh-bvh

- **Used by**: @react-three/drei@9.122.0
- **Reason**: Package restructuring
- **Action**: Will be resolved when upgrading @react-three/drei to v10+

## Migration Plan

1. **ESLint v8 → v9**: Major breaking changes require careful migration
   - Update TypeScript ESLint plugins
   - Migrate configuration format
   - Test all linting rules

2. **Jest v29 → v30**: Breaking changes in configuration
   - Update test configuration
   - Verify all tests pass

3. **Three.js ecosystem**: Coordinate updates
   - Update three, @react-three/fiber, and @react-three/drei together
   - Test 3D components thoroughly

## Notes

- These deprecation warnings don't affect functionality
- They are npm warnings, not errors
- Updates will be performed when major version upgrades are stable and tested
