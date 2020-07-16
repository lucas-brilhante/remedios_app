using System.ComponentModel.DataAnnotations;
using System.Linq;
using MedicamentosApi.Data;
using System;

public class CheckCategory : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {

        long categoryId = Convert.ToInt64(value);
        var _context = (DataContext)validationContext.GetService(typeof(DataContext));
        var exist = _context.Categories.Any(category => category.Id == categoryId);

        if (!exist)
            return new ValidationResult("Categoria inválida.");

        return ValidationResult.Success;

    }
}