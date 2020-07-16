using System.ComponentModel.DataAnnotations;
using System.Linq;
using MedicamentosApi.Data;
using System;

public class CheckUser : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {

        long userId = Convert.ToInt64(value);
        var _context = (DataContext)validationContext.GetService(typeof(DataContext));
        var exist = _context.Users.Any(user => user.Id == userId);

        if (!exist)
            return new ValidationResult("Usuário inválido.");

        return ValidationResult.Success;

    }
}