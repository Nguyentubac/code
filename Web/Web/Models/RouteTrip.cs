using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public class RouteTrip
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(10)]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Origin { get; set; }

        [Required]
        [MaxLength(100)]
        public string Destination { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        public TimeSpan? EndTime { get; set; }

        [Required]
        [MaxLength(50)]
        public string Status { get; set; }

        [ForeignKey("VehicleDriver")]
        public int VehicleDriverId { get; set; }

        [ForeignKey("Admin")]
        public int AdminId { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}

