using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NoContent();
            return basket.ToDto();



        }
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            basket ??= CreateBasket();

            var product = await context.Products.FindAsync(productId);
            if (product == null) return BadRequest("Problem adding an item");
            basket.AddItem(product, quantity);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());
            return BadRequest("Problem updating basket");
        }

        private Basket CreateBasket()
        {
            var basketId = Guid.NewGuid().ToString();
            var cookieOption = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("basketId", basketId, cookieOption);
            var basket = new Basket { BasketId = basketId };
            context.Baskets.Add(basket);
            return basket;

        }

        private async Task<Basket?> RetrieveBasket()
        {
            return await context.Baskets
                         .Include(b => b.Items)
                         .ThenInclude(i => i.Product)
                         .FirstOrDefaultAsync(b => b.BasketId == Request.Cookies["basketId"]);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return BadRequest();
            basket.RemoveItem(productId, quantity);

            var result = await context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Problem deleting an item");
            return Ok();
        }
    }
}