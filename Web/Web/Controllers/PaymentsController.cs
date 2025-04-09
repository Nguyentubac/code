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
    public class PaymentsController : ControllerBase
    {
        private readonly TransportDbContext _context;

        public PaymentsController(TransportDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payments>>> GetPayments()
        {
            return await _context.Payments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payments>> GetPayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null) return NotFound();
            return payment;
        }

        [HttpPost]
        public async Task<ActionResult<Payments>> AddPayment(Payments payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, Payments payment)
        {
            if (id != payment.Id) return BadRequest();
            _context.Entry(payment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null) return NotFound();
            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
