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

## Vue components
- We are u sing Vue SFC (Single File Components)
- Use the `<template>`, `<script setup lang="ts">`, and `<style scoped>` sections
- Use the latest Vue 3 features like `defineModel`
- When using `defineEmits`, follow the pattern:
  ```typescript
  const emit = defineEmits<{
    eventName1: [property1: type, property2: type] // Name tuple syntax
    eventName2: [] // No properties; just event
  }>();
  ```
- You can use abbreviated syntax for props on components when the name of the ref matches the prop:
  ```html
  <template>
    <MyComponent :prop1 :prop2 :prop3="otherProperty"/>
  </template>
  <script setup lang="ts">
    const prop1 = ref('') // Only when the name matches
    const prop2 = ref(0) // Only when the name matches
    const otherProperty = ref('') // This will be passed as prop3
  </script>
  ```
- We are using the Lexorank library for ranking and sorting items; when items change order, we need to compute a new Lexorank for the `rank` property
- Use the `rankSort` function from `app/src/utils/utility.ts` to sort

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
