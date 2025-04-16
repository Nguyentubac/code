namespace Web.DTOs
{
    public class PromotionDto
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public decimal Discount { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }
        public byte Status { get; set; }
        public decimal MinRideAmount { get; set; }
        public int MaxUsage { get; set; }
    }
}
