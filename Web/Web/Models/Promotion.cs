using System.ComponentModel.DataAnnotations;

namespace Web.Models;

public class Promotion
{
    [Key]
    public int Id { get; set; }

    [Required, StringLength(20)]
    public string Code { get; set; }

    [Required, Range(0, 100)]
    public decimal Discount { get; set; }

    public DateTime ExpiryDate { get; set; }
}
