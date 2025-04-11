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
                    .Include(r => r.VehicleDriver)
                        .ThenInclude(vd => vd.Driver)
                    .Include(r => r.VehicleDriver)
                        .ThenInclude(vd => vd.Vehicle)
                    .Include(r => r.User)
                    .Include(r => r.RouteTrip)
                    .ToListAsync();

                var result = rides.Select(r => new
                {
                    r.Id,
                    r.RouteTripScheduleId,
                    RouteTripCode = r.RouteTrip != null ? r.RouteTrip.Code : "Không rõ",

                    VehicleId = r.VehicleDriver?.Vehicle?.Id,
                    VehiclePlate = r.VehicleDriver?.Vehicle?.PlateNumber ?? "Không rõ",
                    DriverId = r.VehicleDriver?.Driver?.Id,
                    DriverName = r.VehicleDriver?.Driver?.FullName ?? "Không rõ",
                    PassengerName = r.User?.FullName ?? "Ẩn danh",

                    r.PickupLocation,
                    r.DropoffLocation,
                    r.Status,

                    PickupTime = r.PickupTime.HasValue ? r.PickupTime.Value.ToString("yyyy-MM-dd HH:mm") : null,
                    DropoffTime = r.DropoffTime.HasValue ? r.DropoffTime.Value.ToString("yyyy-MM-dd HH:mm") : null,
                    CreatedAt = r.CreatedAt.HasValue ? r.CreatedAt.Value.ToString("yyyy-MM-dd HH:mm") : null
                });

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ Lỗi khi truy xuất Rides:");
                Console.WriteLine(ex.ToString());
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
            try
            {
                var ride = await _context.Rides.FindAsync(id);
                if (ride == null) return NotFound();

                _context.Rides.Remove(ride);
                await _context.SaveChangesAsync();

                return NoContent(); // Trả về 204 thành công
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Không thể xoá: {ex.Message}");
            }
        }
        [HttpGet("pickup-stats")]
        public async Task<IActionResult> GetPickupStats(int? month = null, int? year = null)
        {
            var now = DateTime.Now;
            var targetMonth = month ?? now.Month;
            var targetYear = year ?? now.Year;

            var rides = await _context.Rides
                .Where(r => r.PickupTime.HasValue &&
                            r.PickupLocation != null &&
                            r.PickupTime.Value.Month == targetMonth &&
                            r.PickupTime.Value.Year == targetYear)
                .GroupBy(r => r.PickupLocation)
                .Select(g => new
                {
                    PickupLocation = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var total = rides.Sum(x => x.Count);
            if (total == 0) return Ok(new List<object>());

            var result = rides.Select(x => new
            {
                PickupLocation = x.PickupLocation,
                Percentage = Math.Round((double)x.Count * 100 / total, 2)
            });

            return Ok(result);
        }


    }
}
