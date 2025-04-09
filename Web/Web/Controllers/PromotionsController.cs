using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        private readonly TransportDbContext _context;

        public PromotionsController(TransportDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetPromotions()
        {
            return await _context.Promotions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Promotion>> GetPromotion(int id)
        {
            var promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null) return NotFound();
            return promotion;
        }

        [HttpPost]
        public async Task<ActionResult<Promotion>> AddPromotion(Promotion promotion)
        {
            _context.Promotions.Add(promotion);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPromotion), new { id = promotion.Id }, promotion);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null) return NotFound();
            _context.Promotions.Remove(promotion);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
