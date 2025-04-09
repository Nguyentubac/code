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
    public class RatingsController : ControllerBase
    {
        private readonly TransportDbContext _context;

        public RatingsController(TransportDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatings()
        {
            return await _context.Ratings.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rating>> GetRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null) return NotFound();
            return rating;
        }

        [HttpPost]
        public async Task<ActionResult<Rating>> AddRating(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRating), new { id = rating.Id }, rating);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRating(int id, Rating rating)
        {
            if (id != rating.Id) return BadRequest();
            _context.Entry(rating).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null) return NotFound();
            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
