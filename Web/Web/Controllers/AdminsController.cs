using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.Models;
using Web.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly TransportDbContext _context;


        public AdminsController(IConfiguration config, TransportDbContext context)
        {
            _config = config;
            _context = context;
        }

        // GET: api/Admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admins>>> GetAdmins()
        {
            return await _context.Admins.ToListAsync();
        }

        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admins>> GetAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null) return NotFound();
            return admin;
        }

        // POST: api/Admins
        [HttpPost]
        public async Task<ActionResult<Admins>> CreateAdmin(Admins user)
        {
            // Hash password before saving
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;

            _context.Admins.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdmin), new { id = user.Id }, user);
        }

        // PUT: api/Admins/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdmin(int id, Admins user)
        {
            var existingUser = await _context.Admins.FindAsync(id);
            if (existingUser == null) return NotFound();

            existingUser.FullName = user.FullName;
            existingUser.Email = user.Email;
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.AvatarUrl = user.AvatarUrl;
            existingUser.IsActive = user.IsActive;
            existingUser.UpdatedAt = DateTime.Now;

            if (!string.IsNullOrEmpty(user.PasswordHash))
            {
                existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            }

            _context.Entry(existingUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Admins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var user = await _context.Admins.FindAsync(id);
            if (user == null) return NotFound();

            _context.Admins.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Admins/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.Admins.FirstOrDefaultAsync(a => a.Email == request.Email);
            if (user == null) return Unauthorized("Email không tồn tại");

            bool verified = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!verified) return Unauthorized("Sai mật khẩu");

            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            // ✅ Sinh JWT token
            var token = GenerateJwtToken(user.Id, user.Email);

            return Ok(new
            {
                token, // ✅ Trả token để frontend lưu vào localStorage
                user = new
                {
                    user.Id,
                    user.FullName,
                    user.Email,
                    user.AvatarUrl,
                    user.IsActive,
                    user.LastLoginAt
                }
            });
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
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

