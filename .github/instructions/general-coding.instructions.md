---
applyTo: "**"
---
# Project Overview
- We are building a work and task management app
- The key models are in the file models.ts

## Packages
- This application uses the following key packages:
  - Firestore
  - Vue
  - TypeScript
  - Pinia
  - Vue Router
  - Quasar Framework
  - dayjs
  - VueUse
  - nanoid

## Naming Conventions
- Use PascalCase for component names
- Use camelCase for variables, functions, and methods
- YOU MUST Use PascalCase for Quasar components like QList, QItem, etc.!!
- DO NOT use kebab-case for Quasar component names like q-list, q-item, etc.!!

## Commenting
- Add comments to explain logical decision
- Document all function inputs
- Be descriptive with function comments

## Structure
- /app contains the Vite Vue SPA
- /app/src is the root of the source tree
- /app/src/components contains the Vue components for this app
- /app/src/layouts contains the layout page
- /app/src/pages contains the pages (views)
- /app/src/router contains the SPA routes
- /app/src/services contains code for working with Firebase, repositories, and models
- /app/src/stores contains the Pinia stores for global state
- /app/src/utils contains utility files

## Key files
- /app/src/services/model.ts contains the main model of the application domain
- /_firebase/firestore.rules has rules for Firestore access
- /app/src/style.css has the global styles for the application
