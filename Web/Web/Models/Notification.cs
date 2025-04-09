using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models;

public class Notification
{
    [Key]
    public int Id { get; set; }

    [Display(Name = "Người dùng")]
    public int? UserId { get; set; }

    [Required(ErrorMessage = "Tiêu đề là bắt buộc.")]
    [StringLength(200)]
    [Display(Name = "Tiêu đề")]
    public string? Title { get; set; }

    [Required(ErrorMessage = "Nội dung là bắt buộc.")]
    [Display(Name = "Nội dung")]
    public string? Message { get; set; }

    [Required]
    [Range(0, 1)]
    [Display(Name = "Trạng thái")] // 0: chưa đọc, 1: đã đọc
    public byte Status { get; set; }

    [Display(Name = "Loại thông báo")]
    public byte Type { get; set; }

    [Required]
    [Display(Name = "Ngày tạo")]
    public DateTime CreatedAt { get; set; }

    [Display(Name = "Quản trị viên")]
    public int? AdminId { get; set; }

    [Display(Name = "Gửi bởi Admin")]
    public bool SenderIsAdmin { get; set; }
}
