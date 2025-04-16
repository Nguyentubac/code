using System.ComponentModel.DataAnnotations;

namespace Web.Models;

public class Promotion
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Mã giảm giá không được bỏ trống")]
    [StringLength(50)]
    public string Code { get; set; }

    [StringLength(255)]
    public string Description { get; set; }

    [Range(0, 100, ErrorMessage = "Giá trị giảm phải nằm trong khoảng 0 - 100 (%)")]
    public decimal Discount { get; set; }

    [Required]
    public DateTime ValidFrom { get; set; }

    [Required]
    public DateTime ValidTo { get; set; }

    [Range(0, 1)]
    public byte Status { get; set; } = 1;  // 1 = Hoạt động, 0 = Không hoạt động

    [DataType(DataType.DateTime)]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    [DataType(DataType.DateTime)]
    public DateTime? UpdatedAt { get; set; }

    [Range(0, int.MaxValue)]
    public int UsedCount { get; set; } = 0;

    [Range(0, int.MaxValue)]
    public decimal MinRideAmount { get; set; } = 0;

    [Range(1, int.MaxValue, ErrorMessage = "Số lượt tối đa phải > 0")]
    public int MaxUsage { get; set; } = 100;

    // Điều hướng quan hệ: Một mã giảm giá có thể được dùng trong nhiều thanh toán
    public ICollection<Payment> Payments { get; set; }
}