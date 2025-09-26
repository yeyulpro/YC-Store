
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddTransient<ExceptionMiddleware>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("https://localhost:3004") // Replace with your client's origin
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .AllowCredentials());
            });

            builder.Services.AddDbContext<StoreContext>(options =>
            {
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddIdentityApiEndpoints<User>(options =>
            {
                options.User.RequireUniqueEmail = true;
                

            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<StoreContext>();

            // Add services to the container.

            var app = builder.Build();

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseCors("AllowSpecificOrigin");
             app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.MapGroup("api").MapIdentityApi<User>();
           


            await DbInitializer.InitDb(app);
            app.Run();
        }
    }
}
