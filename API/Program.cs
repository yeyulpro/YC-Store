
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("https://localhost:3004") // Replace with your client's origin
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());              
            });

            builder.Services.AddDbContext<StoreContext>(options =>
            {
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            // Add services to the container.

          


            var app = builder.Build();
            app.UseCors("AllowSpecificOrigin");
            app.MapControllers();


            DbInitializer.InitDb(app);
            app.Run();
        }
    }
}
