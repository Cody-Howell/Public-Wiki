using HowlDev.Web.Authentication.AccountAuth;
using HowlDev.Web.Authentication.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.AddAuthService();
builder.Services.AddLogging();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAccountIdentityMiddleware(MiddlewareLocation.Headers, options => {
    options.Paths = ["/api/health"];
    options.Whitelist = "/api";
});
app.UseRouting();

app.MapGet("/api/health", () => "Healthy!");

app.Map("/api/{*rest}", (string rest) => Results.NotFound());

app.MapFallbackToFile("index.html");

app.Run();
