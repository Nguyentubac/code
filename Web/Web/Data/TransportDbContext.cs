using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Web.Models;

namespace Web.Data;
public class TransportDbContext : DbContext
{
    public TransportDbContext(DbContextOptions<TransportDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Ride> Rides { get; set; }
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    public DbSet<Admins> Admins { get; set; }
    public DbSet<RouteTrip> RouteTrips { get; set; }
    public DbSet<Vehicles> Vehicles { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<DTOs.VehicleStatusDto> VehicleStatusDtos { get; set; }
    public DbSet<DTOs.PaymentDto>  PaymentDtos{ get; set; }
    
    public DbSet<VehicleDriver> VehicleDrivers { get; set; }
}

