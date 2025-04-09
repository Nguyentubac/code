using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Data;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteTripsController : ControllerBase
    {
        private readonly TransportDbContext _context;

        public RouteTripsController(TransportDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RouteTrip>>> GetAll()
        {
            return await _context.RouteTrips.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RouteTrip>> GetById(int id)
        {
            var item = await _context.RouteTrips.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<RouteTrip>> Create(RouteTrip item)
        {
            item.CreatedAt = DateTime.UtcNow;
            _context.RouteTrips.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, RouteTrip item)
        {
            if (id != item.Id) return BadRequest();
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.RouteTrips.FindAsync(id);
            if (item == null) return NotFound();
            _context.RouteTrips.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
