using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Data;

namespace Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehicleController : ControllerBase
{
    private readonly TransportDbContext _context;

    public VehicleController(TransportDbContext context)
    {
        _context = context;
    }

    // GET: api/vehicle
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Vehicles>>> GetVehicles()
    {
        return await _context.Vehicles.ToListAsync();
    }

    // GET: api/vehicle/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Vehicles>> GetVehicle(int id)
    {
        var vehicle = await _context.Vehicles.FindAsync(id);
        if (vehicle == null) return NotFound();
        return vehicle;
    }

    // POST: api/vehicle
    [HttpPost]
    public async Task<ActionResult<Vehicles>> CreateVehicle(Vehicles vehicle)
    {
        vehicle.CreatedAt = DateTime.Now;
        _context.Vehicles.Add(vehicle);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Id }, vehicle);
    }

    // PUT: api/vehicle/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVehicle(int id, Vehicles updatedVehicle)
    {
        if (id != updatedVehicle.Id) return BadRequest("ID không khớp.");

        var existing = await _context.Vehicles.FindAsync(id);
        if (existing == null) return NotFound();

        updatedVehicle.UpdatedAt = DateTime.Now;

        _context.Entry(existing).CurrentValues.SetValues(updatedVehicle);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/vehicle/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
        var vehicle = await _context.Vehicles.FindAsync(id);
        if (vehicle == null) return NotFound();

        _context.Vehicles.Remove(vehicle);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
