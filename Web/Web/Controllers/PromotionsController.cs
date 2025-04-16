using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.DTOs;
using Web.Models;
using Web.Data;

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

        // GET: api/promotions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetAll()
        {
            return await _context.Promotions
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        // GET: api/promotions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Promotion>> GetById(int id)
        {
            var promo = await _context.Promotions.FindAsync(id);
            return promo == null ? NotFound() : promo;
        }

        // POST: api/promotions
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PromotionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _context.Promotions.AnyAsync(p => p.Code == dto.Code))
                return BadRequest("Mã giảm giá đã tồn tại.");

            var promo = new Promotion
            {
                Code = dto.Code,
                Description = dto.Description,
                Discount = dto.Discount,
                ValidFrom = dto.ValidFrom,
                ValidTo = dto.ValidTo,
                Status = dto.Status,
                MinRideAmount = dto.MinRideAmount,
                MaxUsage = dto.MaxUsage,
                UsedCount = 0,
                CreatedAt = DateTime.Now,
            };

            _context.Promotions.Add(promo);
            await _context.SaveChangesAsync();

            return Ok(promo);
        }

        // PUT: api/promotions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PromotionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var promo = await _context.Promotions.FindAsync(id);
            if (promo == null) return NotFound();

            promo.Description = dto.Description;
            promo.Discount = dto.Discount;
            promo.ValidFrom = dto.ValidFrom;
            promo.ValidTo = dto.ValidTo;
            promo.Status = dto.Status;
            promo.MinRideAmount = dto.MinRideAmount;
            promo.MaxUsage = dto.MaxUsage;
            promo.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/promotions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var promo = await _context.Promotions.FindAsync(id);
            if (promo == null) return NotFound();

            _context.Promotions.Remove(promo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
