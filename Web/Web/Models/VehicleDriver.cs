using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models;

public class VehicleDriver
{
    [Key]
    public int Id { get; set; }

    [Required]
    [ForeignKey("Vehicle")]
    public int VehicleId { get; set; }

    [Required]
    [ForeignKey("Driver")]
    public int DriverId { get; set; }

    public DateTime? CreatedAt { get; set; } = DateTime.Now;
    public DateTime AssignedAt { get; set; } = DateTime.Now;
    public DateTime? UnassignedAt { get; set; }

    public Vehicles? Vehicle { get; set; }
    public Driver? Driver { get; set; }
}

