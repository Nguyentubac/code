using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace Web.Models;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required, EmailAddress, StringLength(100)]
    public string Email { get; set; } // Địa chỉ email của người dùng

    [Required, StringLength(255)]
    public string PasswordHash { get; set; } // Mật khẩu đã được hash

    [Required, StringLength(100)]
    public string FullName { get; set; } // Họ và tên người dùng

    [Required, StringLength(10)]
    public string Gender { get; set; } // Giới tính (Male, Female, Other)

    public DateTime? BirthDate { get; set; }

    [Required, StringLength(15)]
    public string PhoneNumber { get; set; } // Số điện thoại người dùng

    [StringLength(255)]
    public string Address { get; set; } // Địa chỉ của người dùng (tùy chọn)

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Thời điểm tài khoản được tạo

    public DateTime? UpdatedAt { get; set; } // Thời điểm cập nhật gần nhất (có thể null)

    public bool IsActive { get; set; } = true; // Trạng thái hoạt động (true: active, false: inactive)

    
}

