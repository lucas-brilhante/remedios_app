using System.ComponentModel.DataAnnotations;
using System.Linq;
using MedicamentosApi.Data;

public class CheckCpf : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        string cpf = value?.ToString();
        var _context = (DataContext)validationContext.GetService(typeof(DataContext));
        var exist = _context.Users.Any(user => user.Cpf == cpf);

        if (exist)
            return new ValidationResult("Cpf já está em uso.");

        return ValidationResult.Success;
    }
}