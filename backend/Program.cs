using backend.Endpoints;
using HowlDev.Web.Authentication.AccountAuth;
using HowlDev.Web.Authentication.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.AddAuthService();
builder.Services.AddLogging();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAccountIdentityMiddleware(MiddlewareLocation.Headers, options => {
    options.Paths = ["/api/health", "/api/user/signin"];
    options.Whitelist = "/api";
});
app.UseRouting();

app.MapGet("/api", () => "Healthy!");

app.MapAuthEndpoints();

app.Map("/api/{*_}", (string? _) => Results.NotFound());

app.MapFallbackToFile("index.html");

app.Run();
