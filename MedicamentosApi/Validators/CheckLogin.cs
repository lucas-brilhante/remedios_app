using System.ComponentModel.DataAnnotations;
using System.Linq;
using MedicamentosApi.Data;

public class CheckLogin : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        string login = value?.ToString();
        var _context = (DataContext)validationContext.GetService(typeof(DataContext));
        var exist = _context.Users.Any(user => user.Login == login);

        if (exist)
            return new ValidationResult("Login já está em uso.");

        return ValidationResult.Success;
    }
}