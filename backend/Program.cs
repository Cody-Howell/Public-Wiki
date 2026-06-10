var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.MapGet("/api", () => "Hello World!");

app.MapFallbackToFile("index.html");

app.Run();
