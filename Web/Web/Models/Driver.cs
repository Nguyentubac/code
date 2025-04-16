using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models;

public class Driver
{
    [Key]
    public int Id { get; set; }

    [Required, StringLength(50)]
    public string VehicleType { get; set; }

    [Range(0, double.MaxValue)]
    public decimal? Earnings { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime? UpdatedAt { get; set; }

    public byte? Status { get; set; } // tinyint nullable

    [StringLength(500)]
    public string? AvatarUrl { get; set; }

    [Required, StringLength(20)]
    public string NationalID { get; set; }

    public DateTime? NationalIDIssuedDate { get; set; }

    [StringLength(255)]
    public string? NationalIDIssuedPlace { get; set; }

    [StringLength(500)]
    public string? Address { get; set; }

    public DateTime? BirthDate { get; set; }

    [Required, StringLength(15)]
    public string PhoneNumber { get; set; }

    [StringLength(50)]
    public string? LicenseType { get; set; }

    public DateTime? LicenseExpiryDate { get; set; }

    [StringLength(50)]
    public string? BankAccountNumber { get; set; }

    [StringLength(255)]
    public string? BankName { get; set; }

    [Required, StringLength(255)]
    public string FullName { get; set; }
}


