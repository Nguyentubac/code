using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Web.Data;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly TransportDbContext _context;

        public AuthController(IConfiguration config, TransportDbContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // ✅ Tìm admin theo email
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Email == request.Email);
            if (admin == null)
                return Unauthorized(new { message = "Email không tồn tại." });

            // ✅ Kiểm tra mật khẩu với BCrypt
            bool verified = BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash);
            if (!verified)
                return Unauthorized(new { message = "Sai mật khẩu." });

            // ✅ Tạo token nếu đúng
            var token = GenerateJwtToken(admin.Id, admin.Email);
            return Ok(new { token });
        }

        private string GenerateJwtToken(int userId, string email)
        {
            var claims = new[]
            {
                new Claim("UserId", userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
