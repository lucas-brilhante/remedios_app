using System.ComponentModel.DataAnnotations;
using System;
public class Doctor
{
    [Key]
    public long Id { get; set; }
    public string CrmNumber { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
}