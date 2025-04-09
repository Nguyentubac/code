using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Web.Data;
using Web.Models;

namespace Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehicleDriverController : ControllerBase
{
    private readonly TransportDbContext _context;

    public VehicleDriverController(TransportDbContext context)
    {
        _context = context;
    }

    // GET: api/vehicleDriver
    [HttpGet]
    public async Task<ActionResult<IEnumerable<VehicleDriver>>> GetAll()
    {
        return await _context.VehicleDrivers
            .Include(vd => vd.Vehicle)
            .Include(vd => vd.Driver)
            .ToListAsync();
    }

    // GET: api/vehicleDriver/5
    [HttpGet("{id}")]
    public async Task<ActionResult<VehicleDriver>> GetById(int id)
    {
        var item = await _context.VehicleDrivers
            .Include(vd => vd.Vehicle)
            .Include(vd => vd.Driver)
            .FirstOrDefaultAsync(vd => vd.Id == id);

        if (item == null) return NotFound();
        return item;
    }

    // POST: api/vehicleDriver
    [HttpPost]
    public async Task<ActionResult<VehicleDriver>> AssignDriver(VehicleDriver input)
    {
        // Kiểm tra trùng phân công hiện tại (chưa gỡ)
        bool exists = await _context.VehicleDrivers
            .AnyAsync(vd => vd.VehicleId == input.VehicleId && vd.DriverId == input.DriverId && vd.UnassignedAt == null);

        if (exists) return BadRequest("Tài xế đã được phân công cho xe này.");

        input.CreatedAt = DateTime.UtcNow;
        input.AssignedAt = DateTime.UtcNow;
        input.UnassignedAt = null;

        _context.VehicleDrivers.Add(input);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = input.Id }, input);
    }

    // PUT: api/vehicleDriver/unassign/5
    
    [HttpPut("unassign/{id}")]
    public async Task<IActionResult> UnassignDriver(int id)
    {
        var assignment = await _context.VehicleDrivers.FindAsync(id);
        if (assignment == null) return NotFound("Không tìm thấy phân công");

        _context.VehicleDrivers.Remove(assignment);
        await _context.SaveChangesAsync();

        return Ok("Đã huỷ phân công");
    }
}
