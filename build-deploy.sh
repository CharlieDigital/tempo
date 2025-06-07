pnpm --filter app install
pnpm --filter app run build

firebase deploy --only hosting
