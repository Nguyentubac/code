using Microsoft.EntityFrameworkCore;
using LuanAnTotNghiep_TuanBac.Data; 
var builder = WebApplication.CreateBuilder(args);

// 1) Lấy connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 2) Đăng ký DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// 3) Thêm các dịch vụ khác (Controller, Cors, v.v.)
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();