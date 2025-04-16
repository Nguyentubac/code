using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Data;
using Web.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

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

        // GET: api/Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            try
            {
                var payments = await _context.Payments.ToListAsync();
                if (payments == null || !payments.Any())
                {
                    return NoContent(); // If no data found, return 204
                }
                return Ok(payments); // Return 200 OK with list of payments
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle unexpected errors
            }
        }

        // GET: api/Payments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            try
            {
                var payment = await _context.Payments.FindAsync(id);

                if (payment == null)
                {
                    return NotFound(); // 404 if payment not found
                }

                return Ok(payment); // Return payment details
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle unexpected errors
            }
        }

        // POST: api/Payments
        [HttpPost]
        public async Task<ActionResult<Payment>> CreatePayment([FromBody] Payment payment)
        {
            try
            {
                if (payment == null)
                {
                    return BadRequest("Payment data is required.");
                }

                // Validate payment details (e.g., amount, payment method, etc.)
                if (payment.Amount <= 0)
                {
                    return BadRequest("Amount must be greater than zero.");
                }

                payment.CreatedAt = DateTime.UtcNow;  // Set UTC time for created timestamp
                payment.UpdatedAt = DateTime.UtcNow;  // Set UTC time for updated timestamp

                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment); // Return 201 Created with payment data
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle unexpected errors
            }
        }

        // PUT: api/Payments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] Payment payment)
        {
            try
            {
                if (id != payment.Id)
                {
                    return BadRequest("Payment ID mismatch.");
                }

                var existingPayment = await _context.Payments.FindAsync(id);
                if (existingPayment == null)
                {
                    return NotFound(); // 404 if payment not found
                }

                // Update properties
                existingPayment.PaymentMethod = payment.PaymentMethod;
                existingPayment.Amount = payment.Amount;
                existingPayment.PaymentStatus = payment.PaymentStatus;
                existingPayment.PromotionId = payment.PromotionId;
                existingPayment.DiscountAmount = payment.DiscountAmount;
                existingPayment.TotalAmount = payment.TotalAmount;
                existingPayment.UpdatedAt = DateTime.UtcNow; // Update the timestamp

                await _context.SaveChangesAsync();
                return NoContent(); // Return 204 No Content indicating successful update
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle unexpected errors
            }
        }

        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            try
            {
                var payment = await _context.Payments.FindAsync(id);
                if (payment == null)
                {
                    return NotFound(); // 404 if payment not found
                }

                _context.Payments.Remove(payment);
                await _context.SaveChangesAsync();
                return NoContent(); // Return 204 No Content indicating successful deletion
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle unexpected errors
            }
        }
    }
}
