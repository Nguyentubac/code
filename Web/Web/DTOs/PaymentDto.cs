
using System.ComponentModel.DataAnnotations;
namespace Web.DTOs
{
    public class PaymentDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Phương thức thanh toán là bắt buộc")]
        [Display(Name = "Phương thức thanh toán")]
        public byte PaymentMethod { get; set; }

        [Required(ErrorMessage = "Số tiền gốc là bắt buộc")]
        [Range(0, double.MaxValue, ErrorMessage = "Số tiền không hợp lệ")]
        [Display(Name = "Số tiền gốc")]
        public decimal Amount { get; set; }

        [Required]
        [Display(Name = "Trạng thái thanh toán")]
        public byte PaymentStatus { get; set; }

        [Display(Name = "Ngày tạo")]
        public DateTime? CreatedAt { get; set; }

        [Display(Name = "Ngày cập nhật")]
        public DateTime? UpdatedAt { get; set; }

        [Display(Name = "Mã khuyến mãi")]
        public int? PromotionId { get; set; }

        [Display(Name = "Giảm giá")]
        [Range(0, double.MaxValue, ErrorMessage = "Số tiền giảm giá không hợp lệ")]
        public decimal? DiscountAmount { get; set; }

        [Display(Name = "Tổng thanh toán")]
        [Range(0, double.MaxValue, ErrorMessage = "Tổng tiền không hợp lệ")]
        public decimal? TotalAmount { get; set; }
    }
}