using SZOBAELRENDEZO.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IRoomRepository, RoomRepository>();



var app = builder.Build();

app.UseRouting();

app.UseCors(x => x
.AllowCredentials()
.AllowAnyMethod()
.AllowAnyHeader()
.WithOrigins("http://127.0.0.1:5500"));

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id}");

app.MapGet("/", () => "Hello World!");

app.Run();
