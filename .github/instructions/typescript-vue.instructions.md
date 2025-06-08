---
applyTo: "**/*.ts,**/*.vue"
---
# Project Standards for TypeScript and Vue
- This application is built with Vue, Pinia, and Vue Router

## Data Model
- Our main data model contains the following entities:
  - Entity: a base type that provides common properties
  - Invite: a placeholder created to invite a new team member
  - Profile: a profile of a user
  - Workspace: represents a project or Workspace
  - Milestone: a milestone that describes a specific project objective
  - Task: a work item assigned to a user in the scope of a workspace.
    - A task can be associated to a milestone by reference
  - TimelineEvent: an event that is recorded as history

## Firestore Best Practices
- DO NOT nest models and documents; use the `Ref` to point to them instead
- We will load the UI by the `workspaceUid` so tag different entities with it to link them together
- Use a Repository from  app/src/services/Repository.ts to access records for the type
- Some entities we want to store in standalone collections
- Other entities are embedded in the parent entity

## Vue Best Practices
- Use composables to separate logic from presentation
- Prefer local styles when applicable
- This project uses the script setup convention for Vue components
- Component names should be in PascalCase for Quasar components like QList, QItem, etc.

## Component Usage
- We are using the Quasar component library
- Use PascalCase for component names
- Use defineModel for v-model
