using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Basket> Baskets { get; set; }
        public required DbSet<Order> Orders { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>()  // role seedData
            .HasData(
                new IdentityRole { Id = "5bf02103-1963-42c5-b138-d8228c5d3707", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Id = "3bebdc41-b17e-41cd-b1b0-8e58afcc239f", Name = "Admin", NormalizedName = "ADMIN" }
            );
        }

    }
}