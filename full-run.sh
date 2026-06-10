set -e

cd frontend && pnpm run build

cd ../backend && dotnet run