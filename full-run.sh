set -e

cd frontend && pnpm run build

docker compose down -v

docker compose up -d --build