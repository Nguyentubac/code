using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Web.Models;

public class Payment
{
    [Key]
    public int Id { get; set; }

    [Required]
    [Display(Name = "Phương thức thanh toán")]
    public byte PaymentMethod { get; set; } // 0: COD, 1: Momo, 2: VNPay...

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    [Display(Name = "Số tiền gốc")]
    public decimal Amount { get; set; }

    [Required]
    [Display(Name = "Trạng thái thanh toán")]
    public byte PaymentStatus { get; set; } // 0: Chưa thanh toán, 1: Đã thanh toán

    [Display(Name = "Ngày tạo")]
    public DateTime? CreatedAt { get; set; }

    [Display(Name = "Ngày cập nhật")]
    public DateTime? UpdatedAt { get; set; }

    [Display(Name = "Mã khuyến mãi")]
    public int? PromotionId { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    [Display(Name = "Giảm giá")]
    public decimal? DiscountAmount { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    [Display(Name = "Tổng thanh toán")]
    public decimal? TotalAmount { get; set; }

    // 🔗 Quan hệ
    public Promotion? Promotion { get; set; }
    public ICollection<Ride>? Rides { get; set; }
}
