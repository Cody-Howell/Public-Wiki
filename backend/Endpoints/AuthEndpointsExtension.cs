using HowlDev.Web.Authentication.AccountAuth;
using HowlDev.Web.Authentication.Middleware;
using Microsoft.AspNetCore.Mvc;

namespace backend.Endpoints;

public static class AuthEndpointsExtension {
    public static WebApplication MapAuthEndpoints(this WebApplication app) {
        app.MapPost("/api/user/signin", async ([FromServices] AuthService service, [FromBody] SignInRequest req) => {
            if (await service.IsValidUserPassAsync(req.Username, req.Password)) {
                string key = await service.NewSignInAsync(req.Username);
                return Results.Ok(key);
            }

            return Results.BadRequest("Invalid username/password combo.");
        });
        app.MapPost("/api/user/changepw", async ([FromServices] AuthService service, [FromBody] SignInRequest req, AccountInfo info) => {
            await service.UpdatePasswordAsync(info.AccountName, req.Password);
            await service.GlobalSignOutAsync(info.AccountName);

            return Results.Accepted();
        });
        app.MapGet("/api/user/valid", () => Results.Ok());

        return app;
    }
}
