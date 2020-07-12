using System.ComponentModel.DataAnnotations;
using System;
public class UserDTO
{
    [Key]
    public long Id { get; set; }

    [Required(ErrorMessage = "Login inválido")]
    public string Login { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
    public DateTime BirthDate { get; set; }

    [Required]
    [MinLength(11, ErrorMessage = "Cpf inválido")]
    [MaxLength(11, ErrorMessage = "Cpf inválido")]
    public string Cpf { get; set; }

    [Required]
    public bool IsActive { get; set; }

    [MinLength(1, ErrorMessage = "Número de Registro inválido")]
    public string RegistrationNumber { get; set; }

    [MinLength(30, ErrorMessage = "Token inválido")]
    [MaxLength(30, ErrorMessage = "Token inválido")]
    public string Token { get; set; }

    [MinLength(1, ErrorMessage = "CRM inválido")]
    public string CrmNumber { get; set; }
    public string accountType { get; set; }
}