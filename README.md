# Dapper - Pack Opening Prototype

Interactive 3D pack opening experience built with Next.js and React Three Fiber.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Design Decisions

- **React Three Fiber**: Declarative 3D scene management with React component patterns
- **Dynamic Imports**: Code-split 3D components to reduce initial bundle by ~500KB
- **Modular Architecture**: Self-contained scenes for easy integration and testing

## Technical Challenges

- **3D Library Integration**: Extended Three.js with custom line rendering libraries (three-fatline, threejs-meshline) for particle effects
- **Performance Balance**: Optimized visual quality vs frame rate through selective post-processing
- **State Coordination**: Synchronized animations between 2D UI overlays and 3D scene elements

## Performance Optimization Strategy

1. **Load Management**

   - Lazy load 3D libraries only when user initiates pack opening
   - Implement progressive enhancement for low-end devices

2. **Production Considerations**
   - **Asset Delivery**: Host 3D assets on CDN with aggressive caching
   - **Mobile Performance**: Detect device capabilities and adjust quality settings
   - **Bundle Size**: Use tree-shaking and dynamic imports to minimize impact
