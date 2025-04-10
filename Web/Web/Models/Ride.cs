using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public class Ride
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Người dùng")]
        public int? UserId { get; set; }

        [Required]
        [MaxLength(255)]
        [Display(Name = "Điểm đón")]
        public string? PickupLocation { get; set; }

        [Required]
        [MaxLength(255)]
        [Display(Name = "Điểm trả")]
        public string? DropoffLocation { get; set; }

        [Display(Name = "Giá dự kiến")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal? EstimatedFare { get; set; }

        [Display(Name = "Ngày tạo")]
        public DateTime? CreatedAt { get; set; }

        [Display(Name = "Ngày cập nhật")]
        public DateTime? UpdatedAt { get; set; }

        [Display(Name = "Trạng thái")]
        public byte? Status { get; set; }

        [Display(Name = "Mã thanh toán")]
        public int? PaymentId { get; set; }

        [Display(Name = "Lượt về")]
        public int? ReturnRideId { get; set; }

        [Display(Name = "Khứ hồi")]
        public bool? IsRoundTrip { get; set; }

        [Display(Name = "Quãng đường (km)")]
        [Column(TypeName = "decimal(6,2)")]
        public decimal? DistanceKm { get; set; }

        [Display(Name = "Tài xế")]
        public int? VehicleDriverId { get; set; }

        [Display(Name = "Lịch trình")]
        public int? RouteTripScheduleId { get; set; }

        [Required(ErrorMessage = "Thời gian đón là bắt buộc")]
        [Display(Name = "Thời gian đón")]
        public DateTime? PickupTime { get; set; }

        [Display(Name = "Thời gian đến")]
        public DateTime? DropoffTime { get; set; }

        // 🧩 Quan hệ
        public VehicleDriver? VehicleDriver { get; set; }
        public User? User { get; set; }

        [ForeignKey("RouteTripScheduleId")]
        public RouteTrip? RouteTrip { get; set; }
    }
}
