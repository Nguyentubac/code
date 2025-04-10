using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models;


public class Vehicles
{
    [Key]
    public int Id { get; set; }

    [Required, StringLength(20)]
    public string? PlateNumber { get; set; }

    [Required, StringLength(50)]
    public string? Model { get; set; }

    [Required, StringLength(20)]
    public string? Color { get; set; }

    [Required]
    [Display(Name = "Trạng thái")]
    public byte Status { get; set; }

    public DateTime? LastMaintenance { get; set; }

    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    [Required, StringLength(255)]
    public string? OwnerName { get; set; }

    [Required, StringLength(50)]
    public string? ChassisNumber { get; set; }

    [Required, StringLength(50)]
    public string? EngineNumber { get; set; }

    public DateTime? RegistrationDate { get; set; }

    public DateTime? InsuranceExpiry { get; set; }

    public int? Capacity { get; set; }

    [StringLength(20)]
    public string? FuelType { get; set; }

    public bool? GPSInstalled { get; set; }

    public DateTime? LastInspectionDate { get; set; }

    [Required, StringLength(50)]
    public string? VehicleType { get; set; }

    [StringLength(500)]
    public string? LuxuryFeatures { get; set; }

    [StringLength(500)]
    public string? DriverComfortFeatures { get; set; }

    public bool? VIPService { get; set; }

    [StringLength(255)]
    public string? OperatingArea { get; set; }

    [StringLength(255)]
    public string? EntertainmentSystem { get; set; }
}
