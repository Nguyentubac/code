using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Data;
using BackendAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly TransportDbContext _context;
        private readonly IHubContext<NotificationHub> _hub;

        public NotificationsController(TransportDbContext context, IHubContext<NotificationHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            return await _context.Notifications.OrderByDescending(n => n.CreatedAt).ToListAsync();
        }

        [HttpGet("unread-count")]
        public async Task<ActionResult<int>> GetUnreadNotificationCount()
        {
            var count = await _context.Notifications
                .Where(n => n.Status == 0)
                .CountAsync();
            return Ok(count);
        }

        [HttpPost]
        public async Task<ActionResult<Notification>> PostNotification(Notification notification)
        {
            notification.CreatedAt = DateTime.Now;
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            await NotifyUnreadCountChanged(notification.UserId ?? 0); // 🔔 gửi realtime


            return CreatedAtAction(nameof(GetNotifications), new { id = notification.Id }, notification);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotification(int id, Notification notification)
        {
            if (id != notification.Id) return BadRequest();

            var existing = await _context.Notifications.FindAsync(id);
            if (existing == null) return NotFound();

            _context.Entry(existing).CurrentValues.SetValues(notification);

            try
            {
                await _context.SaveChangesAsync();
                await NotifyUnreadCountChanged(notification.UserId ?? 0); // 🔔 gửi realtime
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Cập nhật thất bại do lỗi đồng bộ.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null) return NotFound();

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            await NotifyUnreadCountChanged(notification.UserId ?? 0); // 🔔 gửi realtime

            return NoContent();
        }

        // 📢 Gửi số thông báo chưa đọc đến đúng user
        private async Task NotifyUnreadCountChanged(int userId)
        {
            if (userId <= 0) return;

            var count = await _context.Notifications
                .Where(n => n.UserId == userId && n.Status == 0)
                .CountAsync();

            await _hub.Clients.User(userId.ToString())
                      .SendAsync("ReceiveUnreadCount", count);
        }
    }
}
