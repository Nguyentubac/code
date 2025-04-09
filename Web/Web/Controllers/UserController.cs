using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using Web.Data;
using Web.Models;
using System.Text;
using System.Security.Cryptography;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TransportDbContext _context;

        public UserController(TransportDbContext context)
        {
            _context = context;
        }

        // GET: api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // POST: api/user
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Email đã tồn tại.");
            }
            if (await _context.Users.AnyAsync(u => u.PhoneNumber == user.PhoneNumber))
            {
                return BadRequest("Số điện thoại đã tồn tại.");
            }
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (user == null)
            {
                return BadRequest("User data is missing.");
            }
            if (id != user.Id)
            {
                return BadRequest();
            }

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.FullName = user.FullName;
            existingUser.Gender = user.Gender;
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.Address = user.Address;
            existingUser.IsActive = user.IsActive;
            existingUser.BirthDate = user.BirthDate;
            existingUser.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // vô hiệu hóa tài khoản Người dùng do vi phạm chính sách
        //[HttpPatch("{id}/toggle-status")]
        //public async Task<IActionResult> ToggleUserStatus(int id)
        //{
        //    var user = await _context.Users.FindAsync(id);
        //    if (user == null) return NotFound(new { message = "Không tìm thấy người dùng!" });

        //    user.IsActive = !user.IsActive; // Đảo trạng thái (true <-> false)
        //    await _context.SaveChangesAsync();

        //    return Ok(new
        //    {
        //        message = user.IsActive ? "Tài khoản đã được kích hoạt!" : "Tài khoản đã bị vô hiệu hóa!",
        //        isActive = user.IsActive
        //    });
        //}
        //[HttpPost("forgot-password")]
        //public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        //{
        //    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        //    if (user == null) return NotFound("Email không tồn tại!");

        //    // Tạo mã reset mật khẩu (OTP)
        //    string resetToken = new Random().Next(100000, 999999).ToString();
        //    user.PasswordHash = resetToken; // Lưu tạm thời mã OTP
        //    await _context.SaveChangesAsync();

        //    // Gửi email chứa mã OTP
        //    SendEmail(request.Email, "Mã đặt lại mật khẩu", $"Mã đặt lại mật khẩu của bạn: {resetToken}");

        //    return Ok("Hướng dẫn đặt lại mật khẩu đã được gửi qua email!");
        //}

        //// 📧 Hàm gửi email
        //private void SendEmail(string toEmail, string subject, string body)
        //{
        //    var fromEmail = "baccontactforwork8686@gmail.com"; // Thay bằng email của bạn
        //    var fromPassword = "osje ubja aple dthc"; // Thay bằng mật khẩu ứng dụng

        //    var smtpClient = new SmtpClient("smtp.gmail.com")
        //    {
        //        Port = 587,
        //        Credentials = new NetworkCredential(fromEmail, fromPassword),
        //        EnableSsl = true,
        //    };

        //    var mailMessage = new MailMessage(fromEmail, toEmail, subject, body);
        //    smtpClient.Send(mailMessage);
        //}

        // 🟡 Model hỗ trợ quên mật khẩu
        //public class ForgotPasswordRequest
        //{
        //    public string Email { get; set; }
        //}

        //[HttpPost("reset-password")]
        //public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        //{
        //    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        //    if (user == null) return NotFound("Email không tồn tại!");

        //    // Kiểm tra mã OTP
        //    if (user.PasswordHash != request.Otp)
        //    {
        //        return BadRequest("Mã OTP không hợp lệ!");
        //    }

        //    // Cập nhật mật khẩu mới
        //    user.PasswordHash = HashPassword(request.NewPassword);
        //    await _context.SaveChangesAsync();

        //    return Ok("Mật khẩu đã được đặt lại thành công!");
        //}

        // 🟡 Model hỗ trợ đặt lại mật khẩu
        //public class ResetPasswordRequest
        //{
        //    public string Email { get; set; }
        //    public string Otp { get; set; }
        //    public string NewPassword { get; set; }
        //}
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }
}
