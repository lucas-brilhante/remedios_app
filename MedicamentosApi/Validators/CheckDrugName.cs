using System.ComponentModel.DataAnnotations;
using System.Linq;
using MedicamentosApi.Data;

public class CheckDrugName : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        string drugName = value?.ToString();
        var _context = (DataContext)validationContext.GetService(typeof(DataContext));
        var exist = _context.Drugs.Any(drug => drug.Name == drugName);

        if (exist)
            return new ValidationResult("O nome do remédio já está em uso.");

        return ValidationResult.Success;
    }
}