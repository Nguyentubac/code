using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models;

public class Payments
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("Ride")]
    public int RideId { get; set; }

    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }

    [Required, Range(0, double.MaxValue)]
    public decimal Amount { get; set; }

    [Required, StringLength(50)]
    public string PaymentMethod { get; set; }

    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
}
