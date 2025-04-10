using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models;

public class Rating
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("Ride")]
    public int RideId { get; set; } // Liên kết với bảng Rides

    [Required]
    [ForeignKey("Customer")]
    public int CustomerId { get; set; } // Liên kết với bảng Customers

    [Required]
    [ForeignKey("Driver")]
    public int DriverId { get; set; } // Liên kết với bảng Drivers

    [Required, Range(1, 5)]
    public int RatingValue { get; set; } // Điểm đánh giá từ 1 đến 5

    [StringLength(500)]
    public string Feedback { get; set; } // Nhận xét từ khách hàng

    public DateTime CreatedAt { get; set; } = DateTime.Now; // Thời gian tạo đánh giá

    public DateTime? UpdatedAt { get; set; } // Thời gian cập nhật gần nhất (có thể null)
}
