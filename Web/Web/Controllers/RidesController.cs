using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Data;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RidesController : ControllerBase
    {
        private readonly TransportDbContext _context;

        public RidesController(TransportDbContext context)
        {
            _context = context;
        }

        // GET: api/Rides
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetRides()
        {
            try
            {
                var rides = await _context.Rides
    .Select(r => new
    {
        r.Id,
        r.UserId,
        r.PickupLocation,
        r.DropoffLocation,
        r.EstimatedFare,
        r.Status,
        r.PaymentId,
        r.ReturnRideId,
        r.IsRoundTrip,
        r.DistanceKm,
        r.VehicleDriverId,
        r.RouteTripScheduleId,
        PickupTime =  r.PickupTime.ToString("HH:mm dd/MM/yyyy"),
        DropoffTime = r.DropoffTime.HasValue ? r.DropoffTime.Value.ToString("HH:mm dd/MM/yyyy") : null,
        CreatedAt = r.CreatedAt.HasValue ? r.CreatedAt.Value.ToString("HH:mm dd/MM/yyyy") : null,
        UpdatedAt = r.UpdatedAt.HasValue ? r.UpdatedAt.Value.ToString("HH:mm dd/MM/yyyy") : null
    })
    .ToListAsync();

                return Ok(rides);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi truy xuất Rides: {ex.Message}");
            }
        }

        // GET: api/Rides/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ride>> GetRide(int id)
        {
            var ride = await _context.Rides.FindAsync(id);
            if (ride == null) return NotFound();
            return ride;
        }

        // POST: api/Rides
        [HttpPost]
        public async Task<ActionResult<Ride>> PostRide(Ride ride)
        {
            ride.CreatedAt = DateTime.Now;
            _context.Rides.Add(ride);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRide), new { id = ride.Id }, ride);
        }

        // PUT: api/Rides/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRide(int id, Ride ride)
        {
            if (id != ride.Id)
                return BadRequest("ID không khớp");

            _context.Entry(ride).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Rides/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRide(int id)
        {
            var ride = await _context.Rides.FindAsync(id);
            if (ride == null) return NotFound();

            _context.Rides.Remove(ride);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
