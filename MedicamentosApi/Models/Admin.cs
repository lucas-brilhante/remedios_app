using System.ComponentModel.DataAnnotations;
public class Admin
{
    [Key]
    public long Id { get; set; }
    public string RegistrationNumber { get; set; }
    public string Token { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
}