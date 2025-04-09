using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models;

public class PromoUsage
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }

    [Required]
    [ForeignKey("Promotion")]
    public int PromotionId { get; set; }

    public DateTime UsedAt { get; set; } = DateTime.UtcNow;
}
