using System;
using System.ComponentModel.DataAnnotations;

public class UserDTO
{
    public long Id { get; set; }
    public string Login { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }
    public string Cpf { get; set; }
    public bool IsActive { get; set; }
    public string RegistrationNumber { get; set; }
    public string Token { get; set; }
    public string CrmNumber { get; set; }
    public string accountType { get; set; }
}