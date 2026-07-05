FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build-env
WORKDIR /src/.
COPY . .

WORKDIR /src/backend
RUN dotnet publish backend.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY --from=build-env /app/publish .

ENTRYPOINT ["dotnet", "backend.dll"]