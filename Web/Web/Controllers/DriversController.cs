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
    public class DriversController : ControllerBase
    {
        private readonly TransportDbContext _context;

        public DriversController(TransportDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Driver>>> GetDrivers()
        {
            return await _context.Drivers.ToListAsync();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }
            return driver;
        }

        [HttpPost]
        public async Task<ActionResult<Driver>> AddDriver(Driver driver)
        {
            _context.Drivers.Add(driver);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetDriver), new { id = driver.Id }, driver);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDriver(int id, Driver driver)
        {
            if (id != driver.Id)
            {
                return BadRequest();
            }

            _context.Entry(driver).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
