using System;
using System.ComponentModel.DataAnnotations;

public class UserForm
{
    [Key]
    public long Id { get; set; }

    [Required(ErrorMessage = "Login inválido.")]
    [EmailAddress(ErrorMessage = "O login deve ser um email válido.")]
    [CheckLogin(ErrorMessage = "O login já está em uso.")]
    public string Login { get; set; }

    [Required(ErrorMessage = "Senha inválida.")]
    [MinLength(5, ErrorMessage = "A senha deve ter no mínimo 5 caracteres.")]
    [MaxLength(30, ErrorMessage = "A senha deve ter no máximo 30 caracteres.")]
    public string Password { get; set; }

    [Required(ErrorMessage = "Nome inválido.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Sobrenome inválido.")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Data de nascimento inválida.")]
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
    public DateTime BirthDate { get; set; }

    [Required(ErrorMessage = "Cpf inválido.")]
    [MinLength(14, ErrorMessage = "Cpf inválido.")]
    [MaxLength(14, ErrorMessage = "Cpf inválido.")]
    [CheckCpf(ErrorMessage = "Cpf já está em uso.")]
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
}