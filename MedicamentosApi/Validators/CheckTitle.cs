using System.ComponentModel.DataAnnotations;
using System.Linq;
using MedicamentosApi.Data;

public class CheckTitle : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        string title = value?.ToString();
        var _context = (DataContext)validationContext.GetService(typeof(DataContext));
        var exist = _context.Categories.Any(c => c.Title == title);

        if (exist)
            return new ValidationResult("Categoria já cadastrada.");

        return ValidationResult.Success;
    }
}