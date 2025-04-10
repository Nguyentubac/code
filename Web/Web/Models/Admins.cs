using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{   [Table("Admins")]
    public class Admins
    {
            [Key]
            public int Id { get; set; }

            [Required]
            [MaxLength(255)]
            public string? FullName { get; set; }

            [Required]
            [MaxLength(255)]
            [EmailAddress]
            public string? Email { get; set; }

            [Required]
            public string? PasswordHash { get; set; }

            [MaxLength(20)]
            public string? PhoneNumber { get; set; }

            [MaxLength(500)]
            public string? AvatarUrl { get; set; }

            public bool IsActive { get; set; } = true;

            public DateTime CreatedAt { get; set; } = DateTime.Now;

            public DateTime UpdatedAt { get; set; } = DateTime.Now;

            public DateTime? LastLoginAt { get; set; }

}
}
