
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddTransient<ExceptionMiddleware>();
            builder.Services.AddScoped<PaymentsService>();
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
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
                sqlOptions => sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(10),
                        errorNumbersToAdd: null));
                                    
            });

            builder.Services.AddIdentityApiEndpoints<User>(options =>
            {
                options.User.RequireUniqueEmail = true;
            }) 
            .AddRoles<IdentityRole>()

            .AddEntityFrameworkStores<StoreContext>();
            
            var stripeSecretKey = Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY");
            StripeConfiguration.ApiKey = stripeSecretKey;
            // Add services to the container.

            var app = builder.Build();

            app.UseMiddleware<ExceptionMiddleware>();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            
            app.UseCors("AllowSpecificOrigin");
            app.UseAuthentication();
            app.UseAuthorization();

            

            app.MapControllers();
            app.MapGroup("api").MapIdentityApi<User>();

            app.MapFallbackToController("index", "Fallback");
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<StoreContext>();

                await context.Database.MigrateAsync();
                if (await context.Database.CanConnectAsync())
                    Console.WriteLine("DB 연결 성공!");
                else
                    Console.WriteLine("DB 연결 실패...");
                await DbInitializer.InitDb(app);
            }
           
            app.Run();
        }
    }
}
